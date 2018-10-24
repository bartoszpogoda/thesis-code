import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {select, Store} from '@ngrx/store';
import {Player, PlayerRegistrationForm} from '../../core/models/player';
import * as fromRoot from '../../reducers/index';
import {
  selectPlayerCreatorStep,
  selectPlayerJustRegistered,
  selectPlayerProfile,
  selectPlayerProfileNotExisting
} from '../../reducers';
import {Register} from '../../core/actions/player.actions';

// TODO refactor success alerts - maybe tosster
@Component({
  selector: 'app-player-profile-creator-page',
  template: `
    <div class="spaces-sides">
      <app-breadcrumb [items]="items"></app-breadcrumb>
      <div class="content-container">


        <h1>Kreator zawodnika</h1>
        <div *ngIf="(notExisting$ | async)" style="margin-bottom: 15px;">
          Nie posiadasz jeszcze profilu zawodnika. Aby móc dołączyć do rozgrywek załóż profil korzystając z poniższego formularza.
        </div>

        <div nz-row nzGutter="16">
          <div nz-col class="gutter-row" nzXs="0" nzSm="6"></div>
          <div nz-col class="gutter-row" nzXs="24" nzSm="12">
            <nz-steps [nzCurrent]="step$ | async">
              <nz-step nzTitle="Podstawowe dane"></nz-step>
              <nz-step nzTitle="Zdjęcie"></nz-step>
            </nz-steps>
          </div>
        </div>

        <div class="steps-content">

          <app-player-registration *ngIf="(step$ | async) === 0" (submitted)="onPlayerRegistrationSubmitted($event)">
          </app-player-registration>
          <app-player-creator-load-photo *ngIf="(step$ | async) === 1"></app-player-creator-load-photo>
        </div>

      </div>
    </div>
  `,
  styles  : [
    `
      .steps-content {
        margin-top: 16px;
        border: 1px dashed #e9e9e9;
        border-radius: 6px;
        background-color: #fafafa;
        min-height: 200px;
        text-align: center;
        padding-top: 20px;
      }

      .steps-action {
        margin-top: 24px;
      }

      button {
        margin-right: 8px;
      }
    `
  ]
})
export class PlayerProfileCreatorPageComponent {
  items = [
    {title: 'Zawodnik'}, {title: 'Kreator'}
  ];

  notExisting$: Observable<boolean>;
  justRegistered$: Observable<boolean>;
  player$: Observable<Player>;
  registerSuccessMessage = 'Profil zawodnika został utworzony.';
  registerSuccessDetails = 'Dodaj swoje zdjęcie (Todo ładniejszy tekst)';

  step$: Observable<number>;

  constructor(private store: Store<fromRoot.State>) {
    this.notExisting$ = this.store.pipe(select(selectPlayerProfileNotExisting));
    this.justRegistered$ = this.store.pipe(select(selectPlayerJustRegistered));
    this.player$ = this.store.pipe(select(selectPlayerProfile));
    this.step$ = this.store.pipe(select(selectPlayerCreatorStep));
  }


  onPlayerRegistrationSubmitted(registrationForm: PlayerRegistrationForm) {
    this.store.dispatch(new Register(registrationForm));
  }
}
