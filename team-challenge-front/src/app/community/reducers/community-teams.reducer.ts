import {CommunityTeamsActionsUnion, CommunityTeamsActionTypes} from '../actions/community-teams.actions';
import {Page} from '../../core/models/page';
import {Team} from '../../core/models/team';

export interface State {
  page: Page<Team> | null;
  currentPage: number;
  total: number;
  pageSize: number;
  loading: boolean;
}

const initialState: State = {
  page: null,
  currentPage: 0,
  total: 0,
  pageSize: 0,
  loading: false
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

    default:
      return state;
  }
}

export const getPage = (state: State) => state.page;
export const getCurrentPage = (state: State) => state.currentPage;
export const getPageSize = (state: State) => state.pageSize;
export const getTeams = (state: State) => state.page ? state.page.content : [];
export const getTotal = (state: State) => state.total;

