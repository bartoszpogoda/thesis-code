import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {catchError, exhaustMap, map, switchMap, tap, withLatestFrom} from 'rxjs/operators';
import {of} from 'rxjs';
import {Router} from '@angular/router';
import {NzMessageService} from 'ng-zorro-antd';
import {LoadPlayerProfile, LoadPlayerProfileFailure, LoadPlayerProfileSuccess, PlayerActionTypes} from '../actions/player.actions';
import {Action, select, Store} from '@ngrx/store';
import {State, selectDecodedToken, selectTokenRenewalPending} from '../../auth/reducers/index';
import {AuthActionTypes, LoginSuccess, RenewTokenFailure, RenewTokenReceived, RenewTokenSuccess} from '../../auth/actions/auth.actions';
import {PlayerService} from '../services/player.service';
import {LoginFailedAlertComponent} from '../../home/components/login-failed-alert.component';

@Injectable()
export class PlayerEffects {

  @Effect()
  $loadPlayerProfileOnLoginSuccess = this.actions$.pipe(
    ofType<LoginSuccess>(AuthActionTypes.LoginSuccess),
    map(() => new LoadPlayerProfile())
  );

  @Effect()
  $loadPlayerProfile = this.actions$.pipe(
    ofType<LoadPlayerProfile>(PlayerActionTypes.LoadPlayerProfile),
    withLatestFrom(this.store.pipe(select(selectDecodedToken))),
    map(([a, decoded]) => decoded.id),
    exhaustMap(id => {
      return this.playerService.getByUserId(id).pipe(
        map(player => new LoadPlayerProfileSuccess(player)),
        catchError(error => of(new LoadPlayerProfileFailure(error)))
      );
    })
  );

  constructor(
    private actions$: Actions,
    private store: Store<State>,
    private playerService: PlayerService
  ) {}
}

