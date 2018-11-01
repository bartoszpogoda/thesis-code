import {Component} from '@angular/core';
import {select, Store} from '@ngrx/store';
import * as fromRoot from '../../core/reducers/index';
import LatLng = google.maps.LatLng;
import {TeamCreationForm} from '../../core/models/team';
import {BaseDataSubmitted, CreateFacility, GoToPreviousStage, PositionSelected} from '../store/facility-creator.actions';
import {selectBuilder, selectStage} from '../store/facility-creator.selectors';
import {Observable} from 'rxjs';
import {Region} from '../../core/models/region';
import {Position} from '../../core/models/position';
import {selectMyPlayerRegion, selectRegions} from '../../core/selectors/core.selectors';
import {Player} from '../../core/models/player';
import {selectPlayerProfile} from '../../core/selectors/my-player.selectors';
import {selectSelectedRegionOrDefault} from '../../community/reducers';
import {FacilityCreationForm} from '../../core/models/facility';


@Component({
  selector: 'app-team-creator-page',
  template: `
    <div class="spaces-sides">
      <app-breadcrumb [items]="items"></app-breadcrumb>
      <div class="content-container">
        <!--<h1>Kreator obiektu sportowego</h1>-->

        <div nz-row nzGutter="16">
          <div nz-col class="gutter-row" nzXs="0" nzSm="6"></div>
          <div nz-col class="gutter-row" nzXs="24" nzSm="12">
            <nz-steps [nzCurrent]="stage$ | async">
              <nz-step nzTitle="Położenie"></nz-step>
              <nz-step nzTitle="Podstawowe dane"></nz-step>
              <nz-step nzTitle="Dodatkowe dane"></nz-step>
            </nz-steps>
          </div>
        </div>

        <div class="steps-content">

          <div nz-row nzGutter="16">
            <div nz-col class="gutter-row" nzXs="0" nzSm="3"></div>
            <div nz-col class="gutter-row" nzXs="24" nzSm="18">

              <div *ngIf="(stage$ | async) == 0">
                <app-facility-creator-position [region]="region$ | async" (accepted)="onPositionSubmitted($event)"
                [builder]="builder$ | async">
                </app-facility-creator-position>
              </div>

              <div *ngIf="(stage$ | async) == 1">
                <h2>Wprowadź podstawowe dane obiektu</h2>
                <app-facility-creator-base-data [builder]="builder$ | async" (submitted)="baseDataSubmitted($event)"
                                                [regions]="regions$ | async" (back)="goBack()"
                                                [fixedRegionId]="(region$ | async).id">
                </app-facility-creator-base-data>
              </div>

              <div *ngIf="(stage$ | async) == 2">
                <h2>Wprowadź szczegółowe dane obiektu</h2>
                <app-facility-creator-detailed-data [builder]="builder$ | async" (submitted)="detailedDataSubmitted($event)"
                                                    (back)="goBack()">
                </app-facility-creator-detailed-data>
              </div>

            </div>

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
export class FacilityCreatorPageComponent {
  items = [
    {title: 'Społeczność', link: '/community'}, {title: 'Obiekty sportowe', link: '/community/facilities'}, {title: 'Kreator'}
  ];

  stage$: Observable<number>;
  regions$: Observable<Region[]>;
  region$: Observable<Region>;
  builder$: Observable<FacilityCreationForm>;

  constructor(private store: Store<fromRoot.State>) {
    this.stage$ = this.store.pipe(select(selectStage));
    this.regions$ = this.store.pipe(select(selectRegions));
    this.region$ = this.store.pipe(select(selectSelectedRegionOrDefault));
    this.builder$ = this.store.pipe(select(selectBuilder));
  }

  onPositionSubmitted(position: Position) {
    this.store.dispatch(new PositionSelected(position));
  }

  baseDataSubmitted(builder: FacilityCreationForm) {
    this.store.dispatch(new BaseDataSubmitted(builder));
  }

  goBack() {
    this.store.dispatch(new GoToPreviousStage());
  }

  detailedDataSubmitted(builder: FacilityCreationForm) {
    this.store.dispatch(new CreateFacility(builder));
  }

}
