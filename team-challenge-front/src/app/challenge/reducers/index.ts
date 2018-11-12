import * as fromRoot from '../../core/reducers/index';
import * as fromChallengeCreator from './challenge-creator.reducer';
import * as fromMyChallenges from './my-challenges.reducer';
import * as fromFacilities from './facilities.reducer';

import {ActionReducerMap, createFeatureSelector, createSelector} from '@ngrx/store';

export interface ChallengeState {
  creator: fromChallengeCreator.State;
  myChallenges: fromMyChallenges.State;
  facilities: fromFacilities.State;
}

export interface State extends fromRoot.State {
  challenge: ChallengeState;
}

export const reducers: ActionReducerMap<ChallengeState> = {
  creator: fromChallengeCreator.reducer,
  myChallenges: fromMyChallenges.reducer,
  facilities: fromFacilities.reducer,
};

export const selectChallengeState = createFeatureSelector<State, ChallengeState>('challenge');

export const selectChallengeCreatorState = createSelector(
  selectChallengeState,
  (state: ChallengeState) => state.creator
);

export const selectMyChallengesState = createSelector(
  selectChallengeState,
  (state: ChallengeState) => state.myChallenges
);

export const selectFacilitiesState = createSelector(
  selectChallengeState,
  (state: ChallengeState) => state.facilities
);

export const selectFacilities = createSelector(
  selectFacilitiesState,
  fromFacilities.getFacilities
);




