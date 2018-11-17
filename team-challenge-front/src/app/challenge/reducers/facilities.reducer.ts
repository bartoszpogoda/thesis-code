import {AuthActionsUnion} from '../../auth/actions/auth.actions';
import {Facility} from '../../core/models/facility';
import {FacilitiesActionsUnion, FacilitiesActionTypes} from '../actions/facilities.actions';


export interface State {
  facilities: Facility[];
}

const initialState: State = {
  facilities: [],
};

export function reducer(
  state: State = initialState,
  action: AuthActionsUnion | FacilitiesActionsUnion
): State {
  switch (action.type) {

    case FacilitiesActionTypes.LoadFacilitiesSuccess:
      return {
        ...state,
        facilities: action.payload
      };


    default:
      return state;
  }
}

export const getFacilities = (state: State) => state.facilities;
