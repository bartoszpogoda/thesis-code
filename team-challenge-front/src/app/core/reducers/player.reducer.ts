import {PlayerActionsUnion, PlayerActionTypes} from '../actions/player.actions';
import {Player} from '../models/player';
import {ApiError} from '../models/error';
import {NotificationSet} from '../../auth/models/notificationSet';
import {TeamInvitation} from '../models/team-invitation';
import {AuthActionsUnion, AuthActionTypes} from '../../auth/actions/auth.actions';
import {PlayerCreatorActionsUnion, PlayerCreatorActionTypes} from '../actions/player-creator.actions';

const defaultAvatarUrl = '/assets/images/home/avatar.png';

export interface State {
  player: Player;
  notExisting: boolean;
  error: ApiError | null;
  notifications: NotificationSet;
  invitations: TeamInvitation[];
  avatarUrl;
}

const initialState: State = {
  player: null,
  notExisting: true,
  error: null,
  notifications: new NotificationSet([]),
  invitations: [],
  avatarUrl: defaultAvatarUrl, // TODO serve locally (resource)
};

export function reducer(
  state: State = initialState,
  action: PlayerActionsUnion | AuthActionsUnion | PlayerCreatorActionsUnion
): State {
  switch (action.type) {

    case AuthActionTypes.Logout:
      return {
        ...initialState
      };

    case PlayerActionTypes.LoadCurrent:
      return {
        ...state
      };

    case PlayerActionTypes.LoadCurrentFailure:
      return {
        ...state,
        notExisting: action.payload.code === 'PLAYER_NOT_FOUND',
        error: action.payload,
        notifications: action.payload.code === 'PLAYER_NOT_FOUND' ? state.notifications.add('todoCreatePlayer') : state.notifications
      }; // TODO make sure assigning notifications doesnt reference previous state

    case PlayerActionTypes.LoadCurrentSuccess:
      return {
        ...state,
        notExisting: false,
        error: null,
        player: action.payload,
        avatarUrl: action.payload.hasImage ? '/api/3x3basket/players/' + action.payload.id + '/avatar' : defaultAvatarUrl
      };

    case PlayerCreatorActionTypes.RegisterSuccess:
      return {
        ...state,
        player: action.payload,
        notExisting: false,
        notifications: state.notifications.remove('todoCreatePlayer')
      };

    case PlayerActionTypes.LoadTeamInvitationsSuccess:
      return {
        ...state,
        invitations: action.payload
      };

    case PlayerActionTypes.AcceptTeamInvitationSuccess:
      return {
        ...state,
        invitations: []
      };

    case PlayerActionTypes.DeclineTeamInvitationSuccess:
      return {
        ...state,
        invitations: state.invitations.filter(inv => inv.id !== action.payload)
      };

    case PlayerCreatorActionTypes.UploadAvatarSuccess:
      return {
        ...state,
        avatarUrl: '/api/3x3basket/players/' + state.player.id + '/avatar' + '?' + new Date(),
        player: {
          ...state.player,
          hasImage: true
        }
      };

    default:
      return state;
  }
}

export const getPlayer = (state: State) => state.player;
export const getNotExisting = (state: State) => state.notExisting;
export const getAnyNotifications = (state: State) => state.notifications.any();
export const getTeamInvitations = (state: State) => state.invitations;

export const getAvatarUrl = (state: State) => state.avatarUrl;
