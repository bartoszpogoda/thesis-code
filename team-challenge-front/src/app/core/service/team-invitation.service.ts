import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {TeamInvitation} from '../models/team-invitation';
import {Page} from '../models/page';
import {map} from 'rxjs/operators';
import {InvitablePlayer, Player} from '../models/player';

@Injectable()
export class TeamInvitationService {

  constructor(private http: HttpClient) {}

  getPlayerInvitations(playerId: string): Observable<TeamInvitation[]> {
    const params = new HttpParams().set('playerId', playerId);
    return this.http.get<Page<TeamInvitation>>('/api/invitations/', {params: params})
      .pipe(map(page => page.content));
  }

  acceptInvitation(invitationId: string): Observable<any> {
    return this.http.post<any>('/api/invitations/' + invitationId + '/acceptance', {});
  }

  declineInvitation(invitationId: string): Observable<any> {
    return this.http.delete('/api/invitations/' + invitationId);
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

  getTeamInvitations(teamId: string): Observable<TeamInvitation[]> {
    const params = new HttpParams().set('teamId', teamId);
    return this.http.get<Page<TeamInvitation>>('/api/invitations/', {params: params})
      .pipe(map(page => page.content));
  }

  cancelInvitation(invitationId: string): Observable<any> {
    return this.http.delete('/api/invitations/' + invitationId);
  }

  invite(teamId: string, playerId: string): Observable<TeamInvitation> {
    const invitation: TeamInvitation = {
      teamId: teamId,
      playerId: playerId
    };

    return this.http.post<TeamInvitation>('/api/invitations', invitation);
  }

}
