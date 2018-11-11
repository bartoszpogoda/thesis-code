import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {catchError, exhaustMap, filter, map, switchMap, take, tap, withLatestFrom} from 'rxjs/operators';
import {forkJoin, of, timer} from 'rxjs';
import {select, Store} from '@ngrx/store';
import {State} from '../reducers/index';
import {TeamService} from '../service/team.service';
import {
  LoadCurrent,
  LoadCurrentFailure,
  LoadCurrentSuccess, LoadHome, LoadHomeFailure, LoadHomeSuccess,
  MyTeamActionTypes, UpdateIsManager
} from '../actions/my-team.actions';
import {
  AcceptTeamInvitationSuccess,
  LoadCurrentSuccess as LoadCurrentPlayerSuccess, LoadTeamInvitations, LoadTeamInvitationsFailure, LoadTeamInvitationsSuccess,
  PlayerActionTypes,
} from '../actions/player.actions';
import {Router} from '@angular/router';
import {NzMessageService} from 'ng-zorro-antd';
import {selectPlayerProfile} from '../selectors/my-player.selectors';
import {NoAction} from '../actions/core.actions';
import {toPayload} from '../util/functions';
import {selectMyTeam} from '../selectors/my-team.selectors';
import {
  CompareLoadHomePoints, CompareLoadHomePointsFailure, CompareLoadHomePointsSuccess,
  CompareLoadPlayers, CompareLoadPlayersFailure,
  CompareLoadPlayersSuccess, LoadPickedTeamHomeFailure, LoadPickedTeamHomeSuccess,
  Search,
  SearchActionTypes,
  SearchFailure,
  SearchSuccess, SelectTeamForChallenge
} from '../actions/search.actions';
import {selectCurrentTeam} from '../../community/reducers';
import {SearchService} from '../service/search.service';
import {selectResult, selectSelected} from '../selectors/search.selectors';
import {Position} from '../models/position';

@Injectable()
export class SearchEffects {

  @Effect()
  $search = this.actions$.pipe(
    ofType<Search>(SearchActionTypes.Search),
    map(toPayload),
    exhaustMap((searchForm) =>
      this.searchService.search(searchForm).pipe(
        map(searchResult => new SearchSuccess(searchResult)),
        catchError(err => of(new SearchFailure(err)))
      )
    )
  );

  @Effect({dispatch: false})
  $redirectToResults = this.actions$.pipe(
    ofType<Search>(SearchActionTypes.Search),
    tap(() => {
      this.router.navigate(['/challenges/new/pick']);
    })
  );

  @Effect({dispatch: false})
  $redirectToEntryOffers = this.actions$.pipe(
    ofType<SelectTeamForChallenge>(SearchActionTypes.SelectTeamForChallenge),
    tap(() => {
      this.router.navigate(['/challenges/new/offer']);
    })
  );

  @Effect()
  $loadPlayers = this.actions$.pipe(
    ofType<CompareLoadPlayers>(SearchActionTypes.CompareLoadPlayers),
    withLatestFrom(this.store.pipe(select(selectSelected))),
    filter(([, selected]) => selected.length > 0),
    exhaustMap(([, selected]) => {
      const getPlayersObservables = selected.map(one => one.team.id)
        .map(id => this.teamService.getPlayers(id));

      return forkJoin(getPlayersObservables).pipe(
        map((players) => new CompareLoadPlayersSuccess(players)),
        catchError(err => of(new CompareLoadPlayersFailure(err)))
      );
    })
  );


  @Effect()
  $loadHomePoints = this.actions$.pipe(
    ofType<CompareLoadHomePoints>(SearchActionTypes.CompareLoadHomePoints),
    withLatestFrom(this.store.pipe(select(selectSelected))),
    filter(([, selected]) => selected.length > 0),
    exhaustMap(([, selected]) => {
      const getHomeObservables = selected.map(one => one.team.id)
        .map(id => this.teamService.getHome(id));

      return forkJoin(getHomeObservables).pipe(
        map((homePoints) => new CompareLoadHomePointsSuccess(homePoints)),
        catchError(err => of(new CompareLoadHomePointsFailure(err)))
      );
    })
  );

  @Effect()
  $loadPickedTeamHome = this.actions$.pipe(
    ofType<SelectTeamForChallenge>(SearchActionTypes.SelectTeamForChallenge),
    map(toPayload),
    switchMap(team => this.teamService.getHome(team.id).pipe(
      map(home => new LoadPickedTeamHomeSuccess(home)),
      catchError(err => of(new LoadPickedTeamHomeFailure(err)))
    ))
  );

  constructor(
    private actions$: Actions,
    private store: Store<State>,
    private searchService: SearchService,
    private teamService: TeamService,
    private router: Router,
    private message: NzMessageService
  ) {}
}

