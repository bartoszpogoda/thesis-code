import {Action} from '@ngrx/store';
import {ApiError} from '../models/error';
import {Team} from '../models/team';
import {Position} from '../models/position';

export enum MyTeamActionTypes {
  LoadCurrent = '[My Team] Load Current',
  LoadCurrentSuccess = '[My Team] Load Current Success',
  LoadCurrentFailure = '[My Team] Load Current Failure',
  LoadHome = '[My Team] Load Home',
  LoadHomeSuccess = '[My Team] Load Home Success',
  LoadHomeFailure = '[My Team] Load Home Failure',
  UpdateIsManager = '[My Team] Update Is Manager'
}

export class LoadCurrent implements Action {
  readonly type = MyTeamActionTypes.LoadCurrent;

  constructor(public payload: string) {}
}

export class LoadCurrentSuccess implements Action {
  readonly type = MyTeamActionTypes.LoadCurrentSuccess;

  constructor(public payload: Team) {}
}

export class LoadCurrentFailure implements Action {
  readonly type = MyTeamActionTypes.LoadCurrentFailure;

  constructor(public payload: ApiError) {}
}

export class LoadHome implements Action {
  readonly type = MyTeamActionTypes.LoadHome;
}

export class LoadHomeSuccess implements Action {
  readonly type = MyTeamActionTypes.LoadHomeSuccess;

  constructor(public payload: Position) {}
}

export class LoadHomeFailure implements Action {
  readonly type = MyTeamActionTypes.LoadHomeFailure;

  constructor(public payload: ApiError) {}
}


export class UpdateIsManager implements Action {
  readonly type = MyTeamActionTypes.UpdateIsManager;

  constructor(public payload: boolean) {}
}

export type MyTeamActionsUnion = LoadCurrent | LoadCurrentSuccess | LoadCurrentFailure | UpdateIsManager
  | LoadHome | LoadHomeSuccess | LoadHomeFailure;

