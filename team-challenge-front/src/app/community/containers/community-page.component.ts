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
          <div nz-col nzXs="24" nzSm="24" style="margin-bottom: 15px;">
            <div nz-row nzGutter="16" class="block">
              <div nz-col nzSm="4"></div>
              <div nz-col nzSm="6" class="rivalSearch"></div>
              <div nz-col nzSm="10" class="blockCaption"><h2 routerLink="/challenges/new" class="vert-centered">Szukaj rywali <i class="anticon anticon-search"></i></h2></div>
              <div nz-col nzSm="4"></div>
            </div>
          </div>
        </div>

        <div nz-row nzGutter="16">
          <div nz-col nzXs="24" nzSm="8">
            <div nz-row nzGutter="16" class="block">
              <div nz-col nzSm="1"></div>
              <div nz-col nzSm="8" class="teamsBlock"></div>
              <div nz-col nzSm="14" class="blockCaption"><h2 routerLink="teams" class="vert-centered">Drużyny</h2></div>
              <div nz-col nzSm="1"></div>
            </div>
          </div>
          <div nz-col nzXs="24" nzSm="8">
            <div nz-row nzGutter="16" class="block">
              <div nz-col nzSm="1"></div>
              <div nz-col nzSm="8" class="playersBlock"></div>
              <div nz-col nzSm="14" class="blockCaption"><h2 routerLink="players" class="vert-centered">Zawodnicy</h2></div>
              <div nz-col nzSm="1"></div>
            </div>
          </div>
          <div nz-col nzXs="24" nzSm="8">
            <div nz-row nzGutter="16" class="block">
              <div nz-col nzSm="1"></div>
              <div nz-col nzSm="8" class="sportObjectsBlock"></div>
              <div nz-col nzSm="14" class="blockCaption"><h2 routerLink="facilities" class="vert-centered">Obiekty sportowe</h2></div>
              <div nz-col nzSm="1"></div>
            </div>
          </div>
        </div>

      </div>
    </div>
  `,
  styles: [`
  
    .block {
      margin: 0px !important;
      border: solid 1px #2b2424;
      background: #f9f9f9;
      /*padding: 20px;*/
      text-align: center;
      height: 200px;
      cursor: pointer;
    }
    
    .blockCaption {
      height: 200px;
      vertical-align: center;
    }
    
    .vert-centered {
      position: relative;
      top: 40%;
    }
    
    .rivalSearch {
      height: 200px;
      background-size: 80%;
      background-position: 20% 0%;
      background-image: url(/assets/images/home/rivals.png);
      background-repeat: no-repeat;
    }

    .teamsBlock {
      height: 200px;
      background-size: 100%;
      background-position: 10% 0%;
      background-image: url(/assets/images/home/rivals2.png);
      background-repeat: no-repeat;
    }

    .playersBlock {
      height: 200px;
      background-size: 100%;
      background-position: 10% 0%;
      background-image: url(/assets/images/home/player.png);
      background-repeat: no-repeat;
    }

    .sportObjectsBlock {
      height: 200px;
      background-size: 100%;
      background-position: 10% 50%;
      background-image: url(/assets/images/home/ballandbasket.png);
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
