import {Injectable} from '@angular/core';
import {RegisterForm} from '../../auth/models/register';
import {Observable} from 'rxjs';
import {HttpClient, HttpParams} from '@angular/common/http';
import {InvitablePlayer, Player, PlayerRegistrationForm} from '../models/player';
import {Team, TeamCreationForm} from '../models/team';
import {Page} from '../models/page';
import {TeamInvitation} from '../models/team-invitation';
import {ɵINTERNAL_BROWSER_DYNAMIC_PLATFORM_PROVIDERS} from '@angular/platform-browser-dynamic';
import {Position} from '../models/position';
import {map} from 'rxjs/operators';

@Injectable()
export class TeamService {

  constructor(private http: HttpClient) {}

  getCurrent(): Observable<Team> {
    return this.http.get<Team>('/api/teams/current');
  }

  get(id: string): Observable<Team> {
    return this.http.get<Team>('/api/teams/' + id);
  }

  getPlayers(id: string): Observable<Player[]> {
    return this.http.get<Player[]>('/api/teams/' + id + '/players');
  }

  isManager(team: Team, player: Player): boolean {
    return team.managerId === player.id;
  }


  createTeam(creationForm: TeamCreationForm): Observable<Team> {
    return this.http.post<Team>('/api/teams/', creationForm);
  }

  setHome(teamId: string, home: Position): Observable<Position> {
    return this.http.post<Position>('/api/teams/' + teamId + '/home', home);
  }

  getHome(teamId: string): Observable<Position> {
    return this.http.get<Position>('/api/teams/' + teamId + '/home');
  }
}
