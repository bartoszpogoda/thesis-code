import {Action} from '@ngrx/store';
import {PlayerEffects} from '../effects/player.effects';
import {Player, PlayerRegistrationForm} from '../models/player';
import {ApiError} from '../models/error';
import {TeamInvitation} from '../models/team-invitation';

export enum PlayerActionTypes {
  LoadCurrent = '[Player] Load Current',
  LoadCurrentSuccess = '[Player] Load Current Success',
  LoadCurrentFailure = '[Player] Load Current Failure',
  LoadTeamInvitations = '[Player] Load Team Invitations',
  LoadTeamInvitationsSuccess = '[Player] Load Team Invitations Success',
  LoadTeamInvitationsFailure = '[Player] Load Team Invitations Failure',
  AcceptTeamInvitation = '[Player] Accept Team Invitation',
  AcceptTeamInvitationSuccess = '[Player] Accept Team Invitation Success',
  AcceptTeamInvitationFailure = '[Player] Accept Team Invitation Failure',
  DeclineTeamInvitation = '[Player] Decline Team Invitation',
  DeclineTeamInvitationSuccess = '[Player] Decline Team Invitation Success',
  DeclineTeamInvitationFailure = '[Player] Decline Team Invitation Failure'
}

export class LoadCurrent implements Action {
  readonly type = PlayerActionTypes.LoadCurrent;
}

export class LoadCurrentSuccess implements Action {
  readonly type = PlayerActionTypes.LoadCurrentSuccess;

  constructor(public payload: Player) {}
}

export class LoadCurrentFailure implements Action {
  readonly type = PlayerActionTypes.LoadCurrentFailure;

  constructor(public payload: ApiError) {}
}

export class LoadTeamInvitations implements Action {
  readonly type = PlayerActionTypes.LoadTeamInvitations;
}

export class LoadTeamInvitationsSuccess implements Action {
  readonly type = PlayerActionTypes.LoadTeamInvitationsSuccess;

  constructor(public payload: TeamInvitation[]) {}
}

export class LoadTeamInvitationsFailure implements Action {
  readonly type = PlayerActionTypes.LoadTeamInvitationsFailure;

  constructor(public payload: ApiError) {}
}

export class AcceptTeamInvitation implements Action {
  readonly type = PlayerActionTypes.AcceptTeamInvitation;

  constructor(public payload: string) {} // invitation id
}

export class AcceptTeamInvitationSuccess implements Action {
  readonly type = PlayerActionTypes.AcceptTeamInvitationSuccess;
}

export class AcceptTeamInvitationFailure implements Action {
  readonly type = PlayerActionTypes.AcceptTeamInvitationFailure;

  constructor(public payload: ApiError) {}
}

export class DeclineTeamInvitation implements Action {
  readonly type = PlayerActionTypes.DeclineTeamInvitation;

  constructor(public payload: string) {} // invitation id
}

export class DeclineTeamInvitationSuccess implements Action {
  readonly type = PlayerActionTypes.DeclineTeamInvitationSuccess;

  constructor(public payload: string) {} // invitation id
}

export class DeclineTeamInvitationFailure implements Action {
  readonly type = PlayerActionTypes.DeclineTeamInvitationFailure;

  constructor(public payload: ApiError) {}
}


export type PlayerActionsUnion = LoadCurrent | LoadCurrentSuccess | LoadCurrentFailure
  | LoadTeamInvitations | LoadTeamInvitationsFailure | LoadTeamInvitationsSuccess
  | AcceptTeamInvitation | AcceptTeamInvitationSuccess | AcceptTeamInvitationFailure
  | DeclineTeamInvitation | DeclineTeamInvitationSuccess | DeclineTeamInvitationFailure;

