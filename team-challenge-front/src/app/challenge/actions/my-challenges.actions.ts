import {Action} from '@ngrx/store';
import {Challenge, PlaceTimeOffer, Result} from '../models/challenge';
import {ApiError} from '../../core/models/error';
import {Player} from '../../core/models/player';
import {TeamReview} from '../models/review';

export enum MyChallengesActionTypes {
  LoadActiveChallenges = '[My Challenges] Load Active Challenges',
  LoadActiveChallengesSuccess = '[My Challenges] Load Active Challenges Success',
  LoadActiveChallengesFailure = '[My Challenges] Load Active Challenges Failure',

  LoadPlaceTimeOffersForActiveChallenges = '[My Challenges] Load Place Time Offers For Active Challenges',
  LoadPlaceTimeOffersForActiveChallengesSuccess = '[My Challenges] Load Place Time Offers For Active Challenges Success',
  LoadPlaceTimeOffersForActiveChallengesFailure = '[My Challenges] Load Place Time Offers For Active Challenges Failure',

  LoadChallenge = '[My Challenges] Load Challenge',
  LoadChallengeSuccess = '[My Challenges] Load Challenge Success',
  LoadChallengeFailure = '[My Challenges] Load Challenge Failure',

  LoadPlaceTimeOffers = '[My Challenges] Load Place Time Offers',
  LoadPlaceTimeOffersSuccess = '[My Challenges] Load Place Time Offers Success',
  LoadPlaceTimeOffersFailure = '[My Challenges] Load Place Time Offers Failure',

  LoadTheirHome = '[My Challenges] Load Their Home',
  LoadTheirHomeSuccess = '[My Challenges] Load Their Home Success',
  LoadTheirHomeFailure = '[My Challenges] Load Their Home Failure',

  LoadTheirPlayers = '[My Challenges] Load Their Players',
  LoadTheirPlayersSuccess = '[My Challenges] Load Their Players Success',
  LoadTheirPlayersFailure = '[My Challenges] Load Their Players Failure',

  AddPlaceTimeOffer = '[My Challenges] Add Place Time Offer',
  AddPlaceTimeOfferSuccess = '[My Challenges] Add Place Time Offer Success',
  AddPlaceTimeOfferFailure = '[My Challenges] Add Place Time Offer Failure',

  CancelPlaceTimeOffer = '[My Challenges] Cancel Place Time Offer',
  CancelPlaceTimeOfferSuccess = '[My Challenges] Cancel Place Time Offer Success',
  CancelPlaceTimeOfferFailure = '[My Challenges] Cancel Place Time Offer Failure',

  RejectPlaceTimeOffer = '[My Challenges] Reject Place Time Offer',
  RejectPlaceTimeOfferSuccess = '[My Challenges] Reject Place Time Offer Success',
  RejectPlaceTimeOfferFailure = '[My Challenges] Reject Place Time Offer Failure',

  AcceptPlaceTimeOffer = '[My Challenges] Accept Place Time Offer',
  AcceptPlaceTimeOfferSuccess = '[My Challenges] Accept Place Time Offer Success',
  AcceptPlaceTimeOfferFailure = '[My Challenges] Accept Place Time Offer Failure',

  RejectChallenge = '[My Challenges] Reject Challenge',
  RejectChallengeSuccess = '[My Challenges] Reject Challenge Success',
  RejectChallengeFailure = '[My Challenges] Reject Challenge Failure',

  CancelChallenge = '[My Challenges] Cancel Challenge',
  CancelChallengeSuccess = '[My Challenges] Cancel Challenge Success',
  CancelChallengeFailure = '[My Challenges] Cancel Challenge Failure',

  LoadResult = '[My Challenge] Load Result',
  LoadResultSuccess = '[My Challenge] Load Result Success',
  LoadResultFailure = '[My Challenge] Load Result Failure',

  SaveResult = '[My Challenge] Save Result',
  SaveResultSuccess = '[My Challenge] Save Result Success',
  SaveResultFailure = '[My Challenge] Save Result Failure',

