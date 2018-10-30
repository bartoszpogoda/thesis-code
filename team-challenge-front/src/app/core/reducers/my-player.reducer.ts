import {PlayerActionsUnion, PlayerActionTypes} from '../actions/player.actions';
import {Player} from '../models/player';
import {TeamInvitation} from '../models/team-invitation';
import {AuthActionsUnion, AuthActionTypes} from '../../auth/actions/auth.actions';
import {PlayerCreatorActionsUnion, PlayerCreatorActionTypes} from '../../player-creator/store/player-creator.actions';

const defaultAvatarUrl = '/assets/images/home/avatar.png';

export interface State {
  player: Player;
  notExisting: boolean;
  invitations: TeamInvitation[];
  avatarUrl;
}

const initialState: State = {
  player: null,
  notExisting: true,
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
      };

    case PlayerActionTypes.LoadCurrentSuccess:
      return {
        ...state,
        notExisting: false,
        player: action.payload,
        avatarUrl: action.payload.hasImage ? '/api/players/' + action.payload.id + '/image' : defaultAvatarUrl
      };

    case PlayerCreatorActionTypes.RegisterSuccess:
      return {
        ...state,
        player: action.payload,
        notExisting: false,
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
        avatarUrl: '/api/players/' + state.player.id + '/image' + '?' + new Date(),
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
export const getTeamInvitations = (state: State) => state.invitations;

export const getAvatarUrl = (state: State) => state.avatarUrl;
