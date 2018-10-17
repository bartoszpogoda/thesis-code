import {PlayerActionsUnion, PlayerActionTypes} from '../actions/player.actions';
import {Player} from '../models/player';
import {ApiError} from '../models/error';

export interface State {
  hasTeam: boolean,
}

const initialState: State = {
  hasTeam: false,
};

export function reducer(
  state: State = initialState,
  action: any
): State {
  switch (action.type) {

    default:
      return state;
  }
}

export const getHasTeam = (state: State) => state.hasTeam;
