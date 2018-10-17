import {Component, OnInit} from '@angular/core';
import {select, Store} from '@ngrx/store';
import * as fromRoot from '../../reducers/index';
import * as PlayerActions from '../../core/actions/player.actions';
import {selectPlayerProfileNotExisting, selectPlayerProfileLoading} from '../../reducers/index';
import {Observable, Subject} from 'rxjs';

@Component({
  selector: 'app-player-profile-page',
  template: `
    <app-progress [inProgress]="loading$ | async" id="playerProfilePending"></app-progress>
    <div class="spaces-sides">
      <app-breadcrumb [items]="items"></app-breadcrumb>
      <div class="content-container">
        <h1>Profil zawodnika</h1>
        <div *ngIf="(notExisting$ | async)">
          Nie posiadasz jeszcze profilu zawodnika. Aby móc dołączyć do rozgrywek załóż profil korzystając z poniższego formularza.
        </div>
        <app-player-registration-component *ngIf="(notExisting$ | async)"></app-player-registration-component>
      </div>
    </div>
  `
})
export class PlayerProfilePageComponent implements OnInit {
  items = [
    {title: 'Zawodnik'}
  ];

  notExisting$: Observable<boolean>;
  loading$: Observable<boolean>;

  constructor(private store: Store<fromRoot.State>) {
    this.notExisting$ = this.store.pipe(select(selectPlayerProfileNotExisting));
    this.loading$ = this.store.pipe(select(selectPlayerProfileLoading));
  }

  ngOnInit(): void {
    // TODO maybe load only if not loaded before?

    // setTimeout(() => this.store.dispatch(new PlayerActions.LoadPlayerProfile()), 5);
  }
}
