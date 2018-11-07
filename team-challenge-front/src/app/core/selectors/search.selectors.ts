
import * as fromSearch from '../reducers/search.reducer';
import {createFeatureSelector, createSelector} from '@ngrx/store';
import {State} from '../reducers';


export const selectSearchState = createFeatureSelector<State, fromSearch.State>('search');

export const selectBuilder = createSelector(
  selectSearchState,
  fromSearch.getBuilder
);

export const selectSearching = createSelector(
  selectSearchState,
  fromSearch.getSearching
);

export const selectResult = createSelector(
  selectSearchState,
  fromSearch.getResult
);


