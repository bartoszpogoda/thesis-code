import {createFeatureSelector, createSelector} from '@ngrx/store';
import {selectPlayerState, State} from '../reducers/index';

import * as fromTeamCreator from '../reducers/team-creator.reducer';


export const selectState = createFeatureSelector<State, fromTeamCreator.State>('teamCreator');

export const selectStage = createSelector(
  selectState,
  fromTeamCreator.getStage
);

export const selectTeam = createSelector(
  selectState,
  fromTeamCreator.getTeam
);

export const selectStageAvatarBtnText = createSelector(
  selectState,
  fromTeamCreator.getStageAvatarBtnText
);

export const selectStageAvatarUploading = createSelector(
  selectState,
  fromTeamCreator.getStageAvatarUploading
);

export const selectStageAvatarUploaded = createSelector(
  selectState,
  fromTeamCreator.getStageAvatarUploaded
);
