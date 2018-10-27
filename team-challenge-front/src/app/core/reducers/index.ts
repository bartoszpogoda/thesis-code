import {
  ActionReducerMap,
  createSelector,
  createFeatureSelector,
  ActionReducer,
  MetaReducer,
} from '@ngrx/store';
import { environment } from '../../../environments/environment';
import * as fromRouter from '@ngrx/router-store';

/**
 * storeFreeze prevents state from being mutated. When mutation occurs, an
 * exception will be thrown. This is useful during development mode to
 * ensure that none of the reducers accidentally mutates the state.
 */
import { storeFreeze } from 'ngrx-store-freeze';

/**
 * Every reducer module's default export is the reducer function itself. In
 * addition, each module should export a type or interface that describes
 * the state of the reducer plus any selector functions. The `* as`
 * notation packages up all of the exports into a single object.
 */
import * as fromLayout from './layout.reducer';
import * as fromPlayer from './player.reducer';
import * as fromTeam from './team.reducer';
import * as fromPending from './pending.reducer';
import * as fromManager from './manager.reducer';
import * as fromTeamCreator from './team-creator.reducer';
import * as fromPlayerCreator from './player-creator.reducer';

/**
 * As mentioned, we treat each reducer like a table in a database. This means
 * our top level state interface is just a map of keys to inner state types.
 */
export interface State {
  layout: fromLayout.State;
  pending: fromPending.State;
  router: fromRouter.RouterReducerState;
  player: fromPlayer.State;
  team: fromTeam.State;
  manager: fromManager.State;
  teamCreator: fromTeamCreator.State;
  playerCreator: fromPlayerCreator.State;
}

/**
 * Our state is composed of a map of action reducer functions.
 * These reducer functions are called with each dispatched action
 * and the current or initial state and return a new immutable state.
 */
export const reducers: ActionReducerMap<State> = {
  layout: fromLayout.reducer,
  pending: fromPending.reducer,
  router: fromRouter.routerReducer,
  player: fromPlayer.reducer,
  team: fromTeam.reducer,
  manager: fromManager.reducer,
  teamCreator: fromTeamCreator.reducer,
  playerCreator: fromPlayerCreator.reducer
};

// console.log all actions
export function logger(reducer: ActionReducer<State>): ActionReducer<State> {
  return function(state: State, action: any): State {
    console.log('state', state);
    console.log('action', action);

    return reducer(state, action);
  };
}

/**
 * By default, @ngrx/store uses combineReducers with the reducer map to compose
 * the root meta-reducer. To add more meta-reducers, provide an array of meta-reducers
 * that will be composed to form the root meta-reducer.
 */
export const metaReducers: MetaReducer<State>[] = !environment.production
  ? [logger, storeFreeze]
  : [];

/**
 * Layout Selectors
 */
export const getLayoutState = createFeatureSelector<State, fromLayout.State>(
  'layout'
);

export const getShowNotificationsPanel = createSelector(
  getLayoutState,
  fromLayout.getShowNotificationsPanel
);

/**
 * Pending Selectors
 */
export const getPendingState = createFeatureSelector<State, fromPending.State>(
  'pending'
);

export const selectPending = createSelector(
  getPendingState,
  fromPending.getPending
);

/**
 * Player Selectors
 */
export const selectPlayerState = createFeatureSelector<State, fromPlayer.State>('player');

export const selectPlayerProfile = createSelector(
  selectPlayerState,
  fromPlayer.getPlayer
);

export const selectPlayerProfileNotExisting = createSelector(
  selectPlayerState,
  fromPlayer.getNotExisting
);

export const selectPlayerProfileHasAnyNotifications = createSelector(
  selectPlayerState,
  fromPlayer.getAnyNotifications
);


export const selectPlayerInvitations = createSelector(
  selectPlayerState,
  fromPlayer.getTeamInvitations
);

export const selectPlayerAvatarUrl = createSelector(
  selectPlayerState,
  fromPlayer.getAvatarUrl
);
/**
 * Team Selectors
 */
export const selectTeamState = createFeatureSelector<State, fromTeam.State>('team');

export const selectHasTeam = createSelector(
  selectTeamState,
  fromTeam.getHasTeam
);

export const selectPlayerTeam = createSelector(
  selectTeamState,
  fromTeam.getCurrent
);

export const selectIsManager = createSelector(
  selectTeamState,
  fromTeam.getIsManager
);




/**
 * Manager Selectors
 * */

export const selectManagerState = createFeatureSelector<State, fromManager.State>('manager');

export const selectInvitePlayerData = createSelector(
  selectManagerState,
  fromManager.getInvitePlayerData
);

export const selectInvitePlayerNameSearch = createSelector(
  selectManagerState,
  fromManager.getInvitePlayerNameSearch
);

export const selectInvitePlayerPage = createSelector(
  selectManagerState,
  fromManager.getInvitePlayerPage
);

export const selectInvitePlayerTotal = createSelector(
  selectManagerState,
  fromManager.getInvitePlayerTotal
);

export const selectInvitePlayerLoading = createSelector(
  selectManagerState,
  fromManager.getInvitePlayerLoading
);

export const selectManagementInvitations = createSelector(
  selectManagerState,
  fromManager.getInvitations
);








