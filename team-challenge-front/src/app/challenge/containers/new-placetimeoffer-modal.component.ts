import {ChangeDetectionStrategy, Component, EventEmitter, Input, Output} from '@angular/core';
import {PlaceTimeOffer} from '../models/challenge';
import {Position} from '../../core/models/position';
import {Facility} from '../../core/models/facility';

import {LocalDate, LocalDateTime, nativeJs, ZonedDateTime, ZoneId, ZoneOffset} from 'js-joda';


@Component({
  selector: 'app-new-placetimeoffer-modal',
  template: `

    <button nz-button nzType="dashed" style="height: 182px; width: 200px;"
            nzSize="large" nzBlock (click)="showModal()"><i class="anticon anticon-plus"></i>
      Nowa oferta
    </button>
    <nz-modal [(nzVisible)]="isVisible" nzTitle="Nowa oferta" [nzFooter]="modalFooter" (nzOnCancel)="handleCancel()"
              (nzOnOk)="handleOk()" nzWidth="700px">

      <div nz-row nzGutter="16">

        <div nz-col [nzSm]="12">
          <div nz-row nzGutter="16">
            <div nz-col [nzSm]="6" class="label">
              Data:
            </div>
            <div nz-col [nzSm]="18" class="value">
              <nz-date-picker [nzDisabledDate]="disabledDate" style="width: 150px;" [(ngModel)]="date"></nz-date-picker>
            </div>
          </div>

          <div nz-row nzGutter="16">
            <div nz-col [nzSm]="6" class="label">
              Czas:
            </div>
            <div nz-col [nzSm]="18" class="value">
              <nz-time-picker [nzDisabledHours]="disabledHours" [nzDisabledMinutes]="disabledMinutes"
                              style="width: 150px;" [nzMinuteStep]="5" [(ngModel)]="time" nzFormat="HH:mm"></nz-time-picker>
            </div>
          </div>

          <div nz-row nzGutter="16">
            <div nz-col [nzSm]="6" class="label">
              Miejsce:
            </div>
            <div nz-col [nzSm]="18" class="value" style="line-height: normal; padding-top: 10px;">
              <app-facility *ngIf="selectedFacility !== null" [facility]="selectedFacility"></app-facility>
              <p *ngIf="selectedFacility === null">Wybierz obiekt sportowy wciskając <strong>niebieski marker</strong> na mapie.</p>
            </div>
          </div>
        </div>

        <div nz-col [nzSm]="12">
          <app-map-two-teams-facilities *ngIf="showMap" [theirHome]="theirHome"
                                        [myHome]="myHome" [facilities]="facilities" [center]="center" [height]="300"
                                        (selected)="onFacilitiySelected($event)">
          </app-map-two-teams-facilities>
        </div>

      </div>

      <ng-template #modalFooter>
        <button nz-button nzType="default" (click)="handleCancel()">Anuluj</button>
        <button nz-button nzType="primary" (click)="handleOk()" >Dodaj do puli</button>
      </ng-template>
    </nz-modal>
  `, styles: [`

    div[nz-row] {
      margin-top: 3px;
    }

    .label {
      text-align: right;
      vertical-align: middle;
      line-height: 39.9999px;
      display: inline-block;
      overflow: hidden;
      white-space: nowrap;
    }

    .value {
      text-align: left;
      vertical-align: middle;
      line-height: 39.9999px;
      display: inline-block;
    }
  `]
})
export class NewPlacetimeofferModalComponent {

  isVisible = false;
  showMap = false;

  date: Date;
  time: Date;

  selectedFacility: Facility = null;

  @Input()
  theirHome: Position;

  @Input()
  myTeamId: string;

  @Input()
  myHome: Position;

  @Input()
  facilities: Facility[];

  @Input()
  center: Position;

  @Output()
  submitted = new EventEmitter<PlaceTimeOffer>();

  constructor() {}

  showModal(): void {
    this.isVisible = true;

    setTimeout(() => {
      this.showMap = true;
    }, 100);
  }

  handleOk(): void {

    // TODO validate controlls, check if in future at least few hours etc..

    if ( this.selectedFacility !== null) {
      const placeTimeOffer: PlaceTimeOffer = {
        offeredDate: this.getDate().toString() + '+01:00',
        offeredFacility: this.selectedFacility,
        offeredFacilityId: this.selectedFacility.id,
        offeringTeamId: this.myTeamId,
        status: 0
      };

      this.submitted.emit(placeTimeOffer);
      this.isVisible = false;
    }
  }

  getDate(): LocalDateTime {
    const date = new Date(this.date);
    date.setHours(this.time.getHours());
    date.setMinutes(this.time.getMinutes());
    date.setSeconds(this.time.getSeconds());

    return LocalDateTime.from(nativeJs(date));
  }

  handleCancel(): void {
    this.isVisible = false;
  }

  onFacilitiySelected(facility: Facility) {
    this.selectedFacility = facility;
  }

  disabledDate = (current: Date) => {
    const nowPlusThree = LocalDateTime.now().plusHours(3);

    return LocalDateTime.from(nativeJs(current)).isBefore(nowPlusThree);
  }

  // disabledTime = (current: Date) => {
  //   return {
  //     nzDisabledHours: 0,
  //     nzDisabledMinutes: 0,
  //     nzDisabledSeconds: 0
  //   };
  // }

  disabledHours() {
    // TODO implement
    return [];
  }

  disabledMinutes(selectedHour) {
    // TODO implement
    return [];
  }
}

