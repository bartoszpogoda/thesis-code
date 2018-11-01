import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {AuthActionTypes, LoginSuccess} from '../../auth/actions/auth.actions';
import {catchError, debounceTime, exhaustMap, filter, map, switchMap, take, tap, withLatestFrom} from 'rxjs/operators';
import {asyncScheduler, Observable, of, timer} from 'rxjs';
import {Action, select, Store} from '@ngrx/store';
import {selectInvitePlayerNameSearch, selectInvitePlayerPage, selectManagementInvitations, State} from '../reducers/index';
import {PlayerService} from '../service/player.service';
import {TeamService} from '../service/team.service';
import {
  CancelInvitation,
  CancelInvitationFailure,
  CancelInvitationSuccess,
  Invite,
  InviteFailure,
  InvitePlayerDecodePage,
  InvitePlayerDecodePageSuccess,
  InvitePlayerLoadPage,
  InvitePlayerLoadPageFailure,
  InvitePlayerLoadPageSuccess,
  InvitePlayerNameSearchChanged,
  InvitePlayerPageChanged,
  InviteSuccess,
  LoadTeamInvitations,
  LoadTeamInvitationsFailure,
  LoadTeamInvitationsSuccess,
  ManagerActionTypes,
  SetHome, SetHomeFailure, SetHomeSuccess,
} from '../actions/manager.actions';
import {selectMyTeam} from '../selectors/my-team.selectors';
import {successMessageEffect, toPayload} from '../util/functions';
import {Router} from '@angular/router';
import {NzMessageService} from 'ng-zorro-antd';
import {TeamInvitationService} from '../service/team-invitation.service';

@Injectable()
export class ManagerEffects {

  @Effect()
  $loadTeamInvitations = this.actions$.pipe(
    ofType<LoadTeamInvitations>(ManagerActionTypes.LoadTeamInvitations),
    withLatestFrom(this.store.pipe(select(selectMyTeam))),
    exhaustMap(([, team]) =>
      this.teamInivitationService.getTeamInvitations(team.id).pipe(
        map(invitations => new LoadTeamInvitationsSuccess(invitations)),
        catchError(err => of(new LoadTeamInvitationsFailure(err)))
      )
    )
  );

  @Effect()
  $refreshPageAfterInvitationsReloaded = this.actions$.pipe(
    ofType<LoadTeamInvitationsSuccess>(ManagerActionTypes.LoadTeamInvitationsSuccess),
    withLatestFrom(this.store.pipe(select(selectInvitePlayerPage))),
    filter(([, page]) => page != null),
    map(([, page]) => new InvitePlayerDecodePage(page))
  );

  @Effect()
  $loadNextPageAfterPageChanged = this.actions$.pipe(
    ofType<InvitePlayerPageChanged>(ManagerActionTypes.InvitePlayerPageChanged),
    map(action => action.payload),
    map((page) => {
      return new InvitePlayerLoadPage(page);
    })
  );

  @Effect()
  $reloadPageAfterNameSearchChanged = this.actions$.pipe(
    ofType<InvitePlayerNameSearchChanged>(ManagerActionTypes.InvitePlayerNameSearchChanged),
    debounceTime(300, asyncScheduler),
    map(() => new InvitePlayerPageChanged(0))
  );

  @Effect()
  $loadNextPage = this.actions$.pipe(
    ofType<InvitePlayerLoadPage>(ManagerActionTypes.InvitePlayerLoadPage),
    map(action => action.payload),
    withLatestFrom(this.store.pipe(select(selectInvitePlayerNameSearch)), this.store.pipe(select(selectMyTeam))),
    exhaustMap(([page, nameSearch, team]) => {
      return this.playerService.searchByNameWithoutTeam(nameSearch, team.regionId, page).pipe(
        map(loadedPage => new InvitePlayerLoadPageSuccess(loadedPage)),
        catchError(apiError => of(new InvitePlayerLoadPageFailure(apiError)))
      );
    })
  );

  @Effect()
  $decodePageAfterLoaded = this.actions$.pipe(
    ofType<InvitePlayerLoadPageSuccess>(ManagerActionTypes.InvitePlayerLoadPageSuccess),
    map(action => action.payload),
    map(page => new InvitePlayerDecodePage(page))
  );

  @Effect()
  $decodePage = this.actions$.pipe(
    ofType<InvitePlayerDecodePage>(ManagerActionTypes.InvitePlayerDecodePage),
    map(action => action.payload),
    withLatestFrom(this.store.pipe(select(selectManagementInvitations))),
    map(([page, invitations]) => {
      const decoded = this.teamInivitationService.decodeInvitePlayerPage(page, invitations);
      return new InvitePlayerDecodePageSuccess(decoded);
    })
  );

  @Effect()
  $cancelInvitation = this.actions$.pipe(
    ofType<CancelInvitation>(ManagerActionTypes.CancelInvitation),
    map(action => action.payload),
    exhaustMap(invitationId =>
      this.teamInivitationService.cancelInvitation(invitationId).pipe(
        map(() => new CancelInvitationSuccess()),
        catchError(err => of(new CancelInvitationFailure(err)))
      )
    )
  );

  @Effect()
  $refreshInvitations = this.actions$.pipe(
    ofType<CancelInvitationSuccess | InviteSuccess>(ManagerActionTypes.CancelInvitationSuccess, ManagerActionTypes.InviteSuccess),
    map(() => new LoadTeamInvitations())
  );


  @Effect()
  $invite = this.actions$.pipe(
    ofType<Invite>(ManagerActionTypes.Invite),
    map(action => action.payload),
    withLatestFrom(this.store.pipe(select(selectMyTeam))),
    exhaustMap(([playerId, team]) =>
      this.teamInivitationService.invite(team.id, playerId).pipe(
        map((invitation) => new InviteSuccess(invitation)),
        catchError(err => of(new InviteFailure(err)))
      )
    )
  );

  @Effect({dispatch: false})
  $inviteSuccessMessage = successMessageEffect<InviteSuccess>(this.actions$, this.message,
    ManagerActionTypes.InviteSuccess,
    'Zawodnik został zaproszony.'
  );


  @Effect({dispatch: false})
  $cancelInviteSuccessMessage = successMessageEffect<CancelInvitationSuccess>(this.actions$, this.message,
    ManagerActionTypes.CancelInvitationSuccess,
    'Zaproszenie zostało anulowane.'
  );

  @Effect()
  $setHome = this.actions$.pipe(
    ofType<SetHome>(ManagerActionTypes.SetHome),
    map(toPayload),
    withLatestFrom(this.store.pipe(select(selectMyTeam))),
    switchMap(([pos, team]) => {
      return this.teamService.setHome(team.id, pos).pipe(
        map(home => new SetHomeSuccess(home)),
        catchError(err => of(new SetHomeFailure(err)))
      );
    })
  );

  @Effect({dispatch: false})
  $setHomeSuccessMessage = successMessageEffect<SetHomeSuccess>(this.actions$, this.message,
    ManagerActionTypes.SetHomeSuccess,
    'Punkt macierzysty został ustawiony.'
  );

  @Effect({dispatch: false})
  $navigateBackToManagerPage = this.actions$.pipe(
    ofType<SetHomeSuccess>(ManagerActionTypes.SetHomeSuccess),
    tap(() => this.router.navigate(['/team/manager']))
  );



  constructor(
    private actions$: Actions,
    private teamService: TeamService,
    private playerService: PlayerService,
    private store: Store<State>,
    private message: NzMessageService,
    private teamInivitationService: TeamInvitationService,
    private router: Router
  ) {}
}

