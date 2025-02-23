import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Challenge, ChallengeStatus, PlaceTimeOffer, Result} from '../models/challenge';
import {Team} from '../../core/models/team';
import {Page} from '../../core/models/page';
import {Player} from '../../core/models/player';
import {map} from 'rxjs/operators';
import {TeamReview} from '../models/review';

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

  getActiveChallenges(teamId: string): Observable<Challenge[]> {
    const params = new HttpParams().set('teamId', teamId)
        .set('active', 'true')
        .set('page', '' + 0)
        .set('size', '' + 50);
    return this.http.get<Page<Challenge>>('/api/challenges', {params: params}).pipe(
      map(page => page.content)
    );
  }

  getPlaceTimeOffers(id: string): Observable<PlaceTimeOffer[]> {
    return this.http.get<PlaceTimeOffer[]>('/api/challenges/' + id + '/placetimeoffers');
  }

  getChallenge(challengeId: string): Observable<Challenge> {
    return this.http.get<Challenge>('/api/challenges/' + challengeId);
  }

  cancelPlaceTimeOffer(challengeId: string, id: string): Observable<PlaceTimeOffer> {
    return this.http.post<PlaceTimeOffer>('/api/challenges/' + challengeId + '/placetimeoffers/' + id + '/cancelation', {});
  }

  rejectPlaceTimeOffer(challengeId: string, id: string): Observable<PlaceTimeOffer> {
    return this.http.post<PlaceTimeOffer>('/api/challenges/' + challengeId + '/placetimeoffers/' + id + '/rejection', {});
  }

  acceptPlaceTimeOffer(challengeId: string, id: string): Observable<PlaceTimeOffer> {
    return this.http.post<PlaceTimeOffer>('/api/challenges/' + challengeId + '/placetimeoffers/' + id + '/acceptance', {});
  }

  rejectChallenge(challengeId: string): Observable<Challenge> {
    return this.http.post<Challenge>('/api/challenges/' + challengeId + '/rejection', {});
  }

  cancelChallenge(challengeId: string): Observable<Challenge> {
    return this.http.post<Challenge>('/api/challenges/' + challengeId + '/cancellation', {});
  }

  getPastChallengesPage(teamId: string, page: number = 0, size: number = 10): Observable<Page<Challenge>> {
    const params = new HttpParams()
      .set('page', '' + page)
      .set('size', '' + size)
      .set('past', 'true')
      .set('teamId', teamId);

    return this.http.get<Page<Challenge>>('/api/challenges', {params: params});
  }

  getResult(challengeId: string): Observable<Result> {
    return this.http.get<Result>('/api/challenges/' + challengeId + '/result');
  }

  saveResult(challengeId: string, result: Result): Observable<Result> {
    return this.http.post<Result>('/api/challenges/' + challengeId + '/result', result);
  }

  confirmResult(challengeId: string): Observable<Result> {
    return this.http.post<Result>('/api/challenges/' + challengeId + '/result/confirmation', {});
  }

  rejectResult(challengeId: string): Observable<Result> {
    return this.http.post<Result>('/api/challenges/' + challengeId + '/result/confirmation', {});
  }

  saveReview(challengeId: string, review: TeamReview) {
    return this.http.post<TeamReview>('/api/challenges/' + challengeId + '/review', review);
  }

  getReview(challengeId: string) {
    return this.http.get<TeamReview>('/api/challenges/' + challengeId + '/review');
  }

}
