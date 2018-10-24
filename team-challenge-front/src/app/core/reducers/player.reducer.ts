import {PlayerActionsUnion, PlayerActionTypes} from '../actions/player.actions';
import {Player} from '../models/player';
import {ApiError} from '../models/error';
import {NotificationSet} from '../../auth/models/notificationSet';
import {TeamInvitation} from '../models/team-invitation';
import {AuthActionsUnion, AuthActionTypes} from '../../auth/actions/auth.actions';

const defaultAvatarUrl = '/assets/images/home/avatar.png';

export interface State {
  player: Player;
  notExisting: boolean;
  justRegistered: boolean;
  error: ApiError | null;
  notifications: NotificationSet;
  invitations: TeamInvitation[];
  avatarUrl;
  creator: {
    step: number;
    avatarUploading: boolean;
    avatarUploaded: boolean;
    buttonText: string;
  };
}

const initialState: State = {
  player: null,
  justRegistered: false,
  notExisting: true,
  error: null,
  notifications: new NotificationSet([]),
  invitations: [],
  avatarUrl: defaultAvatarUrl, // TODO serve locally (resource)
  creator: {
    step: 0,
    avatarUploading: false,
    avatarUploaded: false,
    buttonText: 'Pomiń krok'
  }
};

export function reducer(
  state: State = initialState,
  action: PlayerActionsUnion | AuthActionsUnion
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
        avatarUrl: action.payload.imageId ? 'api/images/users/' + action.payload.imageId + '?' + new Date() : defaultAvatarUrl
      };

    case PlayerActionTypes.RegisterSuccess:
      return {
        ...state,
        player: action.payload,
        notExisting: false,
        notifications: state.notifications.remove('todoCreatePlayer'),
        creator: {
          ...state.creator,
          step: 1
        }
      };

    case PlayerActionTypes.ShowJustRegistered:
      return {
        ...state,
        justRegistered: true
      };

    case PlayerActionTypes.HideJustRegistered:
      return {
        ...state,
        justRegistered: false
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

    case PlayerActionTypes.UploadAvatar:
      return {
        ...state,
        creator: {
          ...state.creator,
          avatarUploading: true
        }
      };

    case PlayerActionTypes.UploadAvatarSuccess:
      return {
        ...state,
        avatarUrl: 'api/images/users/' + action.payload + '?' + new Date(),
        player: {
          ...state.player,
          imageId: action.payload
        },
        creator: {
          ...state.creator,
          avatarUploading: false,
          avatarUploaded: true,
          buttonText: 'Pokaż profil'
        }
      };

    default:
      return state;
  }
}

export const getPlayer = (state: State) => state.player;
export const getNotExisting = (state: State) => state.notExisting;
export const getAnyNotifications = (state: State) => state.notifications.any();
export const getJustRegistered = (state: State) => state.justRegistered;
export const getTeamInvitations = (state: State) => state.invitations;
export const getCreatorStep = (state: State) => state.creator.step;

export const getAvatarUrl = (state: State) => state.avatarUrl;
export const getCreatorAvatarUploading = (state: State) => state.creator.avatarUploading;
export const getCreatorAvatarUploaded = (state: State) => state.creator.avatarUploaded;
export const getCreatorButtonText = (state: State) => state.creator.buttonText;
