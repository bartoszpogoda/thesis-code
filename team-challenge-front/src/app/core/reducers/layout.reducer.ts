import {LayoutActionsUnion, LayoutActionTypes, } from '../actions/layout.actions';
import {AuthActionsUnion, AuthActionTypes} from '../../auth/actions/auth.actions';
import {PlayerActionsUnion, PlayerActionTypes} from '../actions/player.actions';

export interface State {
  showNotificationsPanel: boolean;
}

const initialState: State = {
  showNotificationsPanel: false
};

export function reducer(
  state: State = initialState,
  action: LayoutActionsUnion | AuthActionsUnion
): State {
  switch (action.type) {
    case LayoutActionTypes.CloseNotifications:
      return {
        ...state,
        showNotificationsPanel: false,
      };

    case LayoutActionTypes.OpenNotifications:
      return {
        ...state,
        showNotificationsPanel: true,
      };

    case LayoutActionTypes.ToggleNotifications:
      return {
        ...state,
        showNotificationsPanel: !state.showNotificationsPanel
      };

    case AuthActionTypes.Logout:
      return {
        ...state,
        showNotificationsPanel: false,
      };

    default:
      return state;
  }
}

export const getShowNotificationsPanel = (state: State) => state.showNotificationsPanel;
