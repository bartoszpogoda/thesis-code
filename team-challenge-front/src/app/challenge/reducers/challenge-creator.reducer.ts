import {SearchForm} from '../models/search-form';
import {ScoredTeam, SearchResult} from '../models/search-result';
import {ChallengeCreatorActionsUnion, ChallengeCreatorActionTypes} from '../actions/challenge-creator.actions';
import {PlaceTimeOffer} from '../models/challenge';
import {Position} from '../../core/models/position';
import {Player} from '../../core/models/player';
import {Team} from '../../core/models/team';
import {MyTeamActionsUnion, MyTeamActionTypes} from '../../core/actions/my-team.actions';
import {AuthActionsUnion, AuthActionTypes} from '../../auth/actions/auth.actions';


export interface State {
  step: number;
  searchForm: SearchForm;
  result: SearchResult;
  searching: boolean;
  comparing: boolean;
  selected: ScoredTeam[];
  players: Player[][];
  homePoints: Position[];
  pickedTeam: Team;
  pickedTeamHome: Position;
  entryPlaceTimeOffers: PlaceTimeOffer[];
}

const initialState: State = {
  step: 0,
  searchForm: {
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
  comparing: false,
  selected: [],
  players: [],
  homePoints: [],
  pickedTeam: null,
  pickedTeamHome: null,
  entryPlaceTimeOffers: []
};

export function reducer(
  state: State = initialState,
  action: MyTeamActionsUnion | ChallengeCreatorActionsUnion | AuthActionsUnion
): State {
  switch (action.type) {

    case AuthActionTypes.Logout:
      return {
        ...initialState
      };

    case MyTeamActionTypes.LoadCurrentSuccess:
      return {
        ...state,
        searchForm: {
          ...state.searchForm,
          searchingTeamId: action.payload.id
        }
      };

    case ChallengeCreatorActionTypes.Search:
      return {
        ...state,
        searchForm: action.payload,
        result: null,
        searching: true,
        selected: [],
        step: 1
      };

    case ChallengeCreatorActionTypes.SearchSuccess:
      return {
        ...state,
        result: action.payload,
        searching: false
      };

    case ChallengeCreatorActionTypes.SearchFailure:
      return {
        ...state,
        searching: false
      };

    case ChallengeCreatorActionTypes.Check:
      return {
        ...state,
        selected: state.selected.length < 3 ? [...state.selected, action.payload] : state.selected
      };

    case ChallengeCreatorActionTypes.Uncheck:
      return {
        ...state,
        selected: state.selected.filter(sel => sel !== action.payload)
      };

    case ChallengeCreatorActionTypes.UncheckAll:
      return {
        ...state,
        selected: []
      };

    case ChallengeCreatorActionTypes.CompareLoadHomePoints:
      return {
        ...state,
        homePoints: []
      };

    case ChallengeCreatorActionTypes.CompareLoadHomePointsSuccess:
      return {
        ...state,
        homePoints: action.payload
      };

    case ChallengeCreatorActionTypes.CompareLoadPlayers:
      return {
        ...state,
        players: []
      };

    case ChallengeCreatorActionTypes.CompareLoadPlayersSuccess:
      return {
        ...state,
        players: action.payload
      };

    case ChallengeCreatorActionTypes.SelectTeamForChallenge:
      return {
        ...state,
        pickedTeam: action.payload,
        comparing: false,
        step: 2
      };

    case ChallengeCreatorActionTypes.LoadPickedTeamHomeSuccess:
      return {
        ...state,
        pickedTeamHome: action.payload
      };

    case ChallengeCreatorActionTypes.AddEntryPlaceTimeOffer:
      return {
        ...state,
        entryPlaceTimeOffers: [...state.entryPlaceTimeOffers, action.payload]
      };

    case ChallengeCreatorActionTypes.CancelEntryPlaceTimeOffer:
      return {
        ...state,
        entryPlaceTimeOffers: state.entryPlaceTimeOffers.filter(offer => offer !== action.payload)
      };

    case ChallengeCreatorActionTypes.CompareSelected:
      return {
        ...state,
        comparing: true
      };

    case ChallengeCreatorActionTypes.BackToResults:
      return {
        ...state,
        comparing: false,
        step: 1
      };

    case ChallengeCreatorActionTypes.BackToSearchForm:
      return {
        ...state,
        comparing: false,
        step: 0
      };

    case ChallengeCreatorActionTypes.AddEntryTimeOffersSuccess:
      return {
        ...initialState,
        searchForm: {
          ...state.searchForm
        }
      };

    default:
      return state;
  }
}

export const getStep = (state: State) => state.step;
export const getSearchForm = (state: State) => state.searchForm;
export const getSearching = (state: State) => state.searching;
export const getComparing = (state: State) => state.comparing;
export const getResult = (state: State) => state.result;
export const getSelected = (state: State) => state.selected;
export const getPlayers = (state: State) => state.players;
export const getHomePoints = (state: State) => state.homePoints;
export const getPickedTeam = (state: State) => state.pickedTeam;
export const getEntryPlaceTimeOffers = (state: State) => state.entryPlaceTimeOffers;
export const getPickedTeamHome = (state: State) => state.pickedTeamHome;
