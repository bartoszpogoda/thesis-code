import {Action} from '@ngrx/store';
import {SearchForm} from '../models/search-form';
import {ScoredTeam, SearchResult} from '../models/search-result';
import {Challenge, PlaceTimeOffer} from '../models/challenge';
import {ApiError} from '../../core/models/error';
import {Player} from '../../core/models/player';
import {Position} from '../../core/models/position';
import {Team} from '../../core/models/team';

export enum ChallengeCreatorActionTypes {

  Search = '[Search] Search',
  SearchSuccess = '[Search] Search Success',
  SearchFailure = '[Search] Search Failure',
  Check = '[Search] Check',
  Uncheck = '[Search] Uncheck',
  UncheckAll = '[Search] Uncheck All',
  CompareSelected = '[Search] Compare Selected',

  BackToResults = '[Challenge Creator] Back To Results',
  BackToSearchForm = '[Challenge Creator] Back To Search Form',

  CompareLoadPlayers = '[Search Comparison] Load Players',
  CompareLoadPlayersSuccess = '[Search Comparison] Load Players Success',
  CompareLoadPlayersFailure = '[Search Comparison] Load Players Failure',

  CompareLoadHomePoints = '[Search Comparison] Load Home Points',
  CompareLoadHomePointsSuccess = '[Search Comparison] Load Home Points Success',
  CompareLoadHomePointsFailure = '[Search Comparison] Load Home Points Failure',

  SelectTeamForChallenge = '[Search] Select Team For Challenge',
  LoadPickedTeamHomeSuccess = '[Search] Load Picked Team Home Success',
  LoadPickedTeamHomeFailure = '[Search] Load Picked Team Home Failure',

  AddEntryPlaceTimeOffer = '[Search] Add Entry Time Offer',
  CancelEntryPlaceTimeOffer = '[Search] Cancel Entry Time Offer',

  CreateChallenge = '[Challenge Creator] Create Challenge',
  CreateChallengeSuccess = '[Challenge Creator] Create Challenge Success',
  CreateChallengeFailure = '[Challenge Creator] Create Challenge Failure',

  AddEntryTimeOffers = '[Challenge Creator] Add Entry Time Offers',
  AddEntryTimeOffersSuccess = '[Challenge Creator] Add Entry Time Offers Success',
  AddEntryTimeOffersFailure = '[Challenge Creator] Add Entry Time Offers Failure',
}

export class Search implements Action {
  readonly type = ChallengeCreatorActionTypes.Search;

  constructor(public payload: SearchForm) {}
}

export class SearchSuccess implements Action {
  readonly type = ChallengeCreatorActionTypes.SearchSuccess;

  constructor(public payload: SearchResult) {}
}

export class SearchFailure implements Action {
  readonly type = ChallengeCreatorActionTypes.SearchFailure;

  constructor(public payload: ApiError) {}
}

export class Check implements Action {
  readonly type = ChallengeCreatorActionTypes.Check;

  constructor(public payload: ScoredTeam) {}
}

export class Uncheck implements Action {
  readonly type = ChallengeCreatorActionTypes.Uncheck;

  constructor(public payload: ScoredTeam) {}
}

export class UncheckAll implements Action {
  readonly type = ChallengeCreatorActionTypes.UncheckAll;
}

export class CompareSelected implements Action {
  readonly type = ChallengeCreatorActionTypes.CompareSelected;
}

export class CompareLoadPlayers implements Action {
  readonly type = ChallengeCreatorActionTypes.CompareLoadPlayers;
}

export class CompareLoadPlayersSuccess implements Action {
  readonly type = ChallengeCreatorActionTypes.CompareLoadPlayersSuccess;

  constructor(public payload: Player[][]) {}
}

export class CompareLoadPlayersFailure implements Action {
  readonly type = ChallengeCreatorActionTypes.CompareLoadPlayersFailure;

  constructor(public payload: ApiError) {}
}

export class CompareLoadHomePoints implements Action {
  readonly type = ChallengeCreatorActionTypes.CompareLoadHomePoints;
}

export class CompareLoadHomePointsSuccess implements Action {
  readonly type = ChallengeCreatorActionTypes.CompareLoadHomePointsSuccess;

  constructor(public payload: Position[]) {}
}

export class CompareLoadHomePointsFailure implements Action {
  readonly type = ChallengeCreatorActionTypes.CompareLoadHomePointsFailure;

  constructor(public payload: ApiError) {}
}

export class SelectTeamForChallenge implements Action {
  readonly type = ChallengeCreatorActionTypes.SelectTeamForChallenge;

  constructor(public payload: Team) {}
}

export class LoadPickedTeamHomeSuccess implements Action {
  readonly type = ChallengeCreatorActionTypes.LoadPickedTeamHomeSuccess;

  constructor(public payload: Position) {}
}

export class LoadPickedTeamHomeFailure implements Action {
  readonly type = ChallengeCreatorActionTypes.LoadPickedTeamHomeFailure;

  constructor(public payload: ApiError) {}
}

export class AddEntryPlaceTimeOffer implements Action {
  readonly type = ChallengeCreatorActionTypes.AddEntryPlaceTimeOffer;

  constructor(public payload: PlaceTimeOffer) {}
}

export class CancelEntryPlaceTimeOffer implements Action {
  readonly type = ChallengeCreatorActionTypes.CancelEntryPlaceTimeOffer;

  constructor(public payload: PlaceTimeOffer) {}
}

export class BackToResults implements Action {
  readonly type = ChallengeCreatorActionTypes.BackToResults;
}

export class BackToSearchForm implements Action {
  readonly type = ChallengeCreatorActionTypes.BackToSearchForm;
}

export class CreateChallenge implements Action {
  readonly type = ChallengeCreatorActionTypes.CreateChallenge;
}

export class CreateChallengeSuccess implements Action {
  readonly type = ChallengeCreatorActionTypes.CreateChallengeSuccess;

  constructor(public payload: Challenge) {}
}

export class CreateChallengeFailure implements Action {
  readonly type = ChallengeCreatorActionTypes.CreateChallengeFailure;

  constructor(public payload: ApiError) {}
}

export class AddEntryTimeOffers implements Action {
  readonly type = ChallengeCreatorActionTypes.AddEntryTimeOffers;

  constructor(public payload: Challenge) {}
}

export class AddEntryTimeOffersSuccess implements Action {
  readonly type = ChallengeCreatorActionTypes.AddEntryTimeOffersSuccess;
}

export class AddEntryTimeOffersFailure implements Action {
  readonly type = ChallengeCreatorActionTypes.AddEntryTimeOffersFailure;

  constructor(public payload: ApiError) {}
}

export type ChallengeCreatorActionsUnion = Search | SearchSuccess | SearchFailure | Check | Uncheck | UncheckAll
  | CompareSelected
  | CompareLoadPlayers | CompareLoadPlayersSuccess | CompareLoadPlayersFailure
  | CompareLoadHomePoints | CompareLoadHomePointsSuccess | CompareLoadHomePointsFailure
  | SelectTeamForChallenge | LoadPickedTeamHomeSuccess | LoadPickedTeamHomeFailure | CancelEntryPlaceTimeOffer
  | AddEntryPlaceTimeOffer | BackToResults | BackToSearchForm | CreateChallenge
  | CreateChallengeSuccess | CreateChallengeFailure
  | AddEntryTimeOffers | AddEntryTimeOffersSuccess | AddEntryTimeOffersFailure;

