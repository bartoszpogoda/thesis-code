import {Action} from '@ngrx/store';
import {ApiError} from '../models/error';
import {Region} from '../models/region';

export enum CoreActionTypes {
  NoAction = '[Core] No action',
  EnterApplication = '[Core] Enter application',

  LoadRegions = '[Core] Load Regions',
  LoadRegionsSuccess = '[Core] Load Regions Success',
  LoadRegionsFailure = '[Core] Load Regions Failure'
}

export class NoAction implements Action {
  readonly type = CoreActionTypes.NoAction;
}

export class EnterApplication implements Action {
  readonly type = CoreActionTypes.EnterApplication;
}

export class LoadRegions implements Action {
  readonly type = CoreActionTypes.LoadRegions;
}

export class LoadRegionsSuccess implements Action {
  readonly type = CoreActionTypes.LoadRegionsSuccess;

  constructor(public payload: Region[]) {}
}

export class LoadRegionsFailure implements Action {
  readonly type = CoreActionTypes.LoadRegionsFailure;

  constructor(public payload: ApiError) {}
}


export type CoreActionUnion = EnterApplication | NoAction
  | LoadRegions | LoadRegionsSuccess | LoadRegionsFailure;
