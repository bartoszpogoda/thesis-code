import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {catchError, exhaustMap, filter, map, switchMap, take, tap, withLatestFrom} from 'rxjs/operators';

import {select, Store} from '@ngrx/store';
import {State} from '../../auth/reducers/index';
import {CoreActionTypes, EnterApplication, LoadRegions, LoadRegionsFailure, LoadRegionsSuccess} from '../actions/core.actions';
import {RegionService} from '../service/region.service';
import {of} from 'rxjs';

@Injectable()
export class CoreEffects {

  @Effect()
  $loadRegionsOnEnterApplication = this.actions$.pipe(
    ofType<EnterApplication>(CoreActionTypes.EnterApplication),
    map(() => new LoadRegions())
  );

  @Effect()
  $loadRegions = this.actions$.pipe(
    ofType<LoadRegions>(CoreActionTypes.LoadRegions),
    switchMap(() => this.regionService.getAll().pipe(
      map(regions => new LoadRegionsSuccess(regions)),
      catchError(err => of(new LoadRegionsFailure(err)))
    ))
  );


  constructor(
    private actions$: Actions,
    private store: Store<State>,
    private regionService: RegionService
  ) {
  }
}

