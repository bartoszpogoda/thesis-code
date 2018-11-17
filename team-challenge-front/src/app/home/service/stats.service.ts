import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
@Injectable()
export class StatsService {

  constructor(private http: HttpClient) {}

  get(): Observable<Stats> {
    return this.http.get<Stats>('/api/stats' );
  }

}

export interface Stats {
  facilities: number;
  teams: number;
  finishedChallenges: number;
}
