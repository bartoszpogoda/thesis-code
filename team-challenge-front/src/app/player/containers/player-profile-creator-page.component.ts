import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {select, Store} from '@ngrx/store';
import {Player, PlayerRegistrationForm} from '../../core/models/player';
import * as fromRoot from '../../reducers/index';
import {
  selectPlayerJustRegistered,
  selectPlayerProfile,
  selectPlayerProfileNotExisting
} from '../../reducers';
import {Register} from '../../core/actions/player.actions';


@Component({
  selector: 'app-player-profile-creator-page',
  template: `
    <div class="spaces-sides">
      <app-breadcrumb [items]="items"></app-breadcrumb>
      <div class="content-container">
        <app-success-alert [display]="justRegistered$ | async" [message]="registerSuccessMessage"
                           [details]="registerSuccessDetails"></app-success-alert>
        <h1>Profil zawodnika</h1>
        <div *ngIf="(notExisting$ | async)">
          Nie posiadasz jeszcze profilu zawodnika. Aby móc dołączyć do rozgrywek załóż profil korzystając z poniższego formularza.
        </div>
        <div nz-row nzGutter="16">
          <div nz-col nzXs="0" nzSm="2"></div>
          <div nz-col nzXs="0" nzSm="10">
            <app-player-profile *ngIf="!(notExisting$ | async)" [player]="player$ | async"
                                (submitted)="onPlayerRegistrationSubmitted($event)">
            </app-player-profile>
          <app-player-registration *ngIf="(notExisting$ | async)" (submitted)="onPlayerRegistrationSubmitted($event)">
          </app-player-registration>
          </div>
          <div nz-col  nzXs="0" nzSm="10">
          </div>
          <div nz-col nzXs="0" nzSm="2"></div>
        </div>
      </div>
    </div>
  `
})
export class PlayerProfileCreatorPageComponent implements OnInit {
  items = [
    {title: 'Zawodnik'}, {title: 'Kreator'}
  ];

  notExisting$: Observable<boolean>;
  justRegistered$: Observable<boolean>;
  player$: Observable<Player>;
  registerSuccessMessage = 'elo elo';
  registerSuccessDetails = 'siema siema';

  constructor(private store: Store<fromRoot.State>) {
    this.notExisting$ = this.store.pipe(select(selectPlayerProfileNotExisting));
    this.justRegistered$ = this.store.pipe(select(selectPlayerJustRegistered));
    this.player$ = this.store.pipe(select(selectPlayerProfile));
  }

  ngOnInit(): void {
    // TODO maybe load only if not loaded before?

    // setTimeout(() => this.store.dispatch(new PlayerActions.LoadCurrent()), 5);
  }

  onPlayerRegistrationSubmitted(registrationForm: PlayerRegistrationForm) {
    this.store.dispatch(new Register(registrationForm));
  }
}
