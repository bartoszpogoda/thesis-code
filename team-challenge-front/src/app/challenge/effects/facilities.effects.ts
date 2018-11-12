import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {catchError, debounceTime, exhaustMap, filter, map, switchMap, take, tap, withLatestFrom} from 'rxjs/operators';
import {forkJoin, of} from 'rxjs';
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
  LoadPlaceTimeOffersSuccess, LoadPlaceTimeOffersFailure, LoadTheirHome, LoadTheirHomeSuccess, LoadTheirHomeFailure
} from '../actions/my-challenges.actions';
import {LoadCurrent, LoadCurrentSuccess, MyTeamActionTypes} from '../../core/actions/my-team.actions';
import {
  ChallengeCreatorActionTypes,
  CompareLoadHomePoints,
  CompareLoadHomePointsFailure,
  CompareLoadHomePointsSuccess
} from '../actions/challenge-creator.actions';
import {selectSelected} from '../selectors/challenge-creator.selectors';
import {selectMyActiveChallenges} from '../selectors/my-challenges.selectors';
import {toPayload} from '../../core/util/functions';
import {Position} from '../../core/models/position';
import {FacilitiesActionTypes, LoadFacilities, LoadFacilitiesFailure, LoadFacilitiesSuccess} from '../actions/facilities.actions';
import {FacilityService} from '../../core/service/facility.service';

@Injectable()
export class FacilitiesEffects {

  @Effect()
  $loadFacilitiesAfterTeamLoaded = this.actions$.pipe(
    ofType<LoadCurrentSuccess>(MyTeamActionTypes.LoadCurrentSuccess),
    map(toPayload),
    map(team => new LoadFacilities(team.regionId))
  );

  @Effect()
  $loadFacilities = this.actions$.pipe(
    ofType<LoadFacilities>(FacilitiesActionTypes.LoadFacilities),
    map(toPayload),
    exhaustMap((regionId) =>
      this.facilityService.getForRegion(regionId).pipe(
        map(facilities => new LoadFacilitiesSuccess(facilities)),
        catchError(err => of(new LoadFacilitiesFailure(err)))
      )
    )
  );

  constructor(
    private actions$: Actions,
    private store: Store<State>,
    private searchService: SearchService,
    private facilityService: FacilityService,
    private challengeService: ChallengeService,
    private router: Router,
    private message: NzMessageService
  ) {}
}

