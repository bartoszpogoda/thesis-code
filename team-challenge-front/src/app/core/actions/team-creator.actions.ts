import {Action} from '@ngrx/store';
import {ApiError} from '../models/error';
import {Team, TeamCreationForm} from '../models/team';

import {Position} from '../models/position';

export enum TeamCreatorActionTypes {
  CreateTeam = '[Team Creator] Create Team',
  CreateTeamSuccess = '[Team Creator] Create Team Success',
  CreateTeamFailure = '[Team Creator] Create Team Failure',

  UploadAvatar = '[Team Creator] Upload Avatar',
  UploadAvatarSuccess = '[Team Creator] Upload Avatar Success',

  SetHome = '[Team Creator] Set Home',
  SetHomeSuccess = '[Team Creator] Set Home Success',
  SetHomeFailure = '[Team Creator] Set Home Failure',

  ProgressStage = '[Team Creator] Progress Stage'
}

export class CreateTeam implements Action {
  readonly type = TeamCreatorActionTypes.CreateTeam;

  constructor(public payload: TeamCreationForm) {}
}

export class CreateTeamSuccess implements Action {
  readonly type = TeamCreatorActionTypes.CreateTeamSuccess;

  constructor(public payload: Team) {}
}

export class CreateTeamFailure implements Action {
  readonly type = TeamCreatorActionTypes.CreateTeamFailure;

  constructor(public payload: ApiError) {}
}

export class UploadAvatar implements Action {
  readonly type = TeamCreatorActionTypes.UploadAvatar;
}

export class UploadAvatarSuccess implements Action {
  readonly type = TeamCreatorActionTypes.UploadAvatarSuccess;
}

export class SetHome implements Action {
  readonly type = TeamCreatorActionTypes.SetHome;

  constructor(public payload: Position) {}
}

export class SetHomeSuccess implements Action {
  readonly type = TeamCreatorActionTypes.SetHomeSuccess;

  constructor(public payload: Position) {}
}

export class SetHomeFailure implements Action {
  readonly type = TeamCreatorActionTypes.SetHomeFailure;

  constructor(public payload: ApiError) {}
}

export class ProgressStage implements Action {
  readonly type = TeamCreatorActionTypes.ProgressStage;
}

export type TeamCreatorActionsUnion = CreateTeam | CreateTeamSuccess | CreateTeamFailure
  | UploadAvatar | UploadAvatarSuccess
  | SetHome | SetHomeSuccess | SetHomeFailure
  | ProgressStage;

