import {Component} from '@angular/core';
import {Observable} from 'rxjs';
import {TeamInvitation} from '../models/team-invitation';
import {select, Store} from '@ngrx/store';
import * as fromRoot from '../reducers/index';
import {AcceptTeamInvitation, LoadTeamInvitations} from '../actions/player.actions';
import {Team} from '../models/team';
import {Player} from '../models/player';
import {selectIsManager, selectMyTeam, selectMyTeamPlayers} from '../selectors/my-team.selectors';

@Component({
  selector: 'app-my-team-players',
  template: `
      <div nz-row>
        <div nz-col nzSm="4"></div>
        <div nz-col nzSm="16">
          <app-player-horizontal-card *ngFor="let player of (myTeamPlayers$ | async)"
                                      [player]="player" [team]="myTeam$ | async"></app-player-horizontal-card>
        </div>
      </div>
  `
})
export class MyTeamPlayersComponent {
  myTeamPlayers$: Observable<Player[]>;
  myTeam$: Observable<Team>;

  constructor(private store: Store<fromRoot.State>) {
    this.myTeamPlayers$ = this.store.pipe(select(selectMyTeamPlayers));
    this.myTeam$ = this.store.pipe(select(selectMyTeam));

  }
}
