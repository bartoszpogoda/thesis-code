import {Component} from '@angular/core';
import {Observable} from 'rxjs';
import {TeamInvitation} from '../models/team-invitation';
import {select, Store} from '@ngrx/store';
import * as fromRoot from '../reducers/index';
import {AcceptTeamInvitation, LoadTeamInvitations} from '../actions/player.actions';
import {Team} from '../models/team';
import {Player} from '../models/player';
import {selectIsManager, selectMyTeam} from '../selectors/my-team.selectors';

@Component({
  selector: 'app-my-team-profile',
  template: `
    <div nz-row nzGutter="16">
      <app-team-profile [team]="playersTeam$ | async">
      </app-team-profile>
    </div>
  `
})
export class MyTeamProfileComponent {

  playersTeam$: Observable<Team>;

  constructor(private store: Store<fromRoot.State>) {
    this.playersTeam$ = this.store.pipe(select(selectMyTeam));

  }
}
