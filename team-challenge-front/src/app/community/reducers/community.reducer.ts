import {CommunityActionsUnion, CommunityActionTypes} from '../actions/community.actions';

export interface State {
  selectedRegionId: string;
}

const initialState: State = {
  selectedRegionId: null,
};

export function reducer(
  state: State = initialState,
  action: CommunityActionsUnion
): State {
  switch (action.type) {

    case CommunityActionTypes.RegionSelectionChanged:
      return {
        ...state,
        selectedRegionId: action.payload
      };

    default:
      return state;
  }
}

export const getSelectedRegionId = (state: State) => state.selectedRegionId;
