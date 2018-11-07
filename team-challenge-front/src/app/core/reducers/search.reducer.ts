import {SearchForm} from '../models/search-form';
import {MyTeamActionsUnion, MyTeamActionTypes} from '../actions/my-team.actions';
import {SearchResult} from '../models/search-result';
import {SearchActionsUnion, SearchActionTypes} from '../actions/search.actions';


export interface State {
  builder: SearchForm;
  result: SearchResult;
  searching: boolean;
}

const initialState: State = {
  builder: {
    searchingTeamId: null,
    preferences: {
      friendly: false,
      weightAgeDiff: 0.34,
      weightExperienceDiff: 0.33,
      weightDistance: 0.33
    }
  },
  result: null,
  searching: false
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
        searching: true
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

    default:
      return state;
  }
}

export const getBuilder = (state: State) => state.builder;
export const getSearching = (state: State) => state.searching;
export const getResult = (state: State) => state.result;
