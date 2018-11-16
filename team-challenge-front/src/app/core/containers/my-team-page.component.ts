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
      <app-breadcrumb [empty]="true"></app-breadcrumb>
      <div class="content-container">
        <nz-affix [nzOffsetTop]="100">
          <ul nz-menu [nzMode]="'horizontal'" style="margin-bottom: 25px;">
            <li (click)="currentTab = 0" nz-menu-item [nzSelected]="true"><i class="anticon anticon-team"></i> Profil drużyny</li>
            <li (click)="currentTab = 1" nz-menu-item><i class="anticon anticon-user"></i> Zawodnicy</li>
            <li nz-submenu [nzDisabled]="!(isManager$ | async)">
              <span title><i class="anticon anticon-setting"></i>Zarządzanie</span>
              <ul>
                <li (click)="currentTab = 2" nz-menu-item><i class="anticon anticon-edit"></i>Edycja danych</li>
                <li (click)="currentTab = 3" nz-menu-item><i class="anticon anticon-compass"></i>Punkt  macierzysty</li>
                <li (click)="currentTab = 4" nz-menu-item><i class="anticon anticon-usergroup-add"></i>Rekrutacja</li>
                <li (click)="currentTab = 5" nz-menu-item><i class="anticon anticon-delete"></i>Usunięcie drużyny</li>
              </ul>
            </li>
          </ul>
        </nz-affix>

        <app-my-team-profile *ngIf="currentTab === 0"></app-my-team-profile>

        <div nz-row>
          <div nz-col nzSm="2"></div>
          <div nz-col nzSm="20">
            <app-my-team-players *ngIf="currentTab === 1"></app-my-team-players>
            <app-my-team-edit-data *ngIf="currentTab === 2"></app-my-team-edit-data>
            <app-my-team-manager-home *ngIf="currentTab === 3"></app-my-team-manager-home>
            <app-team-recruitment *ngIf="currentTab === 4"></app-team-recruitment>
            <app-my-team-manager-remove *ngIf="currentTab ===5"></app-my-team-manager-remove>
          </div>
          <div nz-col nzSm="2"></div>
        </div>
        
      </div>
    </div>
  `
})
export class MyTeamPageComponent {
  items = [
    {title: 'Moja drużyna'}
  ];

  currentTab = 0;

  playersTeam$: Observable<Team>;
  isManager$: Observable<boolean>;

  constructor(private store: Store<fromRoot.State>) {
    this.playersTeam$ = this.store.pipe(select(selectMyTeam));
    this.isManager$ = this.store.pipe(select(selectIsManager));

  }
}
