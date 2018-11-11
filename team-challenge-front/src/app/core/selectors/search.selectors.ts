
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

export const selectSelected = createSelector(
  selectSearchState,
  fromSearch.getSelected
);

export const selectThreeSelected = createSelector(
  selectSelected,
  selected => selected.length >= 3
);

export const selectOneSelected = createSelector(
  selectSelected,
  selected => selected.length === 1
);

export const selectMoreThanOneSelected = createSelector(
  selectSelected,
  selected => selected.length > 1
);

export const selectSelectedHomes = createSelector(
  selectSearchState,
  fromSearch.getHomePoints
);

export const selectSelectedPlayers = createSelector(
  selectSearchState,
  fromSearch.getPlayers
);

export const selectPickedTeam = createSelector(
  selectSearchState,
  fromSearch.getPickedTeam
);

export const selectEntryPlaceTimeOffers = createSelector(
  selectSearchState,
  fromSearch.getEntryPlaceTimeOffers
);

export const selectPickedTeamHome = createSelector(
  selectSearchState,
  fromSearch.getPickedTeamHome
);





