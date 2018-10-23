import {AuthActionsUnion, AuthActionTypes} from '../actions/auth.actions';
import {ApiError} from '../../core/models/error';
import {CoreActionTypes, CoreActionUnion} from '../../core/actions/core.actions';

export interface State {
  error: ApiError|null;
}

const initialState: State = {
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
        error: null
      };
    case AuthActionTypes.LoginSuccess:
      return {
        ...state,
        error: null
      };
    case AuthActionTypes.LoginFailure:
      return {
        ...state,
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

export const getError = (state: State) => state.error;
