import {CommunityTeamsActionsUnion, CommunityTeamsActionTypes} from '../actions/community-teams.actions';
import {Page} from '../../core/models/page';
import {Team} from '../../core/models/team';
import {ApiError} from 'src/app/core/models/error';
import {Player} from '../../core/models/player';

export interface State {
  page: Page<Team> | null;
  currentPage: number;
  total: number;
  pageSize: number;
  loading: boolean;
  currentTeam: Team;
  currentTeamPlayers: Player[];
  error: ApiError;
}

const initialState: State = {
  page: null,
  currentPage: 0,
  total: 0,
  pageSize: 0,
  loading: false,
  currentTeam: null,
  currentTeamPlayers: [],
  error: null
};

export function reducer(
  state: State = initialState,
  action: CommunityTeamsActionsUnion
): State {
  switch (action.type) {

    case CommunityTeamsActionTypes.LoadPage:
      return {
        ...state,
        currentPage: action.payload
      };

    case CommunityTeamsActionTypes.LoadPageSuccess:
      return {
        ...state,
        page: action.payload,
        currentPage: action.payload.number,
        total: action.payload.totalElements,
        pageSize: action.payload.size
      };

    case CommunityTeamsActionTypes.LoadTeamSuccess:
      return {
        ...state,
        currentTeam: action.payload
      };

    case CommunityTeamsActionTypes.LoadTeam:
      return {
        ...state,
        currentTeam: null
      };

    case CommunityTeamsActionTypes.LoadTeamFailure:
      return {
        ...state,
        error: action.payload
      };

    case CommunityTeamsActionTypes.LoadTeamPlayers:
      return {
        ...state,
        currentTeamPlayers: []
      };

    case CommunityTeamsActionTypes.LoadTeamPlayersSuccess:
      return {
        ...state,
        currentTeamPlayers: action.payload
      };

    default:
      return state;
  }
}

export const getPage = (state: State) => state.page;
export const getCurrentPage = (state: State) => state.currentPage;
export const getPageSize = (state: State) => state.pageSize;
export const getTeams = (state: State) => state.page ? state.page.content : [];
export const getTotal = (state: State) => state.total;

export const getCurrentTeam = (state: State) => state.currentTeam;
export const getCurrentTeamPlayers = (state: State) => state.currentTeamPlayers;

