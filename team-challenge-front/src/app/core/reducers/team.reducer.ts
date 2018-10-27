import {TeamActionsUnion, TeamActionTypes} from '../actions/team.actions';
import {Team} from '../models/team';
import {AuthActionsUnion, AuthActionTypes} from '../../auth/actions/auth.actions';

export interface State {
  hasTeam: boolean;
  current: Team | null;
  isManager: boolean;
}

const initialState: State = {
  hasTeam: false,
  current: null,
  isManager: false
};

export function reducer(
  state: State = initialState,
  action: TeamActionsUnion | AuthActionsUnion
): State {
  switch (action.type) {

    case AuthActionTypes.Logout:
      return {
        ...initialState
      };

    case TeamActionTypes.LoadCurrentSuccess:
      return {
        ...state,
        current: action.payload,
        hasTeam: true
      };

    case TeamActionTypes.LoadCurrentFailure:
      return {
        ...state,
        current: null,
        hasTeam: false
      };

    case TeamActionTypes.UpdateIsManager:
      return {
        ...state,
        isManager: action.payload
      };

    default:
      return state;
  }
}

export const getHasTeam = (state: State) => state.hasTeam;
export const getCurrent = (state: State) => state.current;
export const getIsManager = (state: State) => state.isManager;
