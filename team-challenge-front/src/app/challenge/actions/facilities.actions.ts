import {Action} from '@ngrx/store';
import {ApiError} from '../../core/models/error';
import {Facility} from '../../core/models/facility';

export enum FacilitiesActionTypes {
  LoadFacilities = '[My Challenges] Load Facilities',
  LoadFacilitiesSuccess = '[My Challenges] Load Facilities Success',
  LoadFacilitiesFailure = '[My Challenges] Load Facilities Failure',
}

export class LoadFacilities implements Action {
  readonly type = FacilitiesActionTypes.LoadFacilities;

  constructor(public payload: string) {} // regionId
}

export class LoadFacilitiesSuccess implements Action {
  readonly type = FacilitiesActionTypes.LoadFacilitiesSuccess;

  constructor(public payload: Facility[]) {}
}

export class LoadFacilitiesFailure implements Action {
  readonly type = FacilitiesActionTypes.LoadFacilitiesFailure;

  constructor(public payload: ApiError) {}
}

export type FacilitiesActionsUnion = LoadFacilities | LoadFacilitiesSuccess | LoadFacilitiesFailure;

