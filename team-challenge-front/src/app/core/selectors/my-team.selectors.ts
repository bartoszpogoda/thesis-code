
import * as fromMyTeam from '../reducers/my-team.reducer';
import {createFeatureSelector, createSelector} from '@ngrx/store';
import {selectMyTeamHomeNotSet, State} from '../reducers';
import {selectMyPlayerRegion} from './core.selectors';


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


export const selectIsManager = createSelector(
  selectTeamState,
  fromMyTeam.getIsManager
);

export const selectMyTeamHomeOrRegionCenter = createSelector(
  selectMyTeamHome,
  selectMyTeamHomeNotSet,
  selectMyPlayerRegion,
  (home, notSet, region) => {
    return notSet ? region.center : home;
  }
);

