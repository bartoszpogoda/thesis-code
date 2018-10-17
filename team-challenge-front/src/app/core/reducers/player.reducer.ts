import {PlayerActionsUnion, PlayerActionTypes} from '../actions/player.actions';
import {Player} from '../models/player';
import {ApiError} from '../models/error';
import {NotificationSet} from '../../auth/models/notificationSet';

export interface State {
  player: Player;
  loading: boolean;
  notExisting: boolean;
  error: ApiError | null;
  notifications: NotificationSet;
}

const initialState: State = {
  player: null,
  loading: false,
  notExisting: true,
  error: null,
  notifications: new NotificationSet([])
};

export function reducer(
  state: State = initialState,
  action: PlayerActionsUnion
): State {
  switch (action.type) {

    case PlayerActionTypes.LoadPlayerProfile:
      return {
        ...state,
        loading: true
      };

    case PlayerActionTypes.LoadPlayerProfileFailure:
      return {
        ...state,
        loading: false,
        notExisting: action.payload.code === 'PLAYER_NOT_FOUND',
        error: action.payload,
        notifications: state.notifications.add('todoCreatePlayer')
      };

    case PlayerActionTypes.LoadPlayerProfileSuccess:
      return {
        ...state,
        loading: false,
        notExisting: false,
        error: null
      };

    default:
      return state;
  }
}

export const getPlayer = (state: State) => state.player;
export const getLoading = (state: State) => state.loading;
export const getNotExisting = (state: State) => state.notExisting;
export const getAnyNotifications = (state: State) => state.notifications.any();
