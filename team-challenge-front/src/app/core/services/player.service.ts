import {Injectable} from '@angular/core';
import {RegisterForm} from '../../auth/models/register';
import {Observable} from 'rxjs';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Player} from '../models/player';

@Injectable()
export class PlayerService {

  constructor(private http: HttpClient) {}

  getByUserId(userId: string): Observable<Player> {
    const params = new HttpParams().set('userId', userId);
    return this.http.get<Player>('/api/3x3basket/players', {headers: null, params: params});
  }
}
