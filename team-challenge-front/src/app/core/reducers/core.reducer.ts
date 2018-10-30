import {Region} from '../models/region';
import {CoreActionTypes, CoreActionUnion} from '../actions/core.actions';

export interface State {
  regions: Region[];
}

const initialState: State = {
  regions: []
};

export function reducer(
  state: State = initialState,
  action: CoreActionUnion
): State {
  switch (action.type) {

    case CoreActionTypes.LoadRegionsSuccess:
      return {
        ...state,
        regions: action.payload
      };

    default:
      return state;
  }
}

export const getRegions = (state: State) => state.regions;
