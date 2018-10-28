import {Component} from '@angular/core';
import {Observable} from 'rxjs';
import {TeamInvitation} from '../models/team-invitation';
import {select, Store} from '@ngrx/store';
import * as fromRoot from '../reducers/index';
import {selectIsManager, selectPlayerTeam} from '../reducers/index';
import {AcceptTeamInvitation, LoadTeamInvitations} from '../actions/player.actions';
import {Team} from '../models/team';
import {Player} from '../models/player';

@Component({
  selector: 'app-team-page',
  template: `
    <div class="spaces-sides">
      <app-breadcrumb [items]="items"></app-breadcrumb>
      <div class="content-container">
        <h1>Twoja drużyna</h1>
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

      </div>
    </div>
  `
})
export class TeamPageComponent {
  items = [
    {title: 'Moja drużyna'}
  ];

  playersTeam$: Observable<Team>;
  isManager$: Observable<boolean>;

  constructor(private store: Store<fromRoot.State>) {
    this.playersTeam$ = this.store.pipe(select(selectPlayerTeam));
    this.isManager$ = this.store.pipe(select(selectIsManager));

  }
}