  ConfirmResult = '[My Challenge] Confirm Result',
  ConfirmResultSuccess = '[My Challenge] Confirm Result Success',
  ConfirmResultFailure = '[My Challenge] Confirm Result Failure',

  RejectResult = '[My Challenge] Reject Result',
  RejectResultSuccess = '[My Challenge] Reject Result Success',
  RejectResultFailure = '[My Challenge] Reject Result Failure',

  LoadReview = '[My Challenge] Load Review',
  LoadReviewSuccess = '[My Challenge] Load Review Success',
  LoadReviewFailure = '[My Challenge] Load Review Failure',

  SaveReview = '[My Challenge] Save Review',
  SaveReviewSuccess = '[My Challenge] Save Review Success',
  SaveReviewFailure = '[My Challenge] Save Review Failure',

}

export class LoadActiveChallenges implements Action {
  readonly type = MyChallengesActionTypes.LoadActiveChallenges;
}

export class LoadActiveChallengesSuccess implements Action {
  readonly type = MyChallengesActionTypes.LoadActiveChallengesSuccess;

  constructor(public payload: Challenge[]) {
  }
}

export class LoadActiveChallengesFailure implements Action {
  readonly type = MyChallengesActionTypes.LoadActiveChallengesFailure;

  constructor(public payload: ApiError) {
  }
}

export class LoadPlaceTimeOffersForActiveChallenges implements Action {
  readonly type = MyChallengesActionTypes.LoadPlaceTimeOffersForActiveChallenges;

  constructor(public payload: Challenge[]) {
  }
}

export class LoadPlaceTimeOffersForActiveChallengesSuccess implements Action {
  readonly type = MyChallengesActionTypes.LoadPlaceTimeOffersForActiveChallengesSuccess;

  constructor(public payload: PlaceTimeOffer[][]) {
  }
}

export class LoadPlaceTimeOffersForActiveChallengesFailure implements Action {
  readonly type = MyChallengesActionTypes.LoadPlaceTimeOffersForActiveChallengesFailure;

  constructor(public payload: ApiError) {
  }
}

export class LoadChallenge implements Action {
  readonly type = MyChallengesActionTypes.LoadChallenge;

  constructor(public payload: string) {
  }
}

export class LoadChallengeSuccess implements Action {
  readonly type = MyChallengesActionTypes.LoadChallengeSuccess;

  constructor(public payload: Challenge) {
  }
}

export class LoadChallengeFailure implements Action {
  readonly type = MyChallengesActionTypes.LoadChallengeFailure;

  constructor(public payload: ApiError) {
  }
}


export class LoadPlaceTimeOffers implements Action {
  readonly type = MyChallengesActionTypes.LoadPlaceTimeOffers;

  constructor(public payload: string) {
  }
}

export class LoadPlaceTimeOffersSuccess implements Action {
  readonly type = MyChallengesActionTypes.LoadPlaceTimeOffersSuccess;

  constructor(public payload: PlaceTimeOffer[]) {
  }
}

export class LoadPlaceTimeOffersFailure implements Action {
  readonly type = MyChallengesActionTypes.LoadPlaceTimeOffersFailure;

  constructor(public payload: ApiError) {
  }
}


export class LoadTheirHome implements Action {
  readonly type = MyChallengesActionTypes.LoadTheirHome;

  constructor(public payload: string) {
  }
}

export class LoadTheirHomeSuccess implements Action {
  readonly type = MyChallengesActionTypes.LoadTheirHomeSuccess;

  constructor(public payload: Position) {
  }
}

export class LoadTheirHomeFailure implements Action {
  readonly type = MyChallengesActionTypes.LoadTheirHomeFailure;

  constructor(public payload: ApiError) {
  }
}


export class LoadTheirPlayers implements Action {
  readonly type = MyChallengesActionTypes.LoadTheirPlayers;

  constructor(public payload: string) {
  }
}

export class LoadTheirPlayersSuccess implements Action {
  readonly type = MyChallengesActionTypes.LoadTheirPlayersSuccess;

  constructor(public payload: Player[]) {
  }
}

export class LoadTheirPlayersFailure implements Action {
  readonly type = MyChallengesActionTypes.LoadTheirPlayersFailure;

