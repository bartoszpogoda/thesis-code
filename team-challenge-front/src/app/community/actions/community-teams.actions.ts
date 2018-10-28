import {Action} from '@ngrx/store';
import {ApiError} from '../../core/models/error';
import {Team} from '../../core/models/team';
import {Page} from '../../core/models/page';
import {Player} from '../../core/models/player';

export enum CommunityTeamsActionTypes {
  EnterPage = '[Community Teams] Enter Page',
  LoadPage = '[Community Teams] Load Page',
  LoadPageSuccess = '[Community Teams] Load Page Success',
  LoadPageFailure = '[Community Teams] Load Page Failure',
  LoadTeam = '[Community Teams] Load Team',
  LoadTeamSuccess = '[Community Teams] Load Team Success',
  LoadTeamFailure = '[Community Teams] Load Team Failure',
  LoadTeamPlayers = '[Community Teams] Load Team Players',
  LoadTeamPlayersSuccess = '[Community Teams] Load Team Players Success',
  LoadTeamPlayersFailure = '[Community Teams] Load Team Players Failure'
}

export class EnterPage implements Action {
  readonly type = CommunityTeamsActionTypes.EnterPage;
}

export class LoadPage implements Action {
  readonly type = CommunityTeamsActionTypes.LoadPage;

  constructor(public payload: number) {}
}

export class LoadPageSuccess implements Action {
  readonly type = CommunityTeamsActionTypes.LoadPageSuccess;

  constructor(public payload: Page<Team>) {}
}

export class LoadPageFailure implements Action {
  readonly type = CommunityTeamsActionTypes.LoadPageFailure;

  constructor(public payload: ApiError) {}
}

export class LoadTeam implements Action {
  readonly type = CommunityTeamsActionTypes.LoadTeam;

  constructor(public payload: string) {}
}

export class LoadTeamSuccess implements Action {
  readonly type = CommunityTeamsActionTypes.LoadTeamSuccess;

  constructor(public payload: Team) {}
}

export class LoadTeamFailure implements Action {
  readonly type = CommunityTeamsActionTypes.LoadTeamFailure;

  constructor(public payload: ApiError) {}
}

export class LoadTeamPlayers implements Action {
  readonly type = CommunityTeamsActionTypes.LoadTeamPlayers;

  constructor(public payload: string) {}
}

export class LoadTeamPlayersSuccess implements Action {
  readonly type = CommunityTeamsActionTypes.LoadTeamPlayersSuccess;

  constructor(public payload: Player[]) {}
}

export class LoadTeamPlayersFailure implements Action {
  readonly type = CommunityTeamsActionTypes.LoadTeamPlayersFailure;

  constructor(public payload: ApiError) {}
}

export type CommunityTeamsActionsUnion = EnterPage |  LoadPage | LoadPageSuccess | LoadPageFailure
  | LoadTeam | LoadTeamSuccess | LoadTeamFailure
  | LoadTeamPlayers | LoadTeamPlayersSuccess | LoadTeamPlayersFailure;

