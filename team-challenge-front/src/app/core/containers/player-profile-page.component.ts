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
        <h1>Profil zawodnika</h1>
        <div nz-row nzGutter="16">
          <app-player-profile [player]="player$ | async">
          </app-player-profile>
        </div>
      </div>
    </div>
  `
})
export class PlayerProfilePageComponent {
  items = [
    {title: 'Mój profil'}
  ];

  player$: Observable<Player>;

  constructor(private store: Store<fromRoot.State>) {
    this.player$ = this.store.pipe(select(selectPlayerProfile));
  }

}
