import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Challenge, ChallengeStatus, PlaceTimeOffer} from '../models/challenge';
import {Team} from '../../core/models/team';

@Injectable()
export class ChallengeService {

  constructor(private http: HttpClient) {}

  createChallenge(myTeam: Team, theirTeam: Team): Observable<Challenge> {
    const newChallenge: Challenge = {
      disciplineId: '3x3basket',
      challengingTeamId: myTeam.id,
      challengedTeamId: theirTeam.id,
    };

    return this.http.post<Challenge>('/api/challenges', newChallenge);
  }

  addTimeOffer(challengeId: string, offer: PlaceTimeOffer): Observable<PlaceTimeOffer> {
    return this.http.post<PlaceTimeOffer>('/api/challenges/' + challengeId + '/placetimeoffers' , offer);
  }


}
