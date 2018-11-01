import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {Position} from '../../core/models/position';
import {select, Store} from '@ngrx/store';
import * as fromRoot from '../../core/reducers';
import {Router} from '@angular/router';
import {selectMyTeamHome, selectMyTeamHomeOrRegionCenter} from '../../core/selectors/my-team.selectors';
import {SetHome} from '../../core/actions/manager.actions';
import {selectFacilities, selectSelectedRegionOrDefault} from '../reducers';
import {Region} from '../../core/models/region';
import {Facility} from '../../core/models/facility';
import {LoadFacilities} from '../actions/community-facilities.actions';
import {Team} from '../../core/models/team';

@Component({
  selector: 'app-community-facilities-page',
  template: `
    <div class="spaces-sides">
      <app-breadcrumb [items]="items"></app-breadcrumb>
      <div class="content-container">
        <h1>Obiekty sportowe</h1>
        <app-region-facility-picker [facilities]="facilities$ | async" [center]="(region$ | async)?.center" [home]="myTeamHome$ | async"
                                    (picked)="onFacilitySelected($event)" height="350">
        </app-region-facility-picker>

        <div style="text-align: center; margin-top: 20px;">
          <button nz-button nzType="dashed" nzSize="large" nzBlock (click)="onNewFacilityClicked()"><i class="anticon anticon-plus"></i>
            Wprowadź obiekt sportowy
          </button>
        </div>
      </div>
    </div>
  `
})
export class CommunityFacilitiesPageComponent implements OnInit {
  items = [
    {title: 'Społeczność', link: '/community'}, {title: 'Obiekty sportowe'}
  ];

  region$: Observable<Region>;
  facilities$: Observable<Facility[]>;
  myTeamHome$: Observable<Position>;

  constructor(private store: Store<fromRoot.State>, private router: Router) {
    this.region$ = this.store.pipe(select(selectSelectedRegionOrDefault));
    this.facilities$ = this.store.pipe(select(selectFacilities));
    this.myTeamHome$ = this.store.pipe(select(selectMyTeamHome));
  }

  ngOnInit() {
    this.store.dispatch(new LoadFacilities());
  }

  onFacilitySelected(facility: Facility) {
    this.router.navigate(['/community/facilities/' + facility.id]);
  }

  onNewFacilityClicked() {
    this.router.navigate(['/community/facilities/creator']);
  }
}
