import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {catchError, debounceTime, exhaustMap, filter, map, switchMap, take, tap, withLatestFrom} from 'rxjs/operators';
import {forkJoin, merge, of} from 'rxjs';
import {select, Store} from '@ngrx/store';
import {State} from '../reducers/index';
import {Router} from '@angular/router';
import {NzMessageService} from 'ng-zorro-antd';
import {SearchService} from '../service/search.service';
import {TeamService} from '../../core/service/team.service';
import {ChallengeService} from '../service/challenge.service';
import {selectMyTeam} from '../../core/selectors/my-team.selectors';
import {
  LoadActiveChallengesSuccess,
  MyChallengesActionTypes,
  LoadActiveChallengesFailure,
  LoadActiveChallenges,
  LoadPlaceTimeOffersForActiveChallenges,
  LoadPlaceTimeOffersForActiveChallengesSuccess,
  LoadPlaceTimeOffersForActiveChallengesFailure,
  LoadChallenge,
  LoadChallengeSuccess,
  LoadChallengeFailure,
  LoadPlaceTimeOffers,
  LoadPlaceTimeOffersSuccess,
  LoadPlaceTimeOffersFailure,
  LoadTheirHome,
  LoadTheirHomeSuccess,
  LoadTheirHomeFailure,
  CancelPlaceTimeOffer,
  CancelPlaceTimeOfferSuccess,
  CancelPlaceTimeOfferFailure,
  RejectPlaceTimeOffer,
  RejectPlaceTimeOfferSuccess,
  RejectPlaceTimeOfferFailure,
  AcceptPlaceTimeOffer,
  AcceptPlaceTimeOfferSuccess,
  AcceptPlaceTimeOfferFailure,
  AddPlaceTimeOffer,
  AddPlaceTimeOfferSuccess,
  AddPlaceTimeOfferFailure, LoadTheirPlayers, LoadTheirPlayersSuccess, LoadTheirPlayersFailure
} from '../actions/my-challenges.actions';
import {LoadCurrent, LoadCurrentSuccess, MyTeamActionTypes} from '../../core/actions/my-team.actions';
import {
  AddEntryTimeOffers, AddEntryTimeOffersFailure, AddEntryTimeOffersSuccess,
  ChallengeCreatorActionTypes,
  CompareLoadHomePoints,
  CompareLoadHomePointsFailure,
  CompareLoadHomePointsSuccess
} from '../actions/challenge-creator.actions';
import {selectEntryPlaceTimeOffers, selectSelected} from '../selectors/challenge-creator.selectors';
import {selectChallenge, selectMyActiveChallenges} from '../selectors/my-challenges.selectors';
import {toPayload} from '../../core/util/functions';
import {Position} from '../../core/models/position';

@Injectable()
export class MyChallengesEffects {

  @Effect()
  $reloadActiveChallengesAfterTeamLoad = this.actions$.pipe(
    ofType<LoadCurrentSuccess>(MyTeamActionTypes.LoadCurrentSuccess),
    map(() => new LoadActiveChallenges())
  );

  @Effect()
  $loadActiveChallenges = this.actions$.pipe(
    ofType<LoadActiveChallenges>(MyChallengesActionTypes.LoadActiveChallenges),
    withLatestFrom(this.store.pipe(select(selectMyTeam))),
    filter(([, myTeam]) => myTeam !== null),
    exhaustMap(([, myTeam]) =>
      this.challengeService.getActiveChallenges(myTeam.id).pipe(
        switchMap(challenges => [new LoadActiveChallengesSuccess(challenges), new LoadPlaceTimeOffersForActiveChallenges(challenges)]),
        catchError(err => of(new LoadActiveChallengesFailure(err)))
      )
    )
  );

  @Effect()
  $loadActivePlaceTimeOffers = this.actions$.pipe(
    ofType<LoadPlaceTimeOffersForActiveChallenges>(MyChallengesActionTypes.LoadPlaceTimeOffersForActiveChallenges),
    map(toPayload),
    filter((challenges) => challenges.length > 0),
    exhaustMap((challenges) => {
      const getPlaceTimeOfferObservables = challenges.map(one => one.id)
        .map(id => this.challengeService.getPlaceTimeOffers(id));

      return forkJoin(getPlaceTimeOfferObservables).pipe(
        // @ts-ignore
        map((placeTimeOffers) => new LoadPlaceTimeOffersForActiveChallengesSuccess(placeTimeOffers)),
        catchError(err => of(new LoadPlaceTimeOffersForActiveChallengesFailure(err)))
      );
    })
  );


  @Effect()
  $loadChallenge = this.actions$.pipe(
    ofType<LoadChallenge>(MyChallengesActionTypes.LoadChallenge),
    map(toPayload),
    exhaustMap((challengeId) =>
      this.challengeService.getChallenge(challengeId).pipe(
        map(challenge => new LoadChallengeSuccess(challenge)),
        catchError(err => of(new LoadChallengeFailure(err)))
      )
    )
  );