  constructor(public payload: ApiError) {
  }
}


export class AddPlaceTimeOffer implements Action {
  readonly type = MyChallengesActionTypes.AddPlaceTimeOffer;

  constructor(public payload: PlaceTimeOffer) {}
}

export class AddPlaceTimeOfferSuccess implements Action {
  readonly type = MyChallengesActionTypes.AddPlaceTimeOfferSuccess;

  constructor(public payload: PlaceTimeOffer) {}
}

export class AddPlaceTimeOfferFailure implements Action {
  readonly type = MyChallengesActionTypes.AddPlaceTimeOfferFailure;

  constructor(public payload: ApiError) {
  }
}


export class CancelPlaceTimeOffer implements Action {
  readonly type = MyChallengesActionTypes.CancelPlaceTimeOffer;

  constructor(public payload: string) {}
}

export class CancelPlaceTimeOfferSuccess implements Action {
  readonly type = MyChallengesActionTypes.CancelPlaceTimeOfferSuccess;

  constructor(public payload: PlaceTimeOffer) {}
}

export class CancelPlaceTimeOfferFailure implements Action {
  readonly type = MyChallengesActionTypes.CancelPlaceTimeOfferFailure;

  constructor(public payload: ApiError) {
  }
}


export class RejectPlaceTimeOffer implements Action {
  readonly type = MyChallengesActionTypes.RejectPlaceTimeOffer;

  constructor(public payload: string) {
  }
}

export class RejectPlaceTimeOfferSuccess implements Action {
  readonly type = MyChallengesActionTypes.RejectPlaceTimeOfferSuccess;

  constructor(public payload: PlaceTimeOffer) {
  }
}

export class RejectPlaceTimeOfferFailure implements Action {
  readonly type = MyChallengesActionTypes.RejectPlaceTimeOfferFailure;

  constructor(public payload: ApiError) {
  }
}


export class AcceptPlaceTimeOffer implements Action {
  readonly type = MyChallengesActionTypes.AcceptPlaceTimeOffer;

  constructor(public payload: string) {
  }
}

export class AcceptPlaceTimeOfferSuccess implements Action {
  readonly type = MyChallengesActionTypes.AcceptPlaceTimeOfferSuccess;

  constructor(public payload: PlaceTimeOffer) {
  }
}

export class AcceptPlaceTimeOfferFailure implements Action {
  readonly type = MyChallengesActionTypes.AcceptPlaceTimeOfferFailure;

  constructor(public payload: ApiError) {
  }
}


export class RejectChallenge implements Action {
  readonly type = MyChallengesActionTypes.RejectChallenge;

  constructor(public payload: string) {
  }
}

export class RejectChallengeSuccess implements Action {
  readonly type = MyChallengesActionTypes.RejectChallengeSuccess;

  constructor(public payload: Challenge) {
  }
}

export class RejectChallengeFailure implements Action {
  readonly type = MyChallengesActionTypes.RejectChallengeFailure;

  constructor(public payload: ApiError) {
  }
}

export class CancelChallenge implements Action {
  readonly type = MyChallengesActionTypes.CancelChallenge;

  constructor(public payload: string) {
  }
}

export class CancelChallengeSuccess implements Action {
  readonly type = MyChallengesActionTypes.CancelChallengeSuccess;

  constructor(public payload: Challenge) {
  }
}

export class CancelChallengeFailure implements Action {
  readonly type = MyChallengesActionTypes.CancelChallengeFailure;

  constructor(public payload: ApiError) {
  }
}


export class LoadResult implements Action {
  readonly type = MyChallengesActionTypes.LoadResult;

  constructor(public payload: string) {
  }
}

export class LoadResultSuccess implements Action {
  readonly type = MyChallengesActionTypes.LoadResultSuccess;

  constructor(public payload: Result) {
  }
}

export class LoadResultFailure implements Action {
  readonly type = MyChallengesActionTypes.LoadResultFailure;

  constructor(public payload: ApiError) {
  }
}

export class SaveResult implements Action {
  readonly type = MyChallengesActionTypes.SaveResult;

  constructor(public payload: Result) {
  }
}

