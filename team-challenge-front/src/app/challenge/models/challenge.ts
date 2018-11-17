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
  winnerTeamId?: string;
  winnerPoints: number;
  loserPoints: number;
  reportingTeamId?: string;
  reportedDate?: string;
  status?: ResultStatus;
}

export enum ChallengeStatus {
  Pending = 0,
  Accepted = 1,
  Rejected = 2,
  Canceled = 3,
  Finished = 4
}

export enum PlaceTimeOfferStatus {
  Pending = 0,
  Accepted = 1,
  Rejected = 2,
  Cancelled = 3
}

export enum ResultStatus {
  Reported = 0,
  Accepted = 1,
  Rejected = 2
}

export const challengeStatusColors = [
  'orange',
  'green',
  'red',
  'purple',
  'blue'
];

export const challengeStatusLabels = [
  'W trakcie negocjacji',
  'Zaakceptowane',
  'Odrzucone',
  'Anulowane',
  'Zakończone'
];
