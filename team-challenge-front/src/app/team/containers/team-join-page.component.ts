import { Component, OnInit } from '@angular/core';
import {AcceptTeamInvitation, LoadTeamInvitations} from '../../core/actions/player.actions';
import * as fromRoot from '../../reducers/index';
import {select, Store} from '@ngrx/store';
import {selectPlayerInvitations} from '../../reducers/index';
import {TeamInvitation} from '../../core/models/team-invitation';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-team-join-page',
  template: `
    <div class="spaces-sides">
    <app-breadcrumb [items]="items"></app-breadcrumb>
    <div class="content-container">
      <h1>Dołącz do drużyny lub załóż własną</h1>

      <h2>Zaproszenia do drużyn</h2>

      <ng-container *ngFor="let invitation of (teamInvitations$ | async)">
        <app-received-invitation [teamInvitation]="invitation" (accepted)="onAccepted(invitation)"></app-received-invitation>
      </ng-container>
      <nz-divider></nz-divider>

      <h2>Załóż nową drużynę</h2>
    </div>
    </div>
  `
})
export class TeamJoinPageComponent implements OnInit {

  items = [
    {title: 'Drużyna'}, {title: 'Dołącz'}
  ];

  teamInvitations$: Observable<TeamInvitation[]>;

  constructor(private store: Store<fromRoot.State>) {
    this.teamInvitations$ = this.store.pipe(select(selectPlayerInvitations));
  }

  ngOnInit() {
    this.store.dispatch(new LoadTeamInvitations());
  }

  onAccepted(invitation: TeamInvitation) {
    this.store.dispatch(new AcceptTeamInvitation(invitation.id));
  }
}
