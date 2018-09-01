import {LayoutActionsUnion, LayoutActionTypes,} from '../actions/layout.actions';

export interface State {
  showNotificationsPanel: boolean;
}

const initialState: State = {
  showNotificationsPanel: false,
};

export function reducer(
  state: State = initialState,
  action: LayoutActionsUnion
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

    default:
      return state;
  }
}

export const getShowNotificationsPanel = (state: State) => state.showNotificationsPanel;
