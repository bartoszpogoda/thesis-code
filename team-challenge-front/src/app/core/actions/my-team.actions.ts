import {Action} from '@ngrx/store';
import {ApiError} from '../models/error';
import {Team} from '../models/team';
import {Position} from '../models/position';
import {Player} from '../models/player';

export enum MyTeamActionTypes {
  LoadCurrent = '[My Team] Load Current',
  LoadCurrentSuccess = '[My Team] Load Current Success',
  LoadCurrentFailure = '[My Team] Load Current Failure',
  LoadHome = '[My Team] Load Home',
  LoadHomeSuccess = '[My Team] Load Home Success',
  LoadHomeFailure = '[My Team] Load Home Failure',
  UpdateIsManager = '[My Team] Update Is Manager',
  LoadPlayers = '[My Team] Load Players',
  LoadPlayersSuccess = '[My Team] Load Players Success',
  LoadPlayersFailure = '[My Team] Load Players Failure',
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

export class LoadPlayers implements Action {
  readonly type = MyTeamActionTypes.LoadPlayers;
}

export class LoadPlayersSuccess implements Action {
  readonly type = MyTeamActionTypes.LoadPlayersSuccess;

  constructor(public payload: Player[]) {}
}

export class LoadPlayersFailure implements Action {
  readonly type = MyTeamActionTypes.LoadPlayersFailure;

  constructor(public payload: ApiError) {}
}



export class UpdateIsManager implements Action {
  readonly type = MyTeamActionTypes.UpdateIsManager;

  constructor(public payload: boolean) {}
}

export type MyTeamActionsUnion = LoadCurrent | LoadCurrentSuccess | LoadCurrentFailure | UpdateIsManager
  | LoadHome | LoadHomeSuccess | LoadHomeFailure | LoadPlayers | LoadPlayersSuccess | LoadPlayersFailure;

