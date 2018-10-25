import {Action} from '@ngrx/store';
import {ApiError} from '../../core/models/error';
import {Team} from '../../core/models/team';
import {Page} from '../../core/models/page';

export enum CommunityTeamsActionTypes {
  EnterPage = '[Community Teams] Enter Page',
  LoadPage = '[Community Teams] Load Page',
  LoadPageSuccess = '[Community Teams] Load Page Success',
  LoadPageFailure = '[Community Teams] Load Page Failure'
}

export class EnterPage implements Action {
  readonly type = CommunityTeamsActionTypes.EnterPage;
}

export class LoadPage implements Action {
  readonly type = CommunityTeamsActionTypes.LoadPage;

  constructor(public payload: number) {}
}

export class LoadPageSuccess implements Action {
  readonly type = CommunityTeamsActionTypes.LoadPageSuccess;

  constructor(public payload: Page<Team>) {}
}

export class LoadPageFailure implements Action {
  readonly type = CommunityTeamsActionTypes.LoadPageFailure;

  constructor(public payload: ApiError) {}
}

export type CommunityTeamsActionsUnion = EnterPage |  LoadPage | LoadPageSuccess | LoadPageFailure;

