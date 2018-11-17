import {Action} from '@ngrx/store';
import {Challenge, PlaceTimeOffer} from '../models/challenge';
import {ApiError} from '../../core/models/error';
import {Page} from '../../core/models/page';
import {MyChallengesActionTypes} from './my-challenges.actions';

export enum PastChallengesActionTypes {
  EnterPage = '[Past Challenges] Enter Page',
  LoadPage = '[Past Challenges] Load Page',
  LoadPageSuccess = '[Past Challenges] Load Page Success',
  LoadPageFailure = '[Past Challenges] Load Page Failure',
  LoadPlaceTimeOffersForPastChallengesSuccess = '[Past Challenges] Load Place Time Offers Success',
  LoadPlaceTimeOffersForPastChallengesFailure = '[Past Challenges] Load Place Time Offers Failure',
}

export class EnterPage implements Action {
  readonly type = PastChallengesActionTypes.EnterPage;
}

export class LoadPage implements Action {
  readonly type = PastChallengesActionTypes.LoadPage;

  constructor(public payload: number) {}
}

export class LoadPageSuccess implements Action {
  readonly type = PastChallengesActionTypes.LoadPageSuccess;

  constructor(public payload: Page<Challenge>) {}
}

export class LoadPageFailure implements Action {
  readonly type = PastChallengesActionTypes.LoadPageFailure;

  constructor(public payload: ApiError) {}
}

export class LoadPlaceTimeOffersForPastChallengesSuccess implements Action {
  readonly type = PastChallengesActionTypes.LoadPlaceTimeOffersForPastChallengesSuccess;

  constructor(public payload: PlaceTimeOffer[][]) {
  }
}

export class LoadPlaceTimeOffersForPastChallengesFailure implements Action {
  readonly type = PastChallengesActionTypes.LoadPlaceTimeOffersForPastChallengesFailure;

  constructor(public payload: ApiError) {
  }
}

export type PastChallengesActionsUnion = EnterPage | LoadPage | LoadPageSuccess | LoadPageFailure |
  LoadPlaceTimeOffersForPastChallengesSuccess | LoadPlaceTimeOffersForPastChallengesFailure;

