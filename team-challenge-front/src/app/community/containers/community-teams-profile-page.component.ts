import {Component, OnInit} from '@angular/core';

import * as fromCommunity from './../reducers';
import {select, Store} from '@ngrx/store';

@Component({
  selector: 'app-community-players-profile-page',
  template: `
    <div class="spaces-sides">
      <app-breadcrumb [items]="items"></app-breadcrumb>
      <div class="content-container">
        <h1>Drużyna..</h1>

        <h2>Gracze</h2>

        <h2>Wyzwania</h2>
      </div>
    </div>
  `
})
export class CommunityTeamsProfilePageComponent implements OnInit {
  items = [
    {title: 'Społeczność', link: '/community'}, {title: 'Drużyny', link: '/community/teams'}, {title: 'Nazwa drużyny'}
  ];

  constructor(private store: Store<fromCommunity.State>) {

  }

  ngOnInit() {

  }

}
