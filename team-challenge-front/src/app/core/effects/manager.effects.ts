import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {AuthActionTypes, LoginSuccess} from '../../auth/actions/auth.actions';
import {catchError, debounceTime, exhaustMap, filter, map, switchMap, take, withLatestFrom} from 'rxjs/operators';
import {asyncScheduler, Observable, of, timer} from 'rxjs';
import {Action, select, Store} from '@ngrx/store';
import {selectInvitePlayerNameSearch, selectInvitePlayerPage, selectManagementInvitations, selectPlayerTeam, State} from '../reducers/index';
import {PlayerService} from '../service/player.service';
import {TeamService} from '../service/team.service';
import {
  CancelInvitation, CancelInvitationFailure, CancelInvitationSuccess, Invite, InviteFailure,
  InvitePlayerDecodePage, InvitePlayerDecodePageSuccess,
  InvitePlayerLoadPage,
  InvitePlayerLoadPageFailure,
  InvitePlayerLoadPageSuccess, InvitePlayerNameSearchChanged,
  InvitePlayerPageChanged, InviteSuccess, LoadTeamInvitations, LoadTeamInvitationsFailure, LoadTeamInvitationsSuccess, ManagerActionTypes,
} from '../actions/manager.actions';
import {AcceptTeamInvitationFailure, AcceptTeamInvitationSuccess} from '../actions/player.actions';

@Injectable()
export class ManagerEffects {

  @Effect()
  $loadTeamInvitations = this.actions$.pipe(
    ofType<LoadTeamInvitations>(ManagerActionTypes.LoadTeamInvitations),
    withLatestFrom(this.store.pipe(select(selectPlayerTeam))),
    exhaustMap(([, team]) =>
      this.teamService.getInvitations(team.id).pipe(
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
    withLatestFrom(this.store.pipe(select(selectInvitePlayerNameSearch))),
    exhaustMap(([page, nameSearch]) => {
      return this.playerService.searchByNameWithoutTeam(nameSearch, page).pipe(
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
      const decoded = this.teamService.decodeInvitePlayerPage(page, invitations);
      return new InvitePlayerDecodePageSuccess(decoded);
    })
  );

  @Effect()
  $cancelInvitation = this.actions$.pipe(
    ofType<CancelInvitation>(ManagerActionTypes.CancelInvitation),
    map(action => action.payload),
    exhaustMap(invitationId =>
      this.teamService.cancelInvitation(invitationId).pipe(
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
    withLatestFrom(this.store.pipe(select(selectPlayerTeam))),
    exhaustMap(([playerId, team]) =>
      this.teamService.invite(team.id, playerId).pipe(
        map((invitation) => new InviteSuccess(invitation)),
        catchError(err => of(new InviteFailure(err)))
      )
    )
  );


  constructor(
    private actions$: Actions,
    private teamService: TeamService,
    private playerService: PlayerService,
    private store: Store<State>
  ) {}
}

