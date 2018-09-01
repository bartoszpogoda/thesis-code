import {AuthActionsUnion, AuthActionTypes} from '../actions/auth.actions';
import {ApiError} from '../../core/models/error';

export interface State {
  pending: boolean;
  error: ApiError|null;
}

const initialState: State = {
  pending: false,
  error: null,
};

export function reducer(
  state: State = initialState,
  action: AuthActionsUnion
): State {
  switch (action.type) {
    case AuthActionTypes.Login:
      return {
        ...state,
        pending: true,
        error: null
      };
    case AuthActionTypes.LoginSuccess:
      return {
        ...state,
        pending: false,
        error: null
      };
    case AuthActionTypes.LoginFailure:
      return {
        ...state,
        pending: false,
        error: action.payload
      };
    case AuthActionTypes.Register:
      return {
        ...state,
        error: null
      };

    default:
      return state;
  }
}

export const getPending = (state: State) => state.pending;
export const getError = (state: State) => state.error;
