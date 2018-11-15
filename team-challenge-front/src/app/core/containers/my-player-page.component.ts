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
      <app-breadcrumb [items]="items"></app-breadcrumb>
      
      <div class="content-container">
        <ul nz-menu [nzMode]="'horizontal'" style="margin-bottom: 25px;">
          <li nz-menu-item [nzSelected]="true"><i class="anticon anticon-user"></i> Mój profil</li>
          <li nz-submenu>
            <span title><i class="anticon anticon-setting"></i>Zarządzanie</span>
            <ul>
              <li nz-menu-item><i nz-icon type="mail"></i>Edycja profilu</li>
              <li nz-menu-item><i nz-icon type="mail"></i>Usunięcie profilu</li>
            </ul>
          </li>
        </ul>
        
        <div nz-row nzGutter="16">
          <app-player-profile [player]="player$ | async">
          </app-player-profile>
        </div>
      </div>
    </div>
  `
})
export class MyPlayerPageComponent {
  items = [
    {title: 'Mój profil'}
  ];

  player$: Observable<Player>;

  constructor(private store: Store<fromRoot.State>) {
    this.player$ = this.store.pipe(select(selectPlayerProfile));
  }

}
