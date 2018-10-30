import {createFeatureSelector, createSelector} from '@ngrx/store';
import { State} from '../reducers';
import * as fromCore from '../reducers/core.reducer';
import {selectPlayerProfile} from './my-player.selectors';


export const selectCoreState = createFeatureSelector<State, fromCore.State>('core');

export const selectRegions = createSelector(
  selectCoreState,
  fromCore.getRegions
);

export const selectMyPlayerRegion = createSelector(
  selectPlayerProfile,
  selectRegions,
  (player, regions) => {
    const filtered = regions.filter(reg => reg.id === player.regionId);
    return filtered.length > 0 ? filtered[0] : null;
  }
);

