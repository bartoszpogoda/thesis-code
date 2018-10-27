import {createFeatureSelector, createSelector} from '@ngrx/store';
import {State} from '../reducers';

import * as fromPlayerCreator from '../reducers/player-creator.reducer';

export const selectState = createFeatureSelector<State, fromPlayerCreator.State>('playerCreator');

export const selectStage = createSelector(
  selectState,
  fromPlayerCreator.getStage
);

export const selectAvatarUploading = createSelector(
  selectState,
  fromPlayerCreator.getAvatarUploading
);

export const selectAvatarUploaded = createSelector(
  selectState,
  fromPlayerCreator.getAvatarUploaded
);

export const selectButtonText = createSelector(
  selectState,
  fromPlayerCreator.getButtonText
);

