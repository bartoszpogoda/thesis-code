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
  UpdateIsManager = '[Team] Update Is Manager'
}

export class LoadCurrent implements Action {
  readonly type = TeamActionTypes.LoadCurrent;

  constructor(public payload: string) {}
}

export class LoadCurrentSuccess implements Action {
  readonly type = TeamActionTypes.LoadCurrentSuccess;

  constructor(public payload: Team) {}
}

export class LoadCurrentFailure implements Action {
  readonly type = TeamActionTypes.LoadCurrentFailure;

  constructor(public payload: ApiError) {}
}

export class UpdateIsManager implements Action {
  readonly type = TeamActionTypes.UpdateIsManager;

  constructor(public payload: boolean) {}
}

export type TeamActionsUnion = LoadCurrent | LoadCurrentSuccess | LoadCurrentFailure | UpdateIsManager;

