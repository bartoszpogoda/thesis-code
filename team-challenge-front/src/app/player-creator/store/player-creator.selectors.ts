import {createFeatureSelector, createSelector} from '@ngrx/store';
import {PlayerCreatorState, State} from './index';

import * as fromPlayerCreator from './player-creator.reducer';
import {AuthState} from '../../auth/reducers';

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

