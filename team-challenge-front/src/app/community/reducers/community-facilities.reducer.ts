import {Facility} from '../../core/models/facility';
import {CommunityFacilitiesActionsUnion, CommunityFacilitiesActionTypes} from '../actions/community-facilities.actions';

export interface State {
  facilities: Facility[];
  current: Facility;
}

const initialState: State = {
  facilities: [],
  current: null
};

export function reducer(
  state: State = initialState,
  action: CommunityFacilitiesActionsUnion
): State {
  switch (action.type) {

    case CommunityFacilitiesActionTypes.LoadFacilitiesSuccess:
      return {
        ...state,
        facilities: action.payload
      };

    case CommunityFacilitiesActionTypes.LoadFacilities:
      return {
        ...state,
        facilities: []
      };

    case CommunityFacilitiesActionTypes.LoadFacilitySuccess:
      return {
        ...state,
        current: action.payload
      };

    case CommunityFacilitiesActionTypes.LoadFacility:
      return {
        ...state,
        current: null
      };

    default:
      return state;
  }
}

export const getFacilities = (state: State) => state.facilities;
export const getCurrent = (state: State) => state.current;
