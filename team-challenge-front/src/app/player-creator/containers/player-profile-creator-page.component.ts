import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {select, Store} from '@ngrx/store';
import {Player, PlayerRegistrationForm} from '../../core/models/player';
import * as fromRoot from '../../core/reducers/index';
import {BaseDateSubmitted, Register} from '../store/player-creator.actions';
import {selectPlayerProfile, selectPlayerProfileNotExisting} from '../../core/selectors/my-player.selectors';
import {selectStage} from '../store/player-creator.selectors';
import {selectRegions} from '../../core/selectors/core.selectors';
import {Region} from '../../core/models/region';

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
            <nz-steps [nzCurrent]="stage$ | async">
              <nz-step nzTitle="Podstawowe dane"></nz-step>
              <nz-step nzTitle="Umiejętności"></nz-step>
              <nz-step nzTitle="Zdjęcie"></nz-step>
            </nz-steps>
          </div>
        </div>

        <div class="steps-content">

          <app-player-registration *ngIf="(stage$ | async) === 0" (submitted)="onBaseDataSubmitted($event)"
                                   [regions]="regions$ | async">
          </app-player-registration>
          <app-player-skill-form *ngIf="(stage$ | async) === 1" (submitted)="onPlayerRegistrationSubmitted($event)" [builder]="registrationForm">
          </app-player-skill-form>
          <app-player-creator-load-photo *ngIf="(stage$ | async) === 2"></app-player-creator-load-photo>
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
    {title: 'Mój profil'}, {title: 'Kreator'}
  ];

  notExisting$: Observable<boolean>;
  player$: Observable<Player>;
  stage$: Observable<number>;
  regions$: Observable<Region[]>;

  // TODO move to store in future
  registrationForm: PlayerRegistrationForm;


  constructor(private store: Store<fromRoot.State>) {

    this.notExisting$ = this.store.pipe(select(selectPlayerProfileNotExisting));
    this.player$ = this.store.pipe(select(selectPlayerProfile));
    this.stage$ = this.store.pipe(select(selectStage));
    this.regions$ = this.store.pipe(select(selectRegions));
  }

  onBaseDataSubmitted(registrationForm: PlayerRegistrationForm) {
    this.registrationForm = registrationForm;

    this.store.dispatch(new BaseDateSubmitted());
  }

  onPlayerRegistrationSubmitted(registrationForm: PlayerRegistrationForm) {
    this.store.dispatch(new Register(registrationForm));
  }
}
