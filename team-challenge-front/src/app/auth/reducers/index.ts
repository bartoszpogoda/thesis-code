import * as fromRoot from '../../reducers';
import * as fromAuth from './auth.reducer';
import * as fromLogin from './login.reducer';
import * as fromRegister from './register.reducer';

import {ActionReducerMap, createFeatureSelector, createSelector} from '@ngrx/store';

export interface AuthState {
  status: fromAuth.State;
  login: fromLogin.State;
  register: fromRegister.State;
}


export interface State extends fromRoot.State {
  auth: AuthState;
}

export const reducers: ActionReducerMap<AuthState> = {
  status: fromAuth.reducer,
  login: fromLogin.reducer,
  register: fromRegister.reducer
};

export const selectAuthState = createFeatureSelector<State, AuthState>('auth');

export const selectAuthStatusState = createSelector(
  selectAuthState,
  (state: AuthState) => state.status
);

export const selectLoginState = createSelector(
  selectAuthState,
  (state: AuthState) => state.login
);

export const selectRegisterState = createSelector(
  selectAuthState,
  (state: AuthState) => state.register
);

export const selectLoginPending = createSelector(
  selectLoginState,
  fromLogin.getPending
);

export const selectLoggedIn = createSelector(
  selectAuthStatusState,
  fromAuth.getLoggedIn
);

export const selectLoginError = createSelector(
  selectLoginState,
  fromLogin.getError
);

export const selectRegisterPending = createSelector(
  selectRegisterState,
  fromRegister.getPending
);

export const selectRegisterError = createSelector(
  selectRegisterState,
  fromRegister.getError
);

export const selectJustRegistered = createSelector(
  selectRegisterState,
  fromRegister.getJustRegistered
);

export const selectUserFullname = createSelector(
  selectAuthStatusState,
  state => state.decoded.fullName
);

export const selectToken = createSelector(
  selectAuthStatusState,
  fromAuth.getToken
);

export const selectDecodedToken = createSelector(
  selectAuthStatusState,
  fromAuth.getDecoded
);
