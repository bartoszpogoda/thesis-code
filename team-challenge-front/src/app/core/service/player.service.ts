import {Injectable} from '@angular/core';
import {RegisterForm} from '../../auth/models/register';
import {Observable} from 'rxjs';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Player, PlayerRegistrationForm} from '../models/player';
import {TeamInvitation} from '../models/team-invitation';
import {Page} from '../models/page';

@Injectable()
export class PlayerService {

  constructor(private http: HttpClient) {}

  getCurrent(): Observable<Player> {
    return this.http.get<Player>('/api/3x3basket/players/current');
  }

  registerPlayer(registrationForm: PlayerRegistrationForm): Observable<Player> {
    return this.http.post<Player>('/api/3x3basket/players', registrationForm);
  }

  getInvitations(playerId: string): Observable<TeamInvitation[]> {
    const params = new HttpParams().set('playerId', playerId);
    return this.http.get<TeamInvitation[]>('/api/3x3basket/invitations/', {params: params});
  }

  acceptInvitation(invitationId: string): Observable<any> {
    return this.http.post<any>('/api/3x3basket/invitations/' + invitationId + '/acceptance', {});
  }

  declineInvitation(invitationId: string): Observable<any> {
    return this.http.delete('/api/3x3basket/invitations/' + invitationId);
  }

  searchByName(name: string = '', page: number = 0, size: number = 10): Observable<Page<Player>> {
    const params = new HttpParams().set('name', name)
      .set('page', '' + page)
      .set('size', '' + size);
    return this.http.get<Page<Player>>('/api/3x3basket/players', {params: params});
  }

  searchByNameWithoutTeam(name: string = '', page: number = 0, size: number = 5): Observable<Page<Player>> {
    const params = new HttpParams().set('name', name)
      .set('page', '' + page)
      .set('size', '' + size)
      .set('withoutTeam', 'true');
    return this.http.get<Page<Player>>('/api/3x3basket/players', {params: params});
  }
}
