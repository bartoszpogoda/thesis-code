import {AuthActionsUnion, AuthActionTypes} from '../actions/auth.actions';
import {DecodedToken, Token} from '../models/token';

export interface State {
  loggedIn: boolean;
  tokenExpired: boolean;
  tokenRenewalPending: boolean;
  token: Token | null;
  decoded: DecodedToken | null;
}

const initialState: State = {
  loggedIn: false,
  tokenExpired: false,
  tokenRenewalPending: false,
  token: null,
  decoded: null
};

export function reducer(
  state: State = initialState,
  action: AuthActionsUnion
): State {
  switch (action.type) {

    case AuthActionTypes.GenerateTokenSuccess:
      return {
        ...state,
        token: action.payload,
      };

    case AuthActionTypes.DecodeTokenSuccess:
      return {
        ...state,
        decoded: action.payload,
        tokenExpired: false
      };

    case AuthActionTypes.LoginSuccess:
      return {
        ...state,
        loggedIn: true
      };

    case AuthActionTypes.Logout:
      return {
        ...initialState
      };

    case AuthActionTypes.DecodeTokenFailureExpired:
      return {
        ...state,
        tokenExpired: true,
        token: null
      };

    case AuthActionTypes.RenewToken:
      return {
        ...state,
        tokenRenewalPending: true
      };

    case AuthActionTypes.RenewTokenReceived:
      return {
        ...state,
        token: action.payload
      };

    case AuthActionTypes.RenewTokenSuccess:
      return {
        ...state,
        tokenRenewalPending: false
      };

    case AuthActionTypes.RenewTokenFailure:
      return {
        ...state,
        tokenRenewalPending: false
      };

    default:
      return state;
  }
}

export const getLoggedIn = (state: State) => state.loggedIn;
export const getToken = (state: State) => state.token;
export const getDecoded = (state: State) => state.decoded;
export const getTokenRenewalPending = (state: State) => state.tokenRenewalPending;
