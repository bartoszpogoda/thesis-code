import {Component, OnInit} from '@angular/core';
import {select, Store} from '@ngrx/store';
import * as fromRoot from '../../reducers/index';
import * as PlayerActions from '../../core/actions/player.actions';
import {
  selectPlayerJustRegistered,
  selectPlayerProfile, selectPending,
} from '../../reducers/index';
import {Observable} from 'rxjs';
import {Player, PlayerRegistrationForm} from '../../core/models/player';
import {Register} from '../../core/actions/player.actions';

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
          <div nz-col nzXs="0" nzSm="2"></div>
          <div nz-col nzXs="0" nzSm="10">
            <app-player-profile [player]="player$ | async"
                                (submitted)="onPlayerRegistrationSubmitted($event)">
            </app-player-profile>
          </div>
          <div nz-col  nzXs="0" nzSm="10">
          </div>
          <div nz-col nzXs="0" nzSm="2"></div>
        </div>
      </div>
    </div>
  `
})
export class PlayerProfilePageComponent implements OnInit {
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

  ngOnInit(): void {
    // setTimeout(() => this.store.dispatch(new PlayerActions.LoadCurrent()), 5);
  }

  onPlayerRegistrationSubmitted(registrationForm: PlayerRegistrationForm) {
    this.store.dispatch(new Register(registrationForm));
  }
}
