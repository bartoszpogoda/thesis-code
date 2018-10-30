import {Component, OnDestroy} from '@angular/core';
import {select, Store} from '@ngrx/store';
import * as fromRoot from '../../core/reducers';
import {selectPlayerProfile, selectPlayerProfileNotExisting} from '../../core/selectors/my-player.selectors';
import {selectStage} from '../../player-creator/store/player-creator.selectors';
import {selectRegions} from '../../core/selectors/core.selectors';
import {Region} from '../../core/models/region';
import {Observable, Subject} from 'rxjs';
import {selectSelectedRegionOrDefault} from '../reducers';
import {takeUntil} from 'rxjs/operators';
import {RegionSelectionChanged} from '../actions/community.actions';

@Component({
  selector: 'app-community-page',
  template: `
    <div class="spaces-sides">
      <app-breadcrumb [items]="items"></app-breadcrumb>
      <div class="content-container">
        <h1>Społeczność</h1>
        <p>Poznaj społeczność koszykarską w Twoim regionie..</p>

        <div nz-row style="margin: 20px 0;">
          <div nz-col nzXs="0" nzSm="4"></div>
          <div nz-col nzXs="0" nzSm="16">
            <nz-select id="regionId" style="width: 100%" [(ngModel)]="selectedRegion" (ngModelChange)="onRegionSelectionChanged($event)">
              <nz-option *ngFor="let region of (regions$ | async)" [nzValue]="region.id" [nzLabel]="region.name"></nz-option>
            </nz-select>
          </div>
          <div nz-col nzXs="0" nzSm="4"></div>
        </div>

        <div nz-row nzGutter="16" class="one-row-cards-container">
          <div nz-col class="gutter-row" nzXs="0" nzSm="4"></div>
          <div nz-col class="gutter-row" nzXs="24" nzSm="8">
            <h2 routerLink="teams" class="tempStyling">(Link, TODO styling, maybe image?) Drużyny</h2>
          </div>
          <div nz-col class="gutter-row" nzXs="24" nzSm="8">
            <h2 routerLink="players" class="tempStyling">(Link, TODO styling, maybe image?) Zawodnicy</h2>
          </div>
          <div nz-col class="gutter-row" nzXs="0" nzSm="4"></div>
        </div>

      </div>
    </div>
  `,
  styles: [`



  `]
})
export class CommunityPageComponent implements OnDestroy {
  items = [
    {title: 'Społeczność'}
  ];

  destroyed$ = new Subject();

  regions$: Observable<Region[]>;
  selectedRegion: string;

  constructor(private store: Store<fromRoot.State>) {
    this.regions$ = this.store.pipe(select(selectRegions));

    this.store.pipe(select(selectSelectedRegionOrDefault)).pipe(takeUntil(this.destroyed$))
      .subscribe(region => {
          this.selectedRegion = region;
      });
  }

  ngOnDestroy (): void {
    this.destroyed$.next();
  }

  onRegionSelectionChanged(regionId: string) {
    this.store.dispatch(new RegionSelectionChanged(regionId));
  }
}
