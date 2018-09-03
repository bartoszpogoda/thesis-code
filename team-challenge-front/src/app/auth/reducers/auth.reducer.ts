import {AuthActionsUnion, AuthActionTypes} from '../actions/auth.actions';
import {DecodedToken, Token} from '../models/token';

export interface State {
  loggedIn: boolean;
  token: Token | null;
  decoded: DecodedToken | null;
}

const initialState: State = {
  loggedIn: false,
  token: null,
  decoded: null
};

export function reducer(
  state: State = initialState,
  action: AuthActionsUnion
): State {
  switch (action.type) {

    case AuthActionTypes.DecodeToken:
      return {
        ...state,
        token: action.payload,
      };

    case AuthActionTypes.DecodeTokenSuccess:
      return {
        ...state,
        decoded: action.payload,
      };

    case AuthActionTypes.LoginSuccess:
      return {
        ...state,
        loggedIn: true
      };

    default:
      return state;
  }
}

export const getLoggedIn = (state: State) => state.loggedIn;
