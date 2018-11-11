import * as fromRoot from '../../core/reducers/index';
import * as fromChallengeCreator from './challenge-creator.reducer';

import {ActionReducerMap, createFeatureSelector, createSelector} from '@ngrx/store';
import {AuthState, selectAuthState} from '../../auth/reducers';

export interface ChallengeState {
  creator: fromChallengeCreator.State;
}

export interface State extends fromRoot.State {
  challenge: ChallengeState;
}

export const reducers: ActionReducerMap<ChallengeState> = {
  creator: fromChallengeCreator.reducer
};

export const selectChallengeState = createFeatureSelector<State, ChallengeState>('challenge');

export const selectChallengeCreatorState = createSelector(
  selectChallengeState,
  (state: ChallengeState) => state.creator
);

