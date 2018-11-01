import {AuthActionsUnion, AuthActionTypes} from '../../auth/actions/auth.actions';
import {FacilityCreatorActionsUnion, FacilityCreatorActionTypes} from './facility-creator.actions';
import {FacilityCreationForm} from '../../core/models/facility';
import {init} from 'protractor/built/launcher';

export interface State {
  stage: number;
  builder: FacilityCreationForm;
}

const initialState: State = {
  stage: 0,
  builder: {disciplineId: '3x3basket', playingSpots: 1}
};

export function reducer(
  state: State = initialState,
  action: FacilityCreatorActionsUnion | AuthActionsUnion
): State {
  switch (action.type) {

    case AuthActionTypes.Logout:
      return {
        ...initialState
      };

    case FacilityCreatorActionTypes.PositionSelected:
      return {
        ...state,
        builder: {
          ...state.builder,
          position: action.payload
        },
        stage: 1
      };

    case FacilityCreatorActionTypes.BaseDataSubmitted:
      return {
        ...state,
        builder: {
          ...state.builder,
          ...action.payload
        },
        stage: 2
      };

    case FacilityCreatorActionTypes.CreateFacilitySuccess:
      return {
        ...initialState
      };

    case FacilityCreatorActionTypes.GoToPreviousStage:
      return {
        ...state,
        stage: state.stage > 0 ? state.stage - 1 : 0
      };

    default:
      return state;
  }
}

export const getStage = (state: State) => state.stage;
export const getBuilder = (state: State) => state.builder;
