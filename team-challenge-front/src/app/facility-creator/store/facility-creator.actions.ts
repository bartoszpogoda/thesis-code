import {Action} from '@ngrx/store';

import {Position} from '../../core/models/position';
import {Facility, FacilityCreationForm} from '../../core/models/facility';
import {ApiError} from '../../core/models/error';

export enum FacilityCreatorActionTypes {
  PositionSelected = '[Facility Creator] Postion Selected',
  BaseDataSubmitted = '[Facility Creator] Base Data Submitted',

  GoToPreviousStage = '[Facility Creator] Go To Previous Stage',

  CreateFacility = '[Facility Creator] Create Facility',
  CreateFacilitySuccess = '[Facility Creator] Create Facility Success',
  CreateFacilityFailure = '[Facility Creator] Create Facility Failure',
}

export class PositionSelected implements Action {
  readonly type = FacilityCreatorActionTypes.PositionSelected;

  constructor(public payload: Position) {}
}

export class GoToPreviousStage implements Action {
  readonly  type = FacilityCreatorActionTypes.GoToPreviousStage;
}

export class BaseDataSubmitted implements Action {
  readonly type = FacilityCreatorActionTypes.BaseDataSubmitted;

  constructor(public payload: FacilityCreationForm) {}
}

export class CreateFacility implements Action {
  readonly type = FacilityCreatorActionTypes.CreateFacility;

  constructor(public payload: FacilityCreationForm) {}
}

export class CreateFacilitySuccess implements Action {
  readonly type = FacilityCreatorActionTypes.CreateFacilitySuccess;

  constructor(public payload: Facility) {}
}

export class CreateFacilityFailure implements Action {
  readonly type = FacilityCreatorActionTypes.CreateFacility;

  constructor(public payload: ApiError) {}
}


export type FacilityCreatorActionsUnion = PositionSelected | BaseDataSubmitted
  | CreateFacility | CreateFacilitySuccess | CreateFacilityFailure | GoToPreviousStage;

