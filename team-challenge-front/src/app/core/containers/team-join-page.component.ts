import { Component, OnInit } from '@angular/core';
import {AcceptTeamInvitation, DeclineTeamInvitation, LoadTeamInvitations} from '../actions/player.actions';
import * as fromRoot from '../reducers/index';
import {select, Store} from '@ngrx/store';
import {TeamInvitation} from '../models/team-invitation';
import {Observable} from 'rxjs';
import {selectPlayerInvitations} from '../selectors/my-player.selectors';

@Component({
  selector: 'app-team-join-page',
  template: `
    <div class="spaces-sides">
    <app-breadcrumb [items]="items"></app-breadcrumb>
    <div class="content-container">
      <ul nz-menu [nzMode]="'horizontal'" style="margin-bottom: 25px;">
        <li nz-menu-item [nzSelected]="true"><i class="anticon anticon-user"></i> Zaproszenia do drużyn</li>
        <li nz-menu-item>
          <a href="#" routerLink="/team/new">Załóż drużynę</a>
        </li>
      </ul>

      <p *ngIf="(teamInvitations$ | async).length === 0">Nie posiadasz żadnych zaproszeń.</p>

      <ng-container *ngFor="let invitation of (teamInvitations$ | async)">
        <app-received-invitation [teamInvitation]="invitation" (accepted)="onAccepted(invitation)"
        (declined)="onDeclined(invitation)"></app-received-invitation>
      </ng-container>
    </div>
    </div>
  `
})
export class TeamJoinPageComponent implements OnInit {

  items = [
    {title: 'Moja drużyna'}, {title: 'Dołącz'}
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

  onDeclined(invitation: TeamInvitation) {
    this.store.dispatch(new DeclineTeamInvitation(invitation.id));
  }
}
