import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {catchError, exhaustMap, filter, map, switchMap, take, tap, withLatestFrom} from 'rxjs/operators';
import { of, timer} from 'rxjs';
import {Router} from '@angular/router';

import {select, Store} from '@ngrx/store';
import {State} from '../../auth/reducers/index';
import {PlayerService} from '../../core/service/player.service';
import {PlayerCreatorActionTypes, Register, RegisterFailure, RegisterSuccess, UploadAvatarSuccess} from './player-creator.actions';
import {SetHomeSuccess, TeamCreatorActionTypes} from '../../team-creator/store/team-creator.actions';
import {successMessageEffect} from '../../core/util/functions';
import {NzMessageService} from 'ng-zorro-antd';

@Injectable()
export class PlayerCreatorEffects {

  @Effect()
  $registerPlayer = this.actions$.pipe(
    ofType<Register>(PlayerCreatorActionTypes.Register),
    map(action => action.payload),
    exhaustMap((registrationForm) => {
      return this.playerService.registerPlayer(registrationForm).pipe(
        map(player => new RegisterSuccess(player)),
        catchError(error => of(new RegisterFailure(error)))
      );
    })
  );

  @Effect({dispatch: false})
  $registerPlayerSuccessMsg = successMessageEffect<RegisterSuccess>(this.actions$, this.message,
    PlayerCreatorActionTypes.RegisterSuccess,
    'Profil zawodnika został utworzony.'
  );


  @Effect({dispatch: false})
  $uploadAvatarSuccessMsg = successMessageEffect<UploadAvatarSuccess>(this.actions$, this.message,
    PlayerCreatorActionTypes.UploadAvatarSuccess,
    'Zdjęcie zostało ustawione.'
  );

  constructor(
    private actions$: Actions,
    private store: Store<State>,
    private playerService: PlayerService,
    private router: Router,
    private message: NzMessageService
  ) {
  }
}

