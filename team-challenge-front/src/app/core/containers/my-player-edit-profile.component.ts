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
  selector: 'app-my-player-edit-profile',
  template: `
      <h2>Edycja profilu</h2>
      <app-prototype-notification [unavailable]="true" [inline]="true"></app-prototype-notification>
  `
})
export class MyPlayerEditProfileComponent {

}
