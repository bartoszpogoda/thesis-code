import {Action} from '@ngrx/store';
import {PlayerEffects} from '../effects/player.effects';
import {Player} from '../models/player';
import {ApiError} from '../models/error';

export enum PlayerActionTypes {
  LoadPlayerProfile = '[Player] Load Player Profile',
  LoadPlayerProfileSuccess = '[Player] Load Player Profile Success',
  LoadPlayerProfileFailure = '[Player] Load Player Profile Failure'
}

export class LoadPlayerProfile implements Action {
  readonly type = PlayerActionTypes.LoadPlayerProfile;
}

export class LoadPlayerProfileSuccess implements Action {
  readonly type = PlayerActionTypes.LoadPlayerProfileSuccess;

  constructor(public payload: Player) {}
}

export class LoadPlayerProfileFailure implements Action {
  readonly type = PlayerActionTypes.LoadPlayerProfileFailure;

  constructor(public payload: ApiError) {}
}

export type PlayerActionsUnion = LoadPlayerProfile | LoadPlayerProfileSuccess | LoadPlayerProfileFailure;
