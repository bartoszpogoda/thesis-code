import {Component, OnDestroy} from '@angular/core';
import {select, Store} from '@ngrx/store';
import * as fromRoot from '../../core/reducers';
import {selectPlayerProfile, selectPlayerProfileNotExisting} from '../../core/selectors/my-player.selectors';
import {selectStage} from '../../player-creator/store/player-creator.selectors';
import {selectRegions} from '../../core/selectors/core.selectors';
import {Region} from '../../core/models/region';
import {Observable, Subject} from 'rxjs';
import {selectSelectedRegionIdOrDefault} from '../reducers';
import {takeUntil} from 'rxjs/operators';
import {RegionSelectionChanged} from '../actions/community.actions';
import {LoadFacilities} from '../actions/community-facilities.actions';
import {selectIsMyTeamReadyForChallenge} from '../../core/selectors/my-team.selectors';

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

        <div *ngIf="isMyTeamReadyForChallenge$ | async" nz-row nzGutter="16">
          <div nz-col nzXs="24" nzSm="24">
            <h2 routerLink="/challenges/new" class="tempStyling rivalSearch">Szukaj rywali <i class="anticon anticon-search"></i></h2>
          </div>
        </div>

        <div nz-row nzGutter="16">
          <div nz-col nzXs="24" nzSm="8">
            <h2 routerLink="teams" class="tempStyling teamsBlock">Drużyny</h2>
          </div>
          <div nz-col nzXs="24" nzSm="8">
            <h2 routerLink="players" class="tempStyling playersBlock">Zawodnicy</h2>
          </div>
          <div nz-col nzXs="24" nzSm="8">
            <h2 routerLink="facilities" class="tempStyling sportObjectsBlock">Obiekty sportowe</h2>
          </div>
        </div>

      </div>
    </div>
  `,
  styles: [`
  
    .rivalSearch {
      background-size: 20%;
      background-position: 20% 0%;
      background-image: url(/assets/images/home/rivals.png);
      background-repeat: no-repeat;
    }

    .teamsBlock {
      background-size: 25%;
      background-position: 10% 0%;
      background-image: url(/assets/images/home/rivals2.png);
      background-repeat: no-repeat;
    }

    .playersBlock {
      background-size: 25%;
      background-position: 10% 0%;
      background-image: url(/assets/images/home/player.png);
      background-repeat: no-repeat;
    }

    .sportObjectsBlock {
      background-size: 25%;
      background-position: 10% 0%;
      background-image: url(/assets/images/home/dunk.png);
      background-repeat: no-repeat;
    }
    
  `]
})
export class CommunityPageComponent implements OnDestroy {
  items = [
    {title: 'Społeczność'}
  ];

  destroyed$ = new Subject();

  regions$: Observable<Region[]>;
  isMyTeamReadyForChallenge$: Observable<boolean>;
  selectedRegion: string;

  constructor(private store: Store<fromRoot.State>) {
    this.regions$ = this.store.pipe(select(selectRegions));

    this.isMyTeamReadyForChallenge$ = this.store.pipe(select(selectIsMyTeamReadyForChallenge));

    this.store.pipe(select(selectSelectedRegionIdOrDefault)).pipe(takeUntil(this.destroyed$))
      .subscribe(region => {
        this.selectedRegion = region;
      });

  }

  ngOnDestroy(): void {
    this.destroyed$.next();
  }

  onRegionSelectionChanged(regionId: string) {
    this.store.dispatch(new RegionSelectionChanged(regionId));
  }
}
