import {LayoutActionsUnion, LayoutActionTypes,} from '../actions/layout.actions';
import {AuthActionsUnion, AuthActionTypes} from '../../auth/actions/auth.actions';

export interface State {
  showNotificationsPanel: boolean;
}

const initialState: State = {
  showNotificationsPanel: false,
};

export function reducer(
  state: State = initialState,
  action: LayoutActionsUnion | AuthActionsUnion
): State {
  switch (action.type) {
    case LayoutActionTypes.CloseNotifications:
      return {
        showNotificationsPanel: false,
      };

    case LayoutActionTypes.OpenNotifications:
      return {
        showNotificationsPanel: true,
      };

    case LayoutActionTypes.ToggleNotifications:
      return {
        showNotificationsPanel: !state.showNotificationsPanel
      };

    case AuthActionTypes.Logout:
      return {
        showNotificationsPanel: false,
      };

    default:
      return state;
  }
}

export const getShowNotificationsPanel = (state: State) => state.showNotificationsPanel;
