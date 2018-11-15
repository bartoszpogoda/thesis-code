
import * as fromMyTeam from '../reducers/my-team.reducer';
import {createFeatureSelector, createSelector} from '@ngrx/store';
import {selectMyTeamHomeNotSet, State} from '../reducers';
import {selectMyPlayerRegion, selectRegions} from './core.selectors';


export const selectTeamState = createFeatureSelector<State, fromMyTeam.State>('myTeam');

export const selectHasTeam = createSelector(
  selectTeamState,
  fromMyTeam.getHasTeam
);

export const selectMyTeam = createSelector(
  selectTeamState,
  fromMyTeam.getCurrent
);

export const selectMyTeamHome = createSelector(
  selectTeamState,
  fromMyTeam.getHome
);

export const selectIsMyTeamActive = createSelector(
  selectMyTeam,
  (myTeam) => myTeam !== null ? myTeam.active : false
);

export const selectIsManager = createSelector(
  selectTeamState,
  fromMyTeam.getIsManager
);

export const selectIsMyTeamReadyForChallenge = createSelector(
  selectIsMyTeamActive,
  selectIsManager,
  (active, manager) => active && manager
);

export const selectMyTeamHomeOrRegionCenter = createSelector(
  selectMyTeamHome,
  selectMyTeamHomeNotSet,
  selectMyPlayerRegion,
  (home, notSet, region) => {
    return notSet ? region.center : (home ? home : region.center);
  }
);

export const selectMyTeamRegion = createSelector(
  selectMyTeam,
  selectRegions,
  (myTeam, regions) => {
    return regions.filter(region => region.id === myTeam.regionId)[0];
  }
);

export const selectMyTeamPlayers = createSelector(
  selectTeamState,
  fromMyTeam.getPlayers
);



