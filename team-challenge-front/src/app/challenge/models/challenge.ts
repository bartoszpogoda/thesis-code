import {Facility} from '../../core/models/facility';
import {LocalDateTime} from 'js-joda';
import {Team} from '../../core/models/team';

export interface Challenge {
  id?: string;
  disciplineId: string;
  challengingTeamId: string;
  challengingTeam?: Team;
  challengedTeamId: string;
  challengedTeam?: Team;
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
  Pending = 'Pending',
  Accepted = 'Accepted',
  Rejected = 'Rejected',
  Canceled = 'Canceled',
  Finished = 'Finished'
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
