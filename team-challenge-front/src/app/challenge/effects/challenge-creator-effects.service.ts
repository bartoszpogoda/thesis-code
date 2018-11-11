import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {catchError, exhaustMap, filter, map, switchMap, take, tap, withLatestFrom} from 'rxjs/operators';
import {forkJoin, of} from 'rxjs';
import {select, Store} from '@ngrx/store';
import {State} from '../reducers/index';
import {Router} from '@angular/router';
import {NzMessageService} from 'ng-zorro-antd';
import {
  CompareLoadHomePoints,
  CompareLoadHomePointsFailure,
  CompareLoadHomePointsSuccess,
  CompareLoadPlayers,
  CompareLoadPlayersFailure,
  CompareLoadPlayersSuccess,
  LoadPickedTeamHomeFailure,
  LoadPickedTeamHomeSuccess,
  Search,
  ChallengeCreatorActionTypes,
  SearchFailure,
  SearchSuccess,
  SelectTeamForChallenge,
  CreateChallenge,
  CreateChallengeSuccess,
  CreateChallengeFailure,
  AddEntryTimeOffers,
  AddEntryTimeOffersSuccess, AddEntryTimeOffersFailure
} from '../actions/challenge-creator.actions';
import {SearchService} from '../service/search.service';
import {selectEntryPlaceTimeOffers, selectPickedTeam, selectSelected} from '../selectors/challenge-creator.selectors';
import {successMessageEffect, toPayload} from '../../core/util/functions';
import {TeamService} from '../../core/service/team.service';
import {ChallengeService} from '../service/challenge.service';
import {selectMyTeam} from '../../core/selectors/my-team.selectors';
import {CreateFacilitySuccess, FacilityCreatorActionTypes} from '../../facility-creator/store/facility-creator.actions';

@Injectable()
export class ChallengeCreatorEffects {

  @Effect()
  $search = this.actions$.pipe(
    ofType<Search>(ChallengeCreatorActionTypes.Search),
    map(toPayload),
    exhaustMap((searchForm) =>
      this.searchService.search(searchForm).pipe(
        map(searchResult => new SearchSuccess(searchResult)),
        catchError(err => of(new SearchFailure(err)))
      )
    )
  );

  @Effect()
  $loadPlayers = this.actions$.pipe(
    ofType<CompareLoadPlayers>(ChallengeCreatorActionTypes.CompareLoadPlayers),
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
    ofType<CompareLoadHomePoints>(ChallengeCreatorActionTypes.CompareLoadHomePoints),
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
    ofType<SelectTeamForChallenge>(ChallengeCreatorActionTypes.SelectTeamForChallenge),
    map(toPayload),
    switchMap(team => this.teamService.getHome(team.id).pipe(
      map(home => new LoadPickedTeamHomeSuccess(home)),
      catchError(err => of(new LoadPickedTeamHomeFailure(err)))
    ))
  );


  @Effect()
  $createChallenge = this.actions$.pipe(
    ofType<CreateChallenge>(ChallengeCreatorActionTypes.CreateChallenge),
    withLatestFrom(
      this.store.pipe(select(selectMyTeam)),
      this.store.pipe(select(selectPickedTeam))
    ),
    exhaustMap(([, myTeam, team]) => this.challengeService.createChallenge(myTeam, team).pipe(
        switchMap(challenge => [new AddEntryTimeOffers(challenge), new CreateChallengeSuccess(challenge)]),
        catchError(err => of(new CreateChallengeFailure(err)))
    ))
  );

  @Effect()
  $addEntryTimeOffers = this.actions$.pipe(
    ofType<AddEntryTimeOffers>(ChallengeCreatorActionTypes.AddEntryTimeOffers),
    map(toPayload),
    withLatestFrom(
      this.store.pipe(select(selectEntryPlaceTimeOffers))
    ),
    exhaustMap(([challenge, entryOffers]) => {
      const addTimeOfferObservables = entryOffers.map(offer => this.challengeService.addTimeOffer(challenge.id, offer));

      return forkJoin(addTimeOfferObservables).pipe(
        map(() => new AddEntryTimeOffersSuccess()),
        catchError(err => of(new AddEntryTimeOffersFailure(err)))
      );
    })
  );

  @Effect({dispatch: false})
  $redirectOnCreatedChallenge = this.actions$.pipe(
    ofType<CreateChallengeSuccess>(ChallengeCreatorActionTypes.CreateChallengeSuccess),
    tap(() => {
      this.router.navigate(['challenges']);
    })
  );

  @Effect({dispatch: false})
  $createChallengeSuccessMessage = successMessageEffect<AddEntryTimeOffersSuccess>(this.actions$, this.message,
    ChallengeCreatorActionTypes.AddEntryTimeOffersSuccess,
    'Wyzwanie zostało utworzone.'
  );


  constructor(
    private actions$: Actions,
    private store: Store<State>,
    private searchService: SearchService,
    private teamService: TeamService,
    private challengeService: ChallengeService,
    private router: Router,
    private message: NzMessageService
  ) {}
}

