import {LayoutActionsUnion,} from '../actions/layout.actions';
import {AuthActionsUnion, AuthActionTypes} from '../../auth/actions/auth.actions';
import {PlayerActionsUnion, PlayerActionTypes} from '../actions/player.actions';

const START_PENDING_ACTION_TYPES: any[] = [
  PlayerActionTypes.LoadCurrent,
  PlayerActionTypes.Register,
  AuthActionTypes.Login,
  AuthActionTypes.Register
];
const FINISH_PENDING_ACTION_TYPES: any[] = [
  PlayerActionTypes.LoadCurrentSuccess,
  PlayerActionTypes.RegisterSuccess,
  PlayerActionTypes.LoadCurrentFailure,
  PlayerActionTypes.RegisterFailure,
  AuthActionTypes.LoginSuccess,
  AuthActionTypes.LoginFailure,
  AuthActionTypes.RegisterSuccess,
  AuthActionTypes.RegisterFailure
];

export interface State {
  pending: number;
}

const initialState: State = {
  pending: 0
};

export function reducer(
  state: State = initialState,
  action: LayoutActionsUnion | AuthActionsUnion | PlayerActionsUnion
): State {
  if (isStartPendingAction(action)) {
    return {
      ...state,
      pending: state.pending + 1
    };
  } else if (isFinishPendingAction(action)) {
    return {
      ...state,
      pending: state.pending > 0 ? state.pending - 1 : 0
    };
  } else {
    return state;
  }
}

function isStartPendingAction(action: LayoutActionsUnion | AuthActionsUnion | PlayerActionsUnion) {
  return START_PENDING_ACTION_TYPES.indexOf(action.type) >= 0;
}

function isFinishPendingAction(action: LayoutActionsUnion | AuthActionsUnion | PlayerActionsUnion) {
  return FINISH_PENDING_ACTION_TYPES.indexOf(action.type) >= 0;
}

export const getPending = (state: State) => state.pending;
