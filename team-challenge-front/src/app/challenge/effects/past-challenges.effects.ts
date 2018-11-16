import {Actions, Effect, ofType} from '@ngrx/effects';
import {catchError, exhaustMap, filter, map, switchMap, withLatestFrom} from 'rxjs/operators';
import {select, Store} from '@ngrx/store';
import {selectSelectedRegionIdOrDefault, selectTeamsCurrentPage, selectTeamsPage} from '../../community/reducers';
import {forkJoin, of} from 'rxjs';
import {
  EnterPage,
  LoadPage,
  LoadPageFailure,
  LoadPageSuccess,
  LoadPlaceTimeOffersForPastChallengesFailure, LoadPlaceTimeOffersForPastChallengesSuccess,
  PastChallengesActionTypes
} from '../actions/past-challenges.actions';
import {Injectable} from '@angular/core';
import {ChallengeService} from '../service/challenge.service';
import {State} from '../reducers';
import {selectMyTeam} from '../../core/selectors/my-team.selectors';
import {selectCurrentPage} from '../selectors/past-challenges.selectors';
import {
  LoadActiveChallenges,
  LoadPlaceTimeOffersForActiveChallenges, LoadPlaceTimeOffersForActiveChallengesFailure,
  LoadPlaceTimeOffersForActiveChallengesSuccess,
  MyChallengesActionTypes
} from '../actions/my-challenges.actions';
import {toPayload} from '../../core/util/functions';
import {LoadCurrentSuccess, MyTeamActionTypes} from '../../core/actions/my-team.actions';

@Injectable()
export class PastChallengesEffects {

  @Effect()
  $reloadPastChallengesAfterTeamLoad = this.actions$.pipe(
    ofType<LoadCurrentSuccess>(MyTeamActionTypes.LoadCurrentSuccess),
    map(() => new EnterPage())
  );

  @Effect()
  $loadChallengesCurrentPage = this.actions$.pipe(
    ofType<EnterPage>(PastChallengesActionTypes.EnterPage),
    withLatestFrom(this.store.pipe(select(selectTeamsPage)), this.store.pipe(select(selectTeamsCurrentPage))),
    map(([, , current]) => new LoadPage(+current))
  );

  @Effect()
  $loadPage = this.actions$.pipe(
    ofType<LoadPage>(PastChallengesActionTypes.LoadPage),
    withLatestFrom(
      this.store.pipe(select(selectMyTeam)),
      this.store.pipe(select(selectCurrentPage)),
    ),
    filter(([, myTeam, current]) => myTeam !== null),
    switchMap(([, myTeam, current]) => {

      console.log('Load page');
      console.log(myTeam);
      console.log(current);

      return this.challengeService.getPastChallengesPage('' + myTeam.id, +current, 3).pipe(
        map(page => new LoadPageSuccess(page)),
        catchError(err => of(new LoadPageFailure(err)))
      );
    })
  );

  @Effect()
  $loadPastPlaceTimeOffers = this.actions$.pipe(
    ofType<LoadPageSuccess>(PastChallengesActionTypes.LoadPageSuccess),
    map(toPayload),
    filter((page) => page.content.length > 0),
    exhaustMap((page) => {
      const getPlaceTimeOfferObservables = page.content.map(one => one.id)
        .map(id => this.challengeService.getPlaceTimeOffers(id));

      return forkJoin(getPlaceTimeOfferObservables).pipe(
        // @ts-ignore
        map((placeTimeOffers) => new LoadPlaceTimeOffersForPastChallengesSuccess(placeTimeOffers)),
        catchError(err => of(new LoadPlaceTimeOffersForPastChallengesFailure(err)))
      );
    })
  );

  constructor(
    private actions$: Actions,
    private store: Store<State>,
    private challengeService: ChallengeService,
  ) {}
}

