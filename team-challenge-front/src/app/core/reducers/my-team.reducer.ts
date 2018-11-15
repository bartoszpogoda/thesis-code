import {MyTeamActionsUnion, MyTeamActionTypes} from '../actions/my-team.actions';
import {Team} from '../models/team';
import {AuthActionsUnion, AuthActionTypes} from '../../auth/actions/auth.actions';
import {Position} from '../models/position';
import {ManagerActionsUnion, ManagerActionTypes} from '../actions/manager.actions';
import {TeamCreatorActionsUnion, TeamCreatorActionTypes} from '../../team-creator/store/team-creator.actions';
import {Player} from '../models/player';

export interface State {
  hasTeam: boolean;
  current: Team | null;
  isManager: boolean;
  home: Position;
  players: Player[];
}

const initialState: State = {
  hasTeam: false,
  current: null,
  isManager: false,
  home: null,
  players: []
};

export function reducer(
  state: State = initialState,
  action: MyTeamActionsUnion | AuthActionsUnion | ManagerActionsUnion | TeamCreatorActionsUnion
): State {
  switch (action.type) {

    case AuthActionTypes.Logout:
      return {
        ...initialState
      };

    case MyTeamActionTypes.LoadCurrentSuccess:
      return {
        ...state,
        current: action.payload,
        hasTeam: true
      };

    case MyTeamActionTypes.LoadCurrentFailure:
      return {
        ...state,
        current: null,
        hasTeam: false
      };

    case MyTeamActionTypes.LoadHomeSuccess:
      return {
        ...state,
        home: action.payload
      };

    case MyTeamActionTypes.UpdateIsManager:
      return {
        ...state,
        isManager: action.payload
      };

    case ManagerActionTypes.SetHomeSuccess:
      return {
        ...state,
        home: action.payload
      };

    case TeamCreatorActionTypes.SetHomeSuccess:
      return {
        ...state,
        home: action.payload
      };

    case MyTeamActionTypes.LoadPlayersSuccess:
      return {
        ...state,
        players: action.payload
      };

    default:
      return state;
  }
}

export const getHasTeam = (state: State) => state.hasTeam;
export const getCurrent = (state: State) => state.current;
export const getIsManager = (state: State) => state.isManager;
export const getHome = (state: State) => state.home;
export const getPlayers = (state: State) => state.players;
