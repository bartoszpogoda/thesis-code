import {Injectable} from '@angular/core';
import {RegisterForm} from '../../auth/models/register';
import {Observable} from 'rxjs';
import {HttpClient, HttpParams} from '@angular/common/http';
import {InvitablePlayer, Player, PlayerRegistrationForm} from '../models/player';
import {Team} from '../models/team';
import {Page} from '../models/page';
import {TeamInvitation} from '../models/team-invitation';
import {ɵINTERNAL_BROWSER_DYNAMIC_PLATFORM_PROVIDERS} from '@angular/platform-browser-dynamic';

@Injectable()
export class TeamService {

  constructor(private http: HttpClient) {}

  getCurrent(): Observable<Team> {
    return this.http.get<Team>('/api/3x3basket/teams/current');
  }

  isManager(team: Team, player: Player): boolean {
    return team.managerId === player.id;
  }

  decodeInvitePlayerPage(page: Page<Player>, invitations: TeamInvitation[]): InvitablePlayer[] {
    return page.content.map(player => {
      return {
        player: player,
        invited: this.isInvited(player, invitations)
      };
    });
  }

  private isInvited(player: Player, invitations: TeamInvitation[]): boolean {
    return invitations.filter(invitation => invitation.playerId === player.id).length > 0;
  }

  getInvitations(teamId: string): Observable<TeamInvitation[]> {
    const params = new HttpParams().set('teamId', teamId);
    return this.http.get<TeamInvitation[]>('/api/3x3basket/invitations/', {params: params});
  }
}