  @Effect()
  $loadPlaceTimeOffers = this.actions$.pipe(
    ofType<LoadPlaceTimeOffers>(MyChallengesActionTypes.LoadPlaceTimeOffers),
    map(toPayload),
    exhaustMap((challengeId) =>
      this.challengeService.getPlaceTimeOffers(challengeId).pipe(
        map(offers => new LoadPlaceTimeOffersSuccess(offers)),
        catchError(err => of(new LoadPlaceTimeOffersFailure(err)))
      )
    )
  );

  @Effect()
  $loadTheirHome = this.actions$.pipe(
    ofType<LoadTheirHome>(MyChallengesActionTypes.LoadTheirHome),
    map(toPayload),
    exhaustMap((teamId) =>
      this.teamService.getHome(teamId).pipe(
        // @ts-ignore
        map(home => new LoadTheirHomeSuccess(home)),
        catchError(err => of(new LoadTheirHomeFailure(err)))
      )
    )
  );

  @Effect()
  $loadTheirPlayers = this.actions$.pipe(
    ofType<LoadTheirPlayers>(MyChallengesActionTypes.LoadTheirPlayers),
    map(toPayload),
    exhaustMap((teamId) =>
      this.teamService.getPlayers(teamId).pipe(
        map(players => new LoadTheirPlayersSuccess(players)),
        catchError(err => of(new LoadTheirPlayersFailure(err)))
      )
    )
  );

  @Effect()
  $addPlaceTimeOffer = this.actions$.pipe(
    ofType<AddPlaceTimeOffer>(MyChallengesActionTypes.AddPlaceTimeOffer),
    map(toPayload),
    withLatestFrom(
      this.store.pipe(select(selectChallenge))
    ),
    exhaustMap(([offer, challenge]) => {
      return this.challengeService.addTimeOffer(challenge.id, offer).pipe(
        map((savedOffer) => new AddPlaceTimeOfferSuccess(savedOffer)),
        catchError(err => of(new AddPlaceTimeOfferFailure(err)))
      );
    })
  );

  @Effect()
  $cancelPlaceTimeOffer = this.actions$.pipe(
    ofType<CancelPlaceTimeOffer>(MyChallengesActionTypes.CancelPlaceTimeOffer),
    map(toPayload),
    withLatestFrom(this.store.pipe(select(selectChallenge))),
    exhaustMap(([offerId, challenge]) =>
      this.challengeService.cancelPlaceTimeOffer(challenge.id, offerId).pipe(
        map(canceled => new CancelPlaceTimeOfferSuccess(canceled)),
        catchError(err => of(new CancelPlaceTimeOfferFailure(err)))
      )
    )
  );

  @Effect()
  $rejectPlaceTimeOffer = this.actions$.pipe(
    ofType<RejectPlaceTimeOffer>(MyChallengesActionTypes.RejectPlaceTimeOffer),
    map(toPayload),
    withLatestFrom(this.store.pipe(select(selectChallenge))),
    exhaustMap(([offerId, challenge]) =>
      this.challengeService.rejectPlaceTimeOffer(challenge.id, offerId).pipe(
        map(rejected => new RejectPlaceTimeOfferSuccess(rejected)),
        catchError(err => of(new RejectPlaceTimeOfferFailure(err)))
      )
    )
  );

  @Effect()
  $acceptPlaceTimeOffer = this.actions$.pipe(
    ofType<AcceptPlaceTimeOffer>(MyChallengesActionTypes.AcceptPlaceTimeOffer),
    map(toPayload),
    withLatestFrom(this.store.pipe(select(selectChallenge))),
    exhaustMap(([offerId, challenge]) =>
      this.challengeService.acceptPlaceTimeOffer(challenge.id, offerId).pipe(
        map(accepted => new AcceptPlaceTimeOfferSuccess(accepted)),
        catchError(err => of(new AcceptPlaceTimeOfferFailure(err)))
      )
    )
  );

  @Effect()
  $reloadPlaceTimeOffers = merge(
    this.actions$.pipe(ofType<AcceptPlaceTimeOffer>(MyChallengesActionTypes.AcceptPlaceTimeOfferSuccess)),
    this.actions$.pipe(ofType<AcceptPlaceTimeOffer>(MyChallengesActionTypes.CancelPlaceTimeOfferSuccess)),
    this.actions$.pipe(ofType<AcceptPlaceTimeOffer>(MyChallengesActionTypes.RejectPlaceTimeOfferSuccess)),
    this.actions$.pipe(ofType<AcceptPlaceTimeOffer>(MyChallengesActionTypes.AddPlaceTimeOfferSuccess))
  ).pipe(
    withLatestFrom(this.store.pipe(select(selectChallenge))),
    map(([, chall]) => new LoadPlaceTimeOffers(chall.id))
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

