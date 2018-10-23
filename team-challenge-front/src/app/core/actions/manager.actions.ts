import {Action} from '@ngrx/store';
import {ApiError} from '../models/error';
import {Team} from '../models/team';
import {InvitablePlayer, Player} from '../models/player';
import {Page} from '../models/page';
import {TeamInvitation} from '../models/team-invitation';
import {PlayerActionTypes} from './player.actions';

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
  InvitePlayerNameSearchChanged = '[Manager] Invite Player Name Search Changed'
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


export type ManagerActionsUnion =
  | InvitePlayerPageChanged | InvitePlayerLoadPage | InvitePlayerLoadPageSuccess | InvitePlayerLoadPageFailure | InvitePlayerDecodePage
  | InvitePlayerDecodePageSuccess | LoadTeamInvitations | LoadTeamInvitationsSuccess | LoadTeamInvitationsFailure
  | InvitePlayerNameSearchChanged;

