import * as fromRoot from '../../core/reducers/index';
import * as fromCommunityTeams from './community-teams.reducer';
import * as fromCommunity from './community.reducer';

import {ActionReducerMap, createFeatureSelector, createSelector} from '@ngrx/store';
import * as fromAuth from '../../auth/reducers/auth.reducer';
import {AuthState, selectAuthState} from '../../auth/reducers';
import {selectPlayerProfile} from '../../core/selectors/my-player.selectors';

export interface CommunityState {
  common: fromCommunity.State;
  teams: fromCommunityTeams.State;
}

export interface State extends fromRoot.State {
  community: CommunityState;
}

export const reducers: ActionReducerMap<CommunityState> = {
  common: fromCommunity.reducer,
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

export const selectCurrentTeam = createSelector(
  selectTeamsState,
  fromCommunityTeams.getCurrentTeam
);

export const selectCurrentTeamPlayers = createSelector(
  selectTeamsState,
  fromCommunityTeams.getCurrentTeamPlayers
);

export const selectCommons = createSelector(
  selectCommunityState,
  (state: CommunityState) => state.common
);

export const selectSelectedRegionId = createSelector(
  selectCommons,
  fromCommunity.getSelectedRegionId
);

export const selectSelectedRegionOrDefault = createSelector(
  selectPlayerProfile,
  selectSelectedRegionId,
  (player, region) => {
    return region !== null ? region : (player !== null ? player.regionId : 'wro');
  }
);



