import {createFeatureSelector, createSelector} from '@ngrx/store';
import {State} from './index';

import * as fromFacilityCreator from './facility-creator.reducer';
import {FacilityCreatorState} from './index';

export const selectState = createFeatureSelector<State, fromFacilityCreator.State>('facilityCreator');

export const selectStage = createSelector(
  selectState,
  fromFacilityCreator.getStage
);

export const selectBuilder = createSelector(
  selectState,
  fromFacilityCreator.getBuilder
);
