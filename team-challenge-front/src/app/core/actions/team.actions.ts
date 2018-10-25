import {Action} from '@ngrx/store';
import {ApiError} from '../models/error';
import {Team, TeamCreationForm} from '../models/team';
import {InvitablePlayer, Player} from '../models/player';
import {Page} from '../models/page';
import {TeamInvitation} from '../models/team-invitation';
import {PlayerActionTypes} from './player.actions';

export enum TeamActionTypes {
  LoadCurrent = '[Team] Load Current',
  LoadCurrentSuccess = '[Team] Load Current Success',
  LoadCurrentFailure = '[Team] Load Current Failure',
  ShowJustJoined = '[Team] Show Just Joined',
  HideJustJoined = '[Team] Hide Just Joined',
  UpdateIsManager = '[Team] Update Is Manager',
  CreateTeam = '[Team] Create Team',
  CreateTeamSuccess = '[Team] Create Team Success',
  CreateTeamFailure = '[Team] Create Team Failure',
}

export class LoadCurrent implements Action {
  readonly type = TeamActionTypes.LoadCurrent;
}

export class LoadCurrentSuccess implements Action {
  readonly type = TeamActionTypes.LoadCurrentSuccess;

  constructor(public payload: Team) {}
}

export class LoadCurrentFailure implements Action {
  readonly type = TeamActionTypes.LoadCurrentFailure;

  constructor(public payload: ApiError) {}
}

export class ShowJustJoined implements Action {
  readonly type = TeamActionTypes.ShowJustJoined;
}

export class HideJustJoined implements Action {
  readonly type = TeamActionTypes.HideJustJoined;
}

export class UpdateIsManager implements Action {
  readonly type = TeamActionTypes.UpdateIsManager;

  constructor(public payload: boolean) {}
}

export class CreateTeam implements Action {
  readonly type = TeamActionTypes.CreateTeam;

  constructor(public payload: TeamCreationForm) {}
}

export class CreateTeamSuccess implements Action {
  readonly type = TeamActionTypes.CreateTeamSuccess;

  constructor(public payload: Team) {}
}

export class CreateTeamFailure implements Action {
  readonly type = TeamActionTypes.CreateTeamFailure;

  constructor(public payload: ApiError) {}
}

export type TeamActionsUnion = LoadCurrent | LoadCurrentSuccess | LoadCurrentFailure | ShowJustJoined | HideJustJoined | UpdateIsManager
  | CreateTeam | CreateTeamSuccess | CreateTeamFailure;

