import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {catchError, exhaustMap, filter, map, switchMap, take, tap, withLatestFrom} from 'rxjs/operators';
import { of, timer} from 'rxjs';
import {Router} from '@angular/router';
import {NzMessageService} from 'ng-zorro-antd';
import {
  AcceptTeamInvitation,
  AcceptTeamInvitationFailure,
  AcceptTeamInvitationSuccess,
  DeclineTeamInvitation,
  DeclineTeamInvitationFailure,
  DeclineTeamInvitationSuccess,
  LoadCurrent,
  LoadCurrentFailure,
  LoadCurrentSuccess,
  LoadTeamInvitations,
  LoadTeamInvitationsFailure,
  LoadTeamInvitationsSuccess,
  PlayerActionTypes,
} from '../actions/player.actions';

import * as fromTeam from '../actions/team.actions';

import * as teamActions from '../actions/team.actions';

import {select, Store} from '@ngrx/store';
import {State} from '../../auth/reducers/index';
import {AuthActionTypes, LoginSuccess} from '../../auth/actions/auth.actions';
import {PlayerService} from '../service/player.service';
import {TeamActionTypes} from '../actions/team.actions';
import {selectTokenRenewalPending} from '../../auth/reducers';
import {NoAction} from '../actions/core.actions';
import {selectPlayerProfile} from '../selectors/my-player.selectors';

@Injectable()
export class PlayerEffects {

  @Effect()
  $loadPlayerProfileOnLoginSuccess = this.actions$.pipe(
    ofType<LoginSuccess>(AuthActionTypes.LoginSuccess),
    map(() => new LoadCurrent())
  );

  @Effect()
  $loadPlayerProfile = this.actions$.pipe(
    ofType<LoadCurrent>(PlayerActionTypes.LoadCurrent),
    exhaustMap(() => {
      return this.playerService.getCurrent().pipe(
        map(player => new LoadCurrentSuccess(player)),
        catchError(error => of(new LoadCurrentFailure(error)))
      );
    })
  );
  //
  // @Effect()
  // $registerPlayer = this.actions$.pipe(
  //   ofType<Register>(PlayerActionTypes.Register),
  //   map(action => action.payload),
  //   exhaustMap((registrationForm) => {
  //     return this.playerService.registerPlayer(registrationForm).pipe(
  //       map(myPlayer => new RegisterSuccess(myPlayer)),
  //       catchError(error => of(new RegisterFailure(error)))
  //     );
  //   })
  // );


  //
  // @Effect({dispatch: false})
  // $redirectOnRegisterSuccess = this.actions$.pipe(
  //   ofType<RegisterSuccess>(PlayerActionTypes.RegisterSuccess),
  //   tap(() => {
  //     this.router.navigate(['/myPlayer']);
  //   })
  // );

  @Effect()
  $loadTeamInvitations = this.actions$.pipe(
    ofType<LoadTeamInvitations>(PlayerActionTypes.LoadTeamInvitations),
    withLatestFrom(this.store.pipe(select(selectPlayerProfile))),
    exhaustMap(([, player]) =>
      this.playerService.getInvitations(player.id).pipe(
        map(invitations => new LoadTeamInvitationsSuccess(invitations)),
        catchError(err => of(new LoadTeamInvitationsFailure(err)))
      )
    )
  );

  @Effect()
  $acceptTeamInvitation = this.actions$.pipe(
    ofType<AcceptTeamInvitation>(PlayerActionTypes.AcceptTeamInvitation),
    map(action => action.payload),
    exhaustMap(invitationId =>
      this.playerService.acceptInvitation(invitationId).pipe(
        map(() => new AcceptTeamInvitationSuccess()),
        catchError(err => of(new AcceptTeamInvitationFailure(err)))
      )
    )
  );

  @Effect()
  $loadCurrentTeamAfterAcceptation = this.actions$.pipe(
    ofType<AcceptTeamInvitationSuccess>(PlayerActionTypes.AcceptTeamInvitationSuccess),
    map(() => new fromTeam.LoadCurrent())
  );

  @Effect({dispatch: false})
  $redirectToTeamViewAfterAcceptation = this.actions$.pipe(
    ofType<AcceptTeamInvitationSuccess>(PlayerActionTypes.AcceptTeamInvitationSuccess),
    switchMap(() => {
      return this.actions$.pipe(
        ofType<fromTeam.LoadCurrentSuccess>(fromTeam.TeamActionTypes.LoadCurrentSuccess),
        take(1),
        tap(() => {
          this.router.navigate(['/team']);
        })
      );
    })
  );

  @Effect()
  $reloadUserAfterInvitationAcceptation = this.actions$.pipe(
    ofType<AcceptTeamInvitationSuccess>(PlayerActionTypes.AcceptTeamInvitationSuccess),
    map(() => new LoadCurrent())
  );

  @Effect()
  $declineTeamInvitation = this.actions$.pipe(
    ofType<DeclineTeamInvitation>(PlayerActionTypes.DeclineTeamInvitation),
    map(action => action.payload),
    exhaustMap(invitationId =>
      this.playerService.declineInvitation(invitationId).pipe(
        map(() => new DeclineTeamInvitationSuccess(invitationId)),
        catchError(err => of(new DeclineTeamInvitationFailure(err)))
      )
    )
  );

  constructor(
    private actions$: Actions,
    private store: Store<State>,
    private playerService: PlayerService,
    private router: Router
  ) {
  }
}

