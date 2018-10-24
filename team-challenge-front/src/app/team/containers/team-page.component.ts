import {Component} from '@angular/core';
import {Observable} from 'rxjs';
import {TeamInvitation} from '../../core/models/team-invitation';
import {select, Store} from '@ngrx/store';
import * as fromRoot from '../../reducers';
import {selectIsManager, selectJustJoined, selectPlayerInvitations, selectPlayerTeam} from '../../reducers';
import {AcceptTeamInvitation, LoadTeamInvitations} from '../../core/actions/player.actions';
import {Team} from '../../core/models/team';
import {Player} from '../../core/models/player';

@Component({
  selector: 'app-team-page',
  template: `
    <div class="spaces-sides">
      <app-breadcrumb [items]="items"></app-breadcrumb>
      <div class="content-container">
        <h1>Twoja drużyna</h1>
        <app-success-alert [display]="justJoined$ | async" [message]="justJoinedMessage"
                           [details]="justJoinedMessageDetails"></app-success-alert>
        <div nz-row nzGutter="16">
          <div nz-col nzXs="0" nzSm="2"></div>
          <div nz-col nzXs="0" nzSm="10">
            <app-team-display [team]="playersTeam$ | async"></app-team-display>
          </div>
          <div nz-col  nzXs="0" nzSm="10">
          </div>
          <div nz-col nzXs="0" nzSm="2"></div>
        </div>

        <div *ngIf="isManager$ | async">
          <button routerLink="manager" nz-button nzType="primary">Przejdź do widoku zarządzania</button>
        </div>

        <h2>Zawodnicy</h2>

        <div nz-row nzGutter="16">
          <div nz-col nzXs="0" nzSm="4">
            <app-player-card [player]="testPlayer"></app-player-card>
          </div>
        </div>

      </div>
    </div>
  `
})
export class TeamPageComponent {
  items = [
    {title: 'Drużyna'}
  ];

  testPlayer: Player = {
    id: '0',
    yearsOfExperience: 2,
    height: 172,
    age: 17,
    fullName: 'Andrzej Pietruszka',
    teamName: 'Team RZODKIEWKA'
  };

  playersTeam$: Observable<Team>;
  isManager$: Observable<boolean>;
  justJoined$: Observable<boolean>;

  justJoinedMessage = 'Zaproszenie zostało zaakceptowane';
  justJoinedMessageDetails = 'Dołączyłeś do drużyny';

  constructor(private store: Store<fromRoot.State>) {
    this.playersTeam$ = this.store.pipe(select(selectPlayerTeam));
    this.isManager$ = this.store.pipe(select(selectIsManager));

    this.justJoined$ = this.store.pipe(select(selectJustJoined));
  }
}
