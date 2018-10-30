import {Injectable} from '@angular/core';
import {RegisterForm} from '../../auth/models/register';
import {Observable} from 'rxjs';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Player, PlayerRegistrationForm} from '../models/player';
import {TeamInvitation} from '../models/team-invitation';
import {Page} from '../models/page';
import {map} from 'rxjs/operators';

@Injectable()
export class PlayerService {

  constructor(private http: HttpClient) {}

  getCurrent(): Observable<Player> {
    const params = new HttpParams().set('disciplineId', '3x3basket');
    return this.http.get<Player>('/api/players/current', {params: params});
  }

  registerPlayer(registrationForm: PlayerRegistrationForm): Observable<Player> {
    return this.http.post<Player>('/api/players', registrationForm);
  }

  searchByName(name: string = '', page: number = 0, size: number = 10): Observable<Page<Player>> {
    const params = new HttpParams().set('name', name)
      .set('page', '' + page)
      .set('size', '' + size);
    return this.http.get<Page<Player>>('/api/players', {params: params});
  }

  searchByNameWithoutTeam(name: string = '', regionId: string, page: number = 0, size: number = 5): Observable<Page<Player>> {
    const params = new HttpParams().set('name', name)
      .set('page', '' + page)
      .set('size', '' + size)
      .set('withoutTeam', 'true')
      .set('regionId', regionId);
    return this.http.get<Page<Player>>('/api/players', {params: params});
  }
}
