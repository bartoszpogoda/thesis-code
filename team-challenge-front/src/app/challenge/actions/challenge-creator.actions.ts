import {Action} from '@ngrx/store';
import {SearchForm} from '../models/search-form';
import {ScoredTeam, SearchResult} from '../models/search-result';
import {PlaceTimeOffer} from '../models/challenge';
import {ApiError} from '../../core/models/error';
import {Player} from '../../core/models/player';
import {Position} from '../../core/models/position';
import {Team} from '../../core/models/team';

export enum ChalengeCreatorActionTypes {

  Search = '[Search] Search',
  SearchSuccess = '[Search] Search Success',
  SearchFailure = '[Search] Search Failure',
  Check = '[Search] Check',
  Uncheck = '[Search] Uncheck',
  UncheckAll = '[Search] Uncheck All',
  CompareSelected = '[Search] Compare Selected',

  CompareLoadPlayers = '[Search Comparison] Load Players',
  CompareLoadPlayersSuccess = '[Search Comparison] Load Players Success',
  CompareLoadPlayersFailure = '[Search Comparison] Load Players Failure',

  CompareLoadHomePoints = '[Search Comparison] Load Home Points',
  CompareLoadHomePointsSuccess = '[Search Comparison] Load Home Points Success',
  CompareLoadHomePointsFailure = '[Search Comparison] Load Home Points Failure',

  SelectTeamForChallenge = '[Search] Select Team For Challenge',
  LoadPickedTeamHomeSuccess = '[Search] Load Picked Team Home Success',
  LoadPickedTeamHomeFailure = '[Search] Load Picked Team Home Failure',

  AddEntryPlaceTimeOffer = '[Search] Add Entry Time Offer'
}

export class Search implements Action {
  readonly type = ChalengeCreatorActionTypes.Search;

  constructor(public payload: SearchForm) {}
}

export class SearchSuccess implements Action {
  readonly type = ChalengeCreatorActionTypes.SearchSuccess;

  constructor(public payload: SearchResult) {}
}

export class SearchFailure implements Action {
  readonly type = ChalengeCreatorActionTypes.SearchFailure;

  constructor(public payload: ApiError) {}
}

export class Check implements Action {
  readonly type = ChalengeCreatorActionTypes.Check;

  constructor(public payload: ScoredTeam) {}
}

export class Uncheck implements Action {
  readonly type = ChalengeCreatorActionTypes.Uncheck;

  constructor(public payload: ScoredTeam) {}
}

export class UncheckAll implements Action {
  readonly type = ChalengeCreatorActionTypes.UncheckAll;
}

export class CompareSelected implements Action {
  readonly type = ChalengeCreatorActionTypes.CompareSelected;
}

export class CompareLoadPlayers implements Action {
  readonly type = ChalengeCreatorActionTypes.CompareLoadPlayers;
}

export class CompareLoadPlayersSuccess implements Action {
  readonly type = ChalengeCreatorActionTypes.CompareLoadPlayersSuccess;

  constructor(public payload: Player[][]) {}
}

export class CompareLoadPlayersFailure implements Action {
  readonly type = ChalengeCreatorActionTypes.CompareLoadPlayersFailure;

  constructor(public payload: ApiError) {}
}

export class CompareLoadHomePoints implements Action {
  readonly type = ChalengeCreatorActionTypes.CompareLoadHomePoints;
}

export class CompareLoadHomePointsSuccess implements Action {
  readonly type = ChalengeCreatorActionTypes.CompareLoadHomePointsSuccess;

  constructor(public payload: Position[]) {}
}

export class CompareLoadHomePointsFailure implements Action {
  readonly type = ChalengeCreatorActionTypes.CompareLoadHomePointsFailure;

  constructor(public payload: ApiError) {}
}

export class SelectTeamForChallenge implements Action {
  readonly type = ChalengeCreatorActionTypes.SelectTeamForChallenge;

  constructor(public payload: Team) {}
}

export class LoadPickedTeamHomeSuccess implements Action {
  readonly type = ChalengeCreatorActionTypes.LoadPickedTeamHomeSuccess;

  constructor(public payload: Position) {}
}

export class LoadPickedTeamHomeFailure implements Action {
  readonly type = ChalengeCreatorActionTypes.LoadPickedTeamHomeFailure;

  constructor(public payload: ApiError) {}
}


export class AddEntryPlaceTimeOffer implements Action {
  readonly type = ChalengeCreatorActionTypes.AddEntryPlaceTimeOffer;

  constructor(public payload: PlaceTimeOffer) {}
}


export type SearchActionsUnion = Search | SearchSuccess | SearchFailure | Check | Uncheck | UncheckAll
  | CompareSelected
  | CompareLoadPlayers | CompareLoadPlayersSuccess | CompareLoadPlayersFailure
  | CompareLoadHomePoints | CompareLoadHomePointsSuccess | CompareLoadHomePointsFailure
  | SelectTeamForChallenge | LoadPickedTeamHomeSuccess | LoadPickedTeamHomeFailure
  | AddEntryPlaceTimeOffer;

