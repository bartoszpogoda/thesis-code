import {Action} from '@ngrx/store';

export enum CommunityActionTypes {
  RegionSelectionChanged = '[Community] Region Selection Changed'
}

export class RegionSelectionChanged implements Action {
  readonly type = CommunityActionTypes.RegionSelectionChanged;

  constructor(public payload: string) {}
}

export type CommunityActionsUnion = RegionSelectionChanged;

