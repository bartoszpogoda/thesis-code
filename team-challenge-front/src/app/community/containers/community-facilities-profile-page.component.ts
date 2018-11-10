import {Component, OnDestroy, OnInit} from '@angular/core';

import * as fromCommunity from './../reducers';
import {select, Store} from '@ngrx/store';
import {LoadTeam, LoadTeamPlayers} from '../actions/community-teams.actions';
import {ActivatedRoute} from '@angular/router';
import {Observable, Subject, Subscription} from 'rxjs';
import {Team} from '../../core/models/team';
import {selectCurrentFacility, selectCurrentTeam, selectCurrentTeamPlayers} from './../reducers';
import {takeUntil} from 'rxjs/operators';
import {Player} from '../../core/models/player';
import {Facility} from '../../core/models/facility';
import {LoadFacility} from '../actions/community-facilities.actions';

@Component({
  selector: 'app-community-players-profile-page',
  template: `
    <div class="spaces-sides">
      <app-breadcrumb [items]="items"></app-breadcrumb>
      <div class="content-container">
        <h1>{{(facility$ | async)?.name}}</h1>
        <pre *ngIf="(facility$ | async) !== null">{{ facility$ | async | json }}</pre>
        <app-prototype-notification></app-prototype-notification>
      </div>
    </div>
  `
})
export class CommunityFacilitiesProfilePageComponent implements OnInit, OnDestroy {

  facility$: Observable<Facility>;
  sub: Subscription;
  unsubscribe$ = new Subject();

  items = [
    {title: 'Społeczność', link: '/community'}, {title: 'Obiekty sportowe', link: '/community/facilities'}, {title: ' '}
  ];


  constructor(private store: Store<fromCommunity.State>, private route: ActivatedRoute) {
    this.facility$ = this.store.pipe(select(selectCurrentFacility));

    this.facility$.pipe(takeUntil(this.unsubscribe$)).subscribe(facility => {
      if (facility !== null) {
        this.items = [{title: 'Społeczność', link: '/community'}, {title: 'Obiekty sportowe', link: '/community/facilities'},
          {title: facility.name}];
      } else {
        this.items = [{title: 'Społeczność', link: '/community'}, {title: 'Obiekty sportowe', link: '/community/facilities'}, {title: ' '}];
      }
    });

  }


  ngOnInit() {
    this.sub = this.route.params.pipe(takeUntil(this.unsubscribe$)).subscribe(params => {
      this.store.dispatch(new LoadFacility(params['id']));
    });
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();

    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

}
