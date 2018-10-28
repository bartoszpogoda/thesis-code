import {PlayerActionsUnion, PlayerActionTypes} from '../actions/player.actions';
import {Player} from '../models/player';
import {ApiError} from '../models/error';
import {NotificationSet} from '../../auth/models/notificationSet';
import {TeamInvitation} from '../models/team-invitation';
import {AuthActionsUnion, AuthActionTypes} from '../../auth/actions/auth.actions';
import {PlayerCreatorActionsUnion, PlayerCreatorActionTypes} from '../../player-creator/store/player-creator.actions';

const defaultAvatarUrl = '/assets/images/home/avatar.png';

export interface State {
  myPlayerNotifications: NotificationSet;
  myTeamNotifications: NotificationSet;
  challengesNotifications: NotificationSet;
}

const initialState: State = {
  myPlayerNotifications: new NotificationSet([]),
  myTeamNotifications: new NotificationSet([]),
  challengesNotifications: new NotificationSet([])
};

// TODO make sure assigning notifications doesnt reference previous state
export function reducer(
  state: State = initialState,
  action: PlayerActionsUnion | AuthActionsUnion | PlayerCreatorActionsUnion
): State {
  switch (action.type) {

    case AuthActionTypes.Logout:
      return {
        ...initialState
      };

    case PlayerActionTypes.LoadCurrentFailure:
      return {
        ...state,
        myPlayerNotifications: action.payload.code === 'PLAYER_NOT_FOUND' ?
          state.myPlayerNotifications.add('todoCreatePlayer') : state.myPlayerNotifications
      };

    case PlayerCreatorActionTypes.RegisterSuccess:
      return {
        ...state,
        myPlayerNotifications: state.myPlayerNotifications.remove('todoCreatePlayer')
      };

    default:
      return state;
  }
}

export const getMyPlayerNotifications = (state: State) => state.myPlayerNotifications;
