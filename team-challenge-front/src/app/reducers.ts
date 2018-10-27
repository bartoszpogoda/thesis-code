// TODO Maybe make core load after user log in.

// import {
//   ActionReducerMap,
//   createSelector,
//   createFeatureSelector,
//   ActionReducer,
//   MetaReducer,
// } from '@ngrx/store';
// import * as fromRouter from '@ngrx/router-store';
//
// /**
//  * storeFreeze prevents state from being mutated. When mutation occurs, an
//  * exception will be thrown. This is useful during development mode to
//  * ensure that none of the store accidentally mutates the state.
//  */
// import { storeFreeze } from 'ngrx-store-freeze';
// import {environment} from '../environments/environment';
//
//
// /**
//  * As mentioned, we treat each reducer like a table in a database. This means
//  * our top level state interface is just a map of keys to inner state types.
//  */
// export interface State {
//   router: fromRouter.RouterReducerState;
// }
//
// export const reducers: ActionReducerMap<State> = {
//   router: fromRouter.routerReducer,
// };
//
// // console.log all actions
// export function logger(reducer: ActionReducer<State>): ActionReducer<State> {
//   return function(state: State, action: any): State {
//     console.log('state', state);
//     console.log('action', action);
//
//     return reducer(state, action);
//   };
// }
//
// /**
//  * By default, @ngrx/store uses combineReducers with the reducer map to compose
//  * the root meta-reducer. To add more meta-store, provide an array of meta-store
//  * that will be composed to form the root meta-reducer.
//  */
// export const metaReducers: MetaReducer<State>[] = !environment.production
//   ? [logger, storeFreeze]
//   : [];
//
//
//
//
//
//