export class SaveResultSuccess implements Action {
  readonly type = MyChallengesActionTypes.SaveResultSuccess;

  constructor(public payload: Result) {
  }
}

export class SaveResultFailure implements Action {
  readonly type = MyChallengesActionTypes.SaveResultFailure;

  constructor(public payload: ApiError) {
  }
}

export class ConfirmResult implements Action {
  readonly type = MyChallengesActionTypes.ConfirmResult;

  constructor(public payload: string) {
  }
}

export class ConfirmResultSuccess implements Action {
  readonly type = MyChallengesActionTypes.ConfirmResultSuccess;

  constructor(public payload: Result) {
  }
}

export class ConfirmResultFailure implements Action {
  readonly type = MyChallengesActionTypes.ConfirmResultFailure;

  constructor(public payload: ApiError) {
  }
}


export class RejectResult implements Action {
  readonly type = MyChallengesActionTypes.RejectResult;

  constructor(public payload: string) {
  }
}

export class RejectResultSuccess implements Action {
  readonly type = MyChallengesActionTypes.RejectResultSuccess;

  constructor(public payload: Result) {
  }
}

export class RejectResultFailure implements Action {
  readonly type = MyChallengesActionTypes.RejectResultFailure;

  constructor(public payload: ApiError) {
  }
}


export class SaveReview implements Action {
  readonly type = MyChallengesActionTypes.SaveReview;

  constructor(public payload: {challengeId: string, review: TeamReview}) {
  }
}

export class SaveReviewSuccess implements Action {
  readonly type = MyChallengesActionTypes.SaveReviewSuccess;

  constructor(public payload: TeamReview) {
  }
}

export class SaveReviewFailure implements Action {
  readonly type = MyChallengesActionTypes.SaveReviewFailure;

  constructor(public payload: ApiError) {
  }
}

export class LoadReview implements Action {
  readonly type = MyChallengesActionTypes.LoadReview;

  constructor(public payload: string) {
  }
}

export class LoadReviewSuccess implements Action {
  readonly type = MyChallengesActionTypes.LoadReviewSuccess;

  constructor(public payload: TeamReview) {
  }
}

export class LoadReviewFailure implements Action {
  readonly type = MyChallengesActionTypes.LoadReviewFailure;

  constructor(public payload: ApiError) {
  }
}

export type MyChallengesActionsUnion = LoadActiveChallenges | LoadActiveChallengesSuccess | LoadActiveChallengesFailure
  | LoadPlaceTimeOffersForActiveChallenges | LoadPlaceTimeOffersForActiveChallengesSuccess
  | LoadPlaceTimeOffersForActiveChallengesFailure
  | LoadChallenge | LoadChallengeSuccess | LoadChallengeFailure
  | LoadPlaceTimeOffers | LoadPlaceTimeOffersSuccess | LoadPlaceTimeOffersFailure
  | LoadTheirHome | LoadTheirHomeSuccess | LoadTheirHomeFailure
  | AddPlaceTimeOffer | AddPlaceTimeOfferSuccess | AddPlaceTimeOfferFailure
  | CancelPlaceTimeOffer | CancelPlaceTimeOfferSuccess | CancelPlaceTimeOfferFailure
  | RejectPlaceTimeOffer | RejectPlaceTimeOfferSuccess | RejectPlaceTimeOfferFailure
  | AcceptPlaceTimeOffer | AcceptPlaceTimeOfferSuccess | AcceptPlaceTimeOfferFailure
  | LoadTheirPlayers | LoadTheirPlayersSuccess | LoadTheirPlayersFailure
  | RejectChallenge | RejectChallengeSuccess | RejectChallengeFailure
  | CancelChallenge | CancelChallengeSuccess | CancelChallengeFailure
  | LoadResult | LoadResultSuccess | LoadResultFailure
  | SaveResult | SaveResultSuccess | SaveResultFailure
  | ConfirmResult | ConfirmResultSuccess | ConfirmResultFailure
  | RejectResult | RejectResultSuccess | RejectResultFailure
  | LoadReview | LoadReviewSuccess | LoadReviewFailure
  | SaveReview | SaveReviewSuccess | SaveResultFailure;

