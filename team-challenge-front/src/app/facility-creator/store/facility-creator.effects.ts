import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {catchError, debounceTime, exhaustMap, map, switchMap, take, tap, withLatestFrom} from 'rxjs/operators';
import {of, timer} from 'rxjs';
import {select, Store} from '@ngrx/store';
import {State} from '../../core/reducers/index';
import {TeamService} from '../../core/service/team.service';
import {Router} from '@angular/router';
import {NzMessageService} from 'ng-zorro-antd';
import {CreateTeam, CreateTeamFailure, CreateTeamSuccess, TeamCreatorActionTypes} from '../../team-creator/store/team-creator.actions';
import {successMessageEffect, toPayload} from '../../core/util/functions';
import {LoadCurrent} from '../../core/actions/my-team.actions';
import {FacilityService} from '../../core/service/facility.service';
import {CreateFacility, CreateFacilityFailure, CreateFacilitySuccess, FacilityCreatorActionTypes} from './facility-creator.actions';
import {ManagerActionTypes, SetHomeSuccess} from '../../core/actions/manager.actions';

@Injectable()
export class FacilityCreatorEffects {

  @Effect()
  $createFacility = this.actions$.pipe(
    ofType<CreateFacility>(FacilityCreatorActionTypes.CreateFacility),
    map(toPayload),
    debounceTime(1000),
    switchMap((builder) => {
      return this.facilityService.create(builder).pipe(
        map(facility => new CreateFacilitySuccess(facility)),
        catchError(err => of(new CreateFacilityFailure(err)))
      );
    })
  );

  @Effect({dispatch: false})
  $navigateToCreatedFacility = this.actions$.pipe(
    ofType<CreateFacilitySuccess>(FacilityCreatorActionTypes.CreateFacilitySuccess),
    map(toPayload),
    tap((facility) => this.router.navigate(['/community/facilities/' + facility.id]))
  );

  @Effect({dispatch: false})
  $createFacilitySuccessMessage = successMessageEffect<CreateFacilitySuccess>(this.actions$, this.message,
    FacilityCreatorActionTypes.CreateFacilitySuccess,
    'Obiekt sportowy został utworzony.'
  );

  constructor(
    private actions$: Actions,
    private facilityService: FacilityService,
    private store: Store<State>,
    private router: Router,
    private message: NzMessageService
  ) {}
}

