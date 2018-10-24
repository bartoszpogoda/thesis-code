import {Component, OnInit} from '@angular/core';
import {select, Store} from '@ngrx/store';
import * as fromRoot from '../../reducers/index';
import {
  selectPlayerJustRegistered,
  selectPlayerProfile, selectPending,
} from '../../reducers/index';
import {Observable} from 'rxjs';
import {Player} from '../../core/models/player';

@Component({
  selector: 'app-player-profile-page',
  template: `
    <app-progress [inProgress]="(pending$ | async) > 0" id="playerProfilePending"></app-progress>
    <div class="spaces-sides">
      <app-breadcrumb [items]="items"></app-breadcrumb>
      <div class="content-container">
        <app-success-alert [display]="justRegistered$ | async" [message]="registerSuccessMessage"
                           [details]="registerSuccessDetails"></app-success-alert>
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
    {title: 'Zawodnik'}
  ];

  justRegistered$: Observable<boolean>;
  registerSuccessMessage = 'Profil zawodnika utworzony!';
  registerSuccessDetails = 'Teraz możesz dołączyć do drużyny lub założyć swoją.';

  player$: Observable<Player>;
  pending$: Observable<number>;

  constructor(private store: Store<fromRoot.State>) {
    this.justRegistered$ = this.store.pipe(select(selectPlayerJustRegistered));
    this.player$ = this.store.pipe(select(selectPlayerProfile));
    this.pending$ = this.store.pipe(select(selectPending));
  }

}
