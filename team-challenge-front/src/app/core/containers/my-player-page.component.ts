import {Component, OnInit} from '@angular/core';
import {select, Store} from '@ngrx/store';
import * as fromRoot from '../reducers/index';
import {Observable} from 'rxjs';
import {Player} from '../models/player';
import {selectPlayerProfile} from '../selectors/my-player.selectors';

@Component({
  selector: 'app-player-profile-page',
  template: `
    <div class="spaces-sides">
      <app-breadcrumb [empty]="true"></app-breadcrumb>

      <div class="content-container">
        <ul nz-menu [nzMode]="'horizontal'" style="margin-bottom: 25px;">
          <li (click)="currentTab = 0" nz-menu-item [nzSelected]="true"><i class="anticon anticon-user"></i> Mój profil</li>
          <li nz-submenu>
            <span title><i class="anticon anticon-setting"></i>Zarządzanie</span>
            <ul>
              <li (click)="currentTab = 1" nz-menu-item><i class="anticon anticon-edit"></i>Edycja profilu</li>
              <li (click)="currentTab = 2" nz-menu-item><i class="anticon anticon-delete"></i>Usunięcie profilu</li>
            </ul>
          </li>
        </ul>

        <div nz-row nzGutter="16">
          <app-player-profile *ngIf="currentTab === 0" [player]="player$ | async">
          </app-player-profile>
        </div>

        <div nz-row>
          <div nz-col nzSm="2"></div>
          <div nz-col nzSm="20">
            <app-my-player-edit-profile *ngIf="currentTab === 1"></app-my-player-edit-profile>
            <app-my-player-remove-profile *ngIf="currentTab === 2"></app-my-player-remove-profile>
          </div>
          <div nz-col nzSm="2"></div>
        </div>
      </div>
    </div>
  `
})
export class MyPlayerPageComponent {

  currentTab = 0;

  player$: Observable<Player>;

  constructor(private store: Store<fromRoot.State>) {
    this.player$ = this.store.pipe(select(selectPlayerProfile));
  }

}
