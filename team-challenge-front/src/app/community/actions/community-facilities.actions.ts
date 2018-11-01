import {Action} from '@ngrx/store';
import {ApiError} from '../../core/models/error';
import {Team} from '../../core/models/team';
import {Page} from '../../core/models/page';
import {Player} from '../../core/models/player';
import {Facility} from '../../core/models/facility';

export enum CommunityFacilitiesActionTypes {
  LoadFacilities = '[Community Facilities] Load Facilities',
  LoadFacilitiesSuccess = '[Community Facilities] Load Facilities Success',
  LoadFacilitiesFailure = '[Community Facilities] Load Facilities Failure',

  LoadFacility = '[Community Facilities] Load Facility',
  LoadFacilitySuccess = '[Community Facilities] Load Facility Success',
  LoadFacilityFailure = '[Community Facilities] Load Facility Failure',
}

export class LoadFacilities implements Action {
  readonly type = CommunityFacilitiesActionTypes.LoadFacilities;
}

export class LoadFacilitiesSuccess implements Action {
  readonly type = CommunityFacilitiesActionTypes.LoadFacilitiesSuccess;

  constructor(public payload: Facility[]) {}
}

export class LoadFacilitiesFailure implements Action {
  readonly type = CommunityFacilitiesActionTypes.LoadFacilitiesFailure;

  constructor(public payload: ApiError) {}
}

export class LoadFacility implements Action {
  readonly type = CommunityFacilitiesActionTypes.LoadFacility;

  constructor(public payload: string) {}
}

export class LoadFacilitySuccess implements Action {
  readonly type = CommunityFacilitiesActionTypes.LoadFacilitySuccess;

  constructor(public payload: Facility) {}
}

export class LoadFacilityFailure implements Action {
  readonly type = CommunityFacilitiesActionTypes.LoadFacilityFailure;

  constructor(public payload: ApiError) {}
}

export type CommunityFacilitiesActionsUnion = LoadFacilities | LoadFacilitiesSuccess | LoadFacilitiesFailure
  | LoadFacility | LoadFacilitySuccess | LoadFacilityFailure;

