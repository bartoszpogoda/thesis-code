import {Facility} from '../../core/models/facility';

export interface Challenge {
  id?: string;
  disciplineId: string;
  challengingTeamId: string;
  challengedTeamId: string;
  status?: ChallengeStatus;
}

export interface PlaceTimeOffer {
  id?: string;
  offeringTeamId: string;
  offeredDate: string;
  offeredFacilityId: string;
  offeredFacility?: Facility;
  status?: PlaceTimeOfferStatus;
}

export interface Result {
  id?: string;
  winnerTeamId: string;
  winnerPoints: number;
  loserPoints: number;
  reportingTeamId: string;
  reportedDate?: string;
  status?: ResultStatus;
}

export enum ChallengeStatus {
  Pending,
  Accepted,
  Rejected,
  Canceled,
  Finished
}

export enum PlaceTimeOfferStatus {
  Pending,
  Accepted,
  Rejected,
  Cancelled
}

export enum ResultStatus {
  Reported,
  Accepted,
  Rejected
}
