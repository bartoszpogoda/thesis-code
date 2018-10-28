import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {Router} from '@angular/router';
import {select, Store} from '@ngrx/store';
import {CommunityState, selectTeamsCurrentPage, selectTeamsPage} from '../reducers';
import {catchError, filter, map, switchMap, tap, withLatestFrom} from 'rxjs/operators';
import {GenerateTokenSuccess} from '../../auth/actions/auth.actions';
import {
  CommunityTeamsActionsUnion,
  CommunityTeamsActionTypes,
  EnterPage,
  LoadPage, LoadPageFailure,
  LoadPageSuccess, LoadTeam, LoadTeamFailure, LoadTeamPlayers, LoadTeamPlayersFailure, LoadTeamPlayersSuccess, LoadTeamSuccess
} from '../actions/community-teams.actions';
import {CommunityService} from '../service/community.service';
import {of} from 'rxjs';
import {TeamService} from '../../core/service/team.service';

@Injectable()
export class CommunityEffects {

  @Effect()
  $loadTeamsCurrentPage = this.actions$.pipe(
    ofType<EnterPage>(CommunityTeamsActionTypes.EnterPage),
    withLatestFrom(this.store.pipe(select(selectTeamsPage)), this.store.pipe(select(selectTeamsCurrentPage))),
    // filter(([, page, ]) => page == null),
    map(([, , current]) => new LoadPage(+current))
  );

  @Effect()
  $loadPage = this.actions$.pipe(
    ofType<LoadPage>(CommunityTeamsActionTypes.LoadPage),
    withLatestFrom(this.store.pipe(select(selectTeamsCurrentPage))),
    switchMap(([, current]) => {
      return this.communityService.getTeamsPage(+current, 6).pipe(
        map(page => new LoadPageSuccess(page)),
        catchError(err => of(new LoadPageFailure(err)))
      );
    })
  );

  @Effect()
  $loadTeam = this.actions$.pipe(
    ofType<LoadTeam>(CommunityTeamsActionTypes.LoadTeam),
    map(action => action.payload),
    switchMap(id => {
      return this.teamService.get(id).pipe(
        map(team => new LoadTeamSuccess(team)),
        catchError(err => of(new LoadTeamFailure(err)))
      );
    })
  );

  @Effect()
  $loadTeamPlayers = this.actions$.pipe(
    ofType<LoadTeamPlayers>(CommunityTeamsActionTypes.LoadTeamPlayers),
    map(action => action.payload),
    switchMap(id => {
      return this.teamService.getPlayers(id).pipe(
        map(team => new LoadTeamPlayersSuccess(team)),
        catchError(err => of(new LoadTeamPlayersFailure(err)))
      );
    })
  );

  constructor(
    private actions$: Actions,
    private router: Router,
    private store: Store<CommunityState>,
    private communityService: CommunityService,
    private teamService: TeamService
  ) {}
}
