import {Component, OnInit} from '@angular/core';

import * as fromCommunity from './../reducers';
import {select, Store} from '@ngrx/store';
import {EnterPage, LoadPage} from '../actions/community-teams.actions';
import {Team} from '../../core/models/team';
import {Observable} from 'rxjs';
import {selectTeams, selectTeamsCurrentPage, selectTeamsPageSize, selectTeamsTotal} from './../reducers';
import {Router} from '@angular/router';

@Component({
  selector: 'app-community-players-page',
  template: `
    <div class="spaces-sides">
      <app-breadcrumb [items]="items"></app-breadcrumb>
      <div class="content-container">
        <h1>Drużyny</h1>


        <div nz-row nzGutter="16" class="one-row-cards-container">
          <div nz-col *ngFor="let team of (teams$ | async)" class="gutter-row" nzXs="12" nzSm="4">
            <app-team-card [team]="team" (viewProfile)="teamClicked(team)"></app-team-card>
          </div>
        </div>


        <nz-pagination [nzPageIndex]="(currentPage$ | async) + 1" [nzTotal]="totalPages$ | async"
                       [nzPageSize]="pageSize$ | async" (nzPageIndexChange)="onPageIndexChanged($event)"></nz-pagination>
      </div>
    </div>
  `
})
export class CommunityTeamsPageComponent implements OnInit {
  items = [
    {title: 'Społeczność', link: '/community'}, {title: 'Drużyny'}
  ];

  teams$: Observable<Team[]>;
  currentPage$: Observable<number>;
  totalPages$: Observable<number>;
  pageSize$: Observable<number>;

  constructor(private store: Store<fromCommunity.State>, private router: Router) {
    this.teams$ = this.store.pipe(select(selectTeams));
    this.currentPage$ = this.store.pipe(select(selectTeamsCurrentPage));
    this.totalPages$ = this.store.pipe(select(selectTeamsTotal));
    this.pageSize$ = this.store.pipe(select(selectTeamsPageSize));
  }


  ngOnInit() {
    this.store.dispatch(new EnterPage());
  }

  onPageIndexChanged(id: number) {
    this.store.dispatch(new LoadPage(id - 1));
  }

  teamClicked(team: Team) {
    this.router.navigate(['/community/teams/' + team.id]);
  }
}
