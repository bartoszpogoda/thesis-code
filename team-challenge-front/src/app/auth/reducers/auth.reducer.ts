import {AuthActionsUnion, AuthActionTypes} from '../actions/auth.actions';
import {Token} from '../models/token';

export interface State {
  loggedIn: boolean;
  token: Token | null;
}

const initialState: State = {
  loggedIn: false,
  token: null
};

export function reducer(
  state: State = initialState,
  action: AuthActionsUnion
): State {
  switch (action.type) {

    case AuthActionTypes.LoginSuccess:
      return {
        ...state,
        loggedIn: true,
        token: action.payload,
      };

    default:
      return state;
  }
}

export const getLoggedIn = (state: State) => state.loggedIn;
