import {PlayerActionsUnion, PlayerActionTypes} from '../actions/player.actions';
import {Player} from '../models/player';
import {ApiError} from '../models/error';
import {NotificationSet} from '../../auth/models/notificationSet';
import {TeamInvitation} from '../models/team-invitation';

export interface State {
  player: Player;
  notExisting: boolean;
  justRegistered: boolean;
  error: ApiError | null;
  notifications: NotificationSet;
  invitations: TeamInvitation[];
}

const initialState: State = {
  player: null,
  justRegistered: false,
  notExisting: true,
  error: null,
  notifications: new NotificationSet([]),
  invitations: []
};

export function reducer(
  state: State = initialState,
  action: PlayerActionsUnion
): State {
  switch (action.type) {

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
        player: action.payload
      };

    case PlayerActionTypes.RegisterSuccess:
      return {
        ...state,
        player: action.payload,
        notExisting: false,
        notifications: state.notifications.remove('todoCreatePlayer')
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

    default:
      return state;
  }
}

export const getPlayer = (state: State) => state.player;
export const getNotExisting = (state: State) => state.notExisting;
export const getAnyNotifications = (state: State) => state.notifications.any();
export const getJustRegistered = (state: State) => state.justRegistered;
export const getTeamInvitations = (state: State) => state.invitations;
