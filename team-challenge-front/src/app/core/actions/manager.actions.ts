import {Action} from '@ngrx/store';
import {ApiError} from '../models/error';
import {Team} from '../models/team';
import {InvitablePlayer, Player} from '../models/player';
import {Page} from '../models/page';
import {TeamInvitation} from '../models/team-invitation';
import {PlayerActionTypes} from './player.actions';
import {Position} from '../models/position';
import {LoadHomeFailure, MyTeamActionTypes} from './my-team.actions';

export enum ManagerActionTypes {
  LoadTeamInvitations = '[Manager] Load Team Invitations',
  LoadTeamInvitationsSuccess = '[Manager] Load Team Invitations Success',
  LoadTeamInvitationsFailure = '[Manager] Load Team Invitations Failure',
  InvitePlayerPageChanged = '[Manager] Invite Player Page Changed',
  InvitePlayerLoadPage = '[Manager] Invite Player Load Page',
  InvitePlayerLoadPageSuccess = '[Manager] Invite Player Load Page Success',
  InvitePlayerLoadPageFailure = '[Manager] Invite Player Load Page Failure',
  InvitePlayerDecodePage = '[Manager] Invite Player Decode Page',
  InvitePlayerDecodePageSuccess = '[Manager] Invite Player Decode Page Success',
  InvitePlayerNameSearchChanged = '[Manager] Invite Player Name Search Changed',
  CancelInvitation = '[Manager] Cancel Invitation',
  CancelInvitationSuccess = '[Manager] Cancel Invitation Success',
  CancelInvitationFailure = '[Manager] Cancel Invitation Failure',
  Invite = '[Manager] Invite',
  InviteSuccess = '[Manager] Invite Success',
  InviteFailure = '[Manager] Invite Failure',


  SetHome = '[Manager] Set Home',
  SetHomeSuccess = '[Manager] Set Home Success',
  SetHomeFailure = '[Manager] Set Home Failure',
}

export class LoadTeamInvitations implements Action {
  readonly type = ManagerActionTypes.LoadTeamInvitations;
}

export class LoadTeamInvitationsSuccess implements Action {
  readonly type = ManagerActionTypes.LoadTeamInvitationsSuccess;

  constructor(public payload: TeamInvitation[]) {}
}

export class LoadTeamInvitationsFailure implements Action {
  readonly type = ManagerActionTypes.LoadTeamInvitationsFailure;

  constructor(public payload: ApiError) {}
}

export class InvitePlayerPageChanged implements Action {
  readonly type = ManagerActionTypes.InvitePlayerPageChanged;

  constructor(public payload: number) {}
}

export class InvitePlayerLoadPage implements Action {
  readonly type = ManagerActionTypes.InvitePlayerLoadPage;

  constructor(public payload: number) {}
}

export class InvitePlayerLoadPageSuccess implements Action {
  readonly type = ManagerActionTypes.InvitePlayerLoadPageSuccess;

  constructor(public payload: Page<Player>) {}
}

export class InvitePlayerLoadPageFailure implements Action {
  readonly type = ManagerActionTypes.InvitePlayerLoadPageFailure;

  constructor(public payload: ApiError) {}
}

export class InvitePlayerDecodePage implements Action {
  readonly type = ManagerActionTypes.InvitePlayerDecodePage;

  constructor(public payload: Page<Player>) {}
}

export class InvitePlayerDecodePageSuccess implements Action {
  readonly type = ManagerActionTypes.InvitePlayerDecodePageSuccess;

  constructor(public payload: InvitablePlayer[]) {}
}

export class InvitePlayerNameSearchChanged implements Action {
  readonly type = ManagerActionTypes.InvitePlayerNameSearchChanged;

  constructor(public payload: string) {}
}

export class CancelInvitation implements Action {
  readonly type = ManagerActionTypes.CancelInvitation;

  constructor(public payload: string) {}
}

export class CancelInvitationSuccess implements Action {
  readonly type = ManagerActionTypes.CancelInvitationSuccess;
}

export class CancelInvitationFailure implements Action {
  readonly type = ManagerActionTypes.CancelInvitationFailure;

  constructor(public payload: ApiError) {}
}

export class Invite implements Action {
  readonly type = ManagerActionTypes.Invite;

  constructor(public payload: string) {}
}

export class InviteSuccess implements Action {
  readonly type = ManagerActionTypes.InviteSuccess;

  constructor(public payload: TeamInvitation) {}
}

export class InviteFailure implements Action {
  readonly type = ManagerActionTypes.InviteFailure;

  constructor(public payload: ApiError) {}
}

export class SetHome implements Action {
  readonly type = ManagerActionTypes.SetHome;

  constructor(public payload: Position) {}
}

export class SetHomeSuccess implements Action {
  readonly type = ManagerActionTypes.SetHomeSuccess;

  constructor(public payload: Position) {}
}

export class SetHomeFailure implements Action {
  readonly type = ManagerActionTypes.SetHomeFailure;

  constructor(public payload: ApiError) {}
}

export type ManagerActionsUnion =
  | InvitePlayerPageChanged | InvitePlayerLoadPage | InvitePlayerLoadPageSuccess | InvitePlayerLoadPageFailure | InvitePlayerDecodePage
  | InvitePlayerDecodePageSuccess | LoadTeamInvitations | LoadTeamInvitationsSuccess | LoadTeamInvitationsFailure
  | InvitePlayerNameSearchChanged | CancelInvitation | CancelInvitationSuccess | CancelInvitationFailure
  | Invite | InviteSuccess | InviteFailure
  | SetHome | SetHomeSuccess | SetHomeFailure;

