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
 * ensure that none of the store accidentally mutates the state.
 */
import { storeFreeze } from 'ngrx-store-freeze';

/**
 * Every reducer module's default export is the reducer function itself. In
 * addition, each module should export a type or interface that describes
 * the state of the reducer plus any selector functions. The `* as`
 * notation packages up all of the exports into a single object.
 */
import * as fromLayout from './layout.reducer';
import * as fromMyPlayer from './my-player.reducer';
import * as fromMyTeam from './my-team.reducer';
import * as fromPending from './pending.reducer';
import * as fromManager from './manager.reducer';
import * as fromNotification from './notification.reducer';
import * as fromCore from './core.reducer';
import {selectTeamState} from '../selectors/my-team.selectors';


/**
 * As mentioned, we treat each reducer like a table in a database. This means
 * our top level state interface is just a map of keys to inner state types.
 */
export interface State {
  core: fromCore.State;
  layout: fromLayout.State;
  pending: fromPending.State;
  router: fromRouter.RouterReducerState;
  myPlayer: fromMyPlayer.State;
  myTeam: fromMyTeam.State;
  manager: fromManager.State;
  notification: fromNotification.State;
}

/**
 * Our state is composed of a map of action reducer functions.
 * These reducer functions are called with each dispatched action
 * and the current or initial state and return a new immutable state.
 */
export const reducers: ActionReducerMap<State> = {
  core: fromCore.reducer,
  layout: fromLayout.reducer,
  pending: fromPending.reducer,
  router: fromRouter.routerReducer,
  myPlayer: fromMyPlayer.reducer,
  myTeam: fromMyTeam.reducer,
  manager: fromManager.reducer,
  notification: fromNotification.reducer
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
 * the root meta-reducer. To add more meta-store, provide an array of meta-store
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

export const selectMyTeamHomeNotSet = createSelector(
  selectManagerState,
  fromManager.getHomeNotSet
);







