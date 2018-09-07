import {AuthActionsUnion, AuthActionTypes} from '../actions/auth.actions';
import {ApiError} from '../../core/models/error';

export interface State {
  pending: boolean;
  justRegistered: boolean;
  error: ApiError | null; // TODO common Error model
}

const initialState: State = {
  pending: false,
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
        pending: true,
        justRegistered: false,
        error: null
      };
    case AuthActionTypes.RegisterSuccess:
      return {
        ...state,
        pending: false,
        justRegistered: true,
        error: null
      };
    case AuthActionTypes.RegisterFailure:
      return {
        ...state,
        pending: false,
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

export const getPending = (state: State) => state.pending;
export const getJustRegistered = (state: State) => state.justRegistered;
export const getError = (state: State) => state.error;
