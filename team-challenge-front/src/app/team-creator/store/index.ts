import * as fromTeamCreator from './team-creator.reducer';
import * as fromRoot from './../../core/reducers/index';

import {ActionReducerMap, createFeatureSelector, createSelector} from '@ngrx/store';

export interface TeamCreatorState {
  teamCreator: fromTeamCreator.State;
}

export interface State extends fromRoot.State {
  teamCreator: TeamCreatorState;
}

