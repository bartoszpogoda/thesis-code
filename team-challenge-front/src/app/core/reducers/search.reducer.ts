import {SearchForm} from '../models/search-form';
import {MyTeamActionsUnion, MyTeamActionTypes} from '../actions/my-team.actions';
import {ScoredTeam, SearchResult} from '../models/search-result';
import {SearchActionsUnion, SearchActionTypes} from '../actions/search.actions';
import {Player} from '../models/player';
import {Position} from '../models/position';
import {Team} from '../models/team';
import {PlaceTimeOffer} from '../models/challenge';
import {a} from '@angular/core/src/render3';


export interface State {
  builder: SearchForm;
  result: SearchResult;
  searching: boolean;
  selected: ScoredTeam[];
  players: Player[][];
  homePoints: Position[];
  pickedTeam: Team;
  pickedTeamHome: Position;
  entryPlaceTimeOffers: PlaceTimeOffer[];
}

const initialState: State = {
  builder: {
    searchingTeamId: null,
    preferences: {
      friendly: false,
      weightAgeDiff: 0.34,
      weightSkillDiff: 0.33,
      weightDistance: 0.33
    }
  },
  result: null,
  searching: false,
  selected: [],
  players: [],
  homePoints: [],
  pickedTeam: null,
  pickedTeamHome: null,
  entryPlaceTimeOffers: []
};

export function reducer(
  state: State = initialState,
  action: MyTeamActionsUnion | SearchActionsUnion
): State {
  switch (action.type) {

    case MyTeamActionTypes.LoadCurrentSuccess:
      return {
        ...state,
        builder: {
          ...state.builder,
          searchingTeamId: action.payload.id
        }
      };

    case SearchActionTypes.Search:
      return {
        ...state,
        builder: action.payload,
        result: null,
        searching: true,
        selected: []
      };

    case SearchActionTypes.SearchSuccess:
      return {
        ...state,
        result: action.payload,
        searching: false
      };

    case SearchActionTypes.SearchFailure:
      return {
        ...state,
        searching: false
      };

    case SearchActionTypes.Check:
      return {
        ...state,
        selected: state.selected.length < 3 ? [...state.selected, action.payload] : state.selected
      };

    case SearchActionTypes.Uncheck:
      return {
        ...state,
        selected: state.selected.filter(sel => sel !== action.payload)
      };

    case SearchActionTypes.UncheckAll:
      return {
        ...state,
        selected: []
      };

    case SearchActionTypes.CompareLoadHomePoints:
      return {
        ...state,
        homePoints: []
      };

    case SearchActionTypes.CompareLoadHomePointsSuccess:
      return {
        ...state,
        homePoints: action.payload
      };

    case SearchActionTypes.CompareLoadPlayers:
      return {
        ...state,
        players: []
      };

    case SearchActionTypes.CompareLoadPlayersSuccess:
      return {
        ...state,
        players: action.payload
      };

    case SearchActionTypes.SelectTeamForChallenge:
      return {
        ...state,
        pickedTeam: action.payload
      };

    case SearchActionTypes.LoadPickedTeamHomeSuccess:
      return {
        ...state,
        pickedTeamHome: action.payload
      };

    case SearchActionTypes.AddEntryPlaceTimeOffer:
      return {
        ...state,
        entryPlaceTimeOffers: [...state.entryPlaceTimeOffers, action.payload]
      };



    default:
      return state;
  }
}

export const getBuilder = (state: State) => state.builder;
export const getSearching = (state: State) => state.searching;
export const getResult = (state: State) => state.result;
export const getSelected = (state: State) => state.selected;
export const getPlayers = (state: State) => state.players;
export const getHomePoints = (state: State) => state.homePoints;
export const getPickedTeam = (state: State) => state.pickedTeam;
export const getEntryPlaceTimeOffers = (state: State) => state.entryPlaceTimeOffers;
export const getPickedTeamHome = (state: State) => state.pickedTeamHome;
