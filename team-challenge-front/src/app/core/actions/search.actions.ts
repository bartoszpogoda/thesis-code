import {Action} from '@ngrx/store';
import {ApiError} from '../models/error';
import {SearchForm} from '../models/search-form';
import {ScoredTeam, SearchResult} from '../models/search-result';
import {Player} from '../models/player';
import {Position} from '../models/position';
import {Team} from '../models/team';
import {PlaceTimeOffer} from '../models/challenge';

export enum SearchActionTypes {
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
  readonly type = SearchActionTypes.Search;

  constructor(public payload: SearchForm) {}
}

export class SearchSuccess implements Action {
  readonly type = SearchActionTypes.SearchSuccess;

  constructor(public payload: SearchResult) {}
}

export class SearchFailure implements Action {
  readonly type = SearchActionTypes.SearchFailure;

  constructor(public payload: ApiError) {}
}

export class Check implements Action {
  readonly type = SearchActionTypes.Check;

  constructor(public payload: ScoredTeam) {}
}

export class Uncheck implements Action {
  readonly type = SearchActionTypes.Uncheck;

  constructor(public payload: ScoredTeam) {}
}

export class UncheckAll implements Action {
  readonly type = SearchActionTypes.UncheckAll;
}

export class CompareSelected implements Action {
  readonly type = SearchActionTypes.CompareSelected;
}

export class CompareLoadPlayers implements Action {
  readonly type = SearchActionTypes.CompareLoadPlayers;
}

export class CompareLoadPlayersSuccess implements Action {
  readonly type = SearchActionTypes.CompareLoadPlayersSuccess;

  constructor(public payload: Player[][]) {}
}

export class CompareLoadPlayersFailure implements Action {
  readonly type = SearchActionTypes.CompareLoadPlayersFailure;

  constructor(public payload: ApiError) {}
}

export class CompareLoadHomePoints implements Action {
  readonly type = SearchActionTypes.CompareLoadHomePoints;
}

export class CompareLoadHomePointsSuccess implements Action {
  readonly type = SearchActionTypes.CompareLoadHomePointsSuccess;

  constructor(public payload: Position[]) {}
}

export class CompareLoadHomePointsFailure implements Action {
  readonly type = SearchActionTypes.CompareLoadHomePointsFailure;

  constructor(public payload: ApiError) {}
}

export class SelectTeamForChallenge implements Action {
  readonly type = SearchActionTypes.SelectTeamForChallenge;

  constructor(public payload: Team) {}
}

export class LoadPickedTeamHomeSuccess implements Action {
  readonly type = SearchActionTypes.LoadPickedTeamHomeSuccess;

  constructor(public payload: Position) {}
}

export class LoadPickedTeamHomeFailure implements Action {
  readonly type = SearchActionTypes.LoadPickedTeamHomeFailure;

  constructor(public payload: ApiError) {}
}


export class AddEntryPlaceTimeOffer implements Action {
  readonly type = SearchActionTypes.AddEntryPlaceTimeOffer;

  constructor(public payload: PlaceTimeOffer) {}
}


export type SearchActionsUnion = Search | SearchSuccess | SearchFailure | Check | Uncheck | UncheckAll
  | CompareSelected
  | CompareLoadPlayers | CompareLoadPlayersSuccess | CompareLoadPlayersFailure
  | CompareLoadHomePoints | CompareLoadHomePointsSuccess | CompareLoadHomePointsFailure
  | SelectTeamForChallenge | LoadPickedTeamHomeSuccess | LoadPickedTeamHomeFailure
  | AddEntryPlaceTimeOffer;

