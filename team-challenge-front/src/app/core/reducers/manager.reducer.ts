import {TeamActionsUnion, TeamActionTypes} from '../actions/team.actions';
import {Team} from '../models/team';
import {TeamInvitation} from '../models/team-invitation';
import {InvitablePlayer, Player} from '../models/player';
import {Page} from '../models/page';
import {ManagerActionsUnion, ManagerActionTypes} from '../actions/manager.actions';

export interface State {
  invitations: TeamInvitation[];
  invitePlayer: {
    page: Page<Player> | null,
    data: InvitablePlayer[],
    currentPage: number,
    total: number,
    nameSearch: string,
    loading: boolean
  } | null;
}

const initialState: State = {
  invitations: [],
  invitePlayer: {
    page: null,
    data: [],
    currentPage: 0,
    total: 0,
    nameSearch: '',
    loading: false
  }
};

export function reducer(
  state: State = initialState,
  action: ManagerActionsUnion
): State {
  switch (action.type) {

    case ManagerActionTypes.LoadTeamInvitationsSuccess:
      return {
        ...state,
        invitations: action.payload
      };

    case ManagerActionTypes.InvitePlayerLoadPage:
      return {
        ...state,
        invitePlayer: {
          ...state.invitePlayer,
          loading: true
        }
      };

    case ManagerActionTypes.InvitePlayerPageChanged:
      return {
        ...state,
        invitePlayer: {
          ...state.invitePlayer,
          currentPage: action.payload,
          loading: true
        }
      };

    case ManagerActionTypes.InvitePlayerLoadPageSuccess:
      return {
        ...state,
        invitePlayer: {
          ...state.invitePlayer,
          page: action.payload
        }
      };

    case ManagerActionTypes.InvitePlayerDecodePageSuccess:
      return {
        ...state,
        invitePlayer: {
          ...state.invitePlayer,
          data: action.payload,
          loading: false
        }
      };

    case ManagerActionTypes.InvitePlayerNameSearchChanged:
      return {
        ...state,
        invitePlayer: {
          ...state.invitePlayer,
          nameSearch: action.payload
        }
      };

    default:
      return state;
  }
}

export const getInvitePlayerData = (state: State) => state.invitePlayer.data;
export const getInvitePlayerPage = (state: State) => state.invitePlayer.page;
export const getInvitePlayerTotal = (state: State) => state.invitePlayer.page.totalElements;
export const getInvitePlayerLoading = (state: State) => state.invitePlayer.loading;
export const getInvitePlayerNameSearch = (state: State) => state.invitePlayer.nameSearch;
export const getInvitations = (state: State) => state.invitations;
