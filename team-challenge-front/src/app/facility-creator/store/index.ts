import * as fromFacilityCreator from './facility-creator.reducer';
import * as fromRoot from './../../core/reducers/index';

export interface FacilityCreatorState {
  facilityCreator: fromFacilityCreator.State;
}

export interface State extends fromRoot.State {
  facilityCreator: FacilityCreatorState;
}

