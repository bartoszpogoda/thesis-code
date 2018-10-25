import * as fromRoot from '../../reducers';
import * as fromCommunityTeams from './community-teams.reducer';

import {ActionReducerMap, createFeatureSelector, createSelector} from '@ngrx/store';
import * as fromAuth from '../../auth/reducers/auth.reducer';
import {AuthState, selectAuthState} from '../../auth/reducers';

export interface CommunityState {
  teams: fromCommunityTeams.State;
}

export interface State extends fromRoot.State {
  community: CommunityState;
}

export const reducers: ActionReducerMap<CommunityState> = {
  teams: fromCommunityTeams.reducer
};

export const selectCommunityState = createFeatureSelector<State, CommunityState>('community');


export const selectTeamsState = createSelector(
  selectCommunityState,
  (state: CommunityState) => state.teams
);

export const selectTeamsPage = createSelector(
  selectTeamsState,
  fromCommunityTeams.getPage
);

export const selectTeamsCurrentPage = createSelector(
  selectTeamsState,
  fromCommunityTeams.getCurrentPage
);

export const selectTeamsPageSize = createSelector(
  selectTeamsState,
  fromCommunityTeams.getPageSize
);

export const selectTeamsTotal = createSelector(
  selectTeamsState,
  fromCommunityTeams.getTotal
);

export const selectTeams = createSelector(
  selectTeamsState,
  fromCommunityTeams.getTeams
);
