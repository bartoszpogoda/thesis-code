import {AuthActionsUnion, AuthActionTypes} from '../actions/auth.actions';
import {ApiError} from '../../core/models/error';

export interface State {
  justRegistered: boolean;
  error: ApiError | null;
}

const initialState: State = {
  justRegistered: false,
  error: null
};

export function reducer(
  state: State = initialState,
  action: AuthActionsUnion
): State {
  switch (action.type) {
    case AuthActionTypes.Register:
      return {
        ...state,
        justRegistered: false,
        error: null
      };
    case AuthActionTypes.RegisterSuccess:
      return {
        ...state,
        justRegistered: true,
        error: null
      };
    case AuthActionTypes.RegisterFailure:
      return {
        ...state,
        justRegistered: false,
        error: action.payload
      };
    case AuthActionTypes.Login:
      return {
        ...state,
        justRegistered: false,
        error: null
      }
    default:
      return state;
  }
}

export const getJustRegistered = (state: State) => state.justRegistered;
export const getError = (state: State) => state.error;
