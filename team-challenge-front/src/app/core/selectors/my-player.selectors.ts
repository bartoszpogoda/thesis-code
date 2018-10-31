
import * as fromMyPlayer from '../reducers/my-player.reducer';
import {createFeatureSelector, createSelector} from '@ngrx/store';
import {selectMyTeamHomeNotSet, State} from '../reducers';
import {selectMyPlayerRegion} from './core.selectors';
import {selectMyTeamHome} from './my-team.selectors';

export const selectPlayerState = createFeatureSelector<State, fromMyPlayer.State>('myPlayer');

export const selectPlayerProfile = createSelector(
  selectPlayerState,
  fromMyPlayer.getPlayer
);

export const selectPlayerProfileNotExisting = createSelector(
  selectPlayerState,
  fromMyPlayer.getNotExisting
);

export const selectPlayerInvitations = createSelector(
  selectPlayerState,
  fromMyPlayer.getTeamInvitations
);

export const selectPlayerAvatarUrl = createSelector(
  selectPlayerState,
  fromMyPlayer.getAvatarUrl
);

