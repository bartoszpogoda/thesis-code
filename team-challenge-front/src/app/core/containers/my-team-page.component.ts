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
  selector: 'app-team-page',
  template: `
    <div class="spaces-sides">
      <app-breadcrumb [items]="items"></app-breadcrumb>
      <div class="content-container">
        <ul nz-menu [nzMode]="'horizontal'" style="margin-bottom: 25px;">
          <li nz-menu-item [nzSelected]="true"><i class="anticon anticon-team"></i> Profil drużyny</li>
          <li nz-menu-item><i class="anticon anticon-user"></i> Zawodnicy</li>
          <li nz-submenu [nzDisabled]="!(isManager$ | async)">
            <span title><i class="anticon anticon-setting"></i>Zarządzanie</span>
            <ul>
              <li routerLink="/team/manager/edit" nz-menu-item>Edycja danych</li>
              <li routerLink="/team/manager/home" nz-menu-item>Edycja punktu macierzystego</li>
              <li routerLink="/team/manager/recruitment" nz-menu-item>Rekrutacja</li>
              <li routerLink="/team/manager/remove" nz-menu-item>Usunięcie drużyny</li>
            </ul>
          </li>
        </ul>
        
        <h1>Moja drużyna</h1>
        <div nz-row nzGutter="16">
          <div nz-col nzXs="0" nzSm="2"></div>
          <div nz-col nzXs="0" nzSm="10">
            <app-team-display [team]="playersTeam$ | async"></app-team-display>
          </div>
          <div nz-col  nzXs="0" nzSm="10">
          </div>
          <div nz-col nzXs="0" nzSm="2"></div>
        </div>
        
        
        <app-my-team-players></app-my-team-players>

      </div>
    </div>
  `
})
export class MyTeamPageComponent {
  items = [
    {title: 'Moja drużyna'}
  ];

  playersTeam$: Observable<Team>;
  isManager$: Observable<boolean>;

  constructor(private store: Store<fromRoot.State>) {
    this.playersTeam$ = this.store.pipe(select(selectMyTeam));
    this.isManager$ = this.store.pipe(select(selectIsManager));

  }
}
