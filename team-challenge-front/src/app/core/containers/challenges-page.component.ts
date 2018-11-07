import {Component, OnInit} from '@angular/core';
import {select, Store} from '@ngrx/store';
import * as fromRoot from '../reducers/index';
import {Observable} from 'rxjs';
import {Player} from '../models/player';
import {selectPlayerProfile} from '../selectors/my-player.selectors';

@Component({
  selector: 'app-challenges-page',
  template: `
    <div class="spaces-sides">
      <app-breadcrumb [items]="items"></app-breadcrumb>
      <div class="content-container">
        <h1>Wyzwania</h1>
        <div nz-row nzGutter="16">
          <h2 class="tempStyling" routerLink="search">Znajdź przeciwników</h2>
        </div>
      </div>
    </div>
  `
})
export class ChallengesPageComponent {
  items = [
    {title: 'Wyzwania'}
  ];

  constructor(private store: Store<fromRoot.State>) {

  }

}
