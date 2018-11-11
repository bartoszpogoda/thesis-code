import {ChangeDetectionStrategy, Component, EventEmitter, Input, Output} from '@angular/core';
import {PlaceTimeOffer} from '../models/challenge';


import {LocalDateTime} from 'js-joda';

@Component({
  selector: 'app-placetimeoffer',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
      <nz-card style="width:200px;" [nzActions]="[actionCancel]">
        <nz-card-meta [nzTitle]="_offer.offeredFacility.name" [nzDescription]="_offer.offeredFacility.address" ></nz-card-meta>
        <p>
          <strong>Data: </strong>{{getDate()}}<br />
          <strong>Czas: </strong>{{getTime()}}
        </p>
      </nz-card>
      <ng-template #actionCancel>
        <i (click)="canceled.emit()" class="anticon anticon-close"></i>
      </ng-template>
  `, styles: [`
  `]
})
export class PlacetimeofferComponent {

  _offer: PlaceTimeOffer;
  timeLDT: LocalDateTime;

  @Input()
  set offer(offer: PlaceTimeOffer) {
    this._offer = offer;
    this.timeLDT = LocalDateTime.parse(offer.offeredDate);
  }

  @Output()
  canceled = new EventEmitter();

  months = [
    '', 'Styczeń', 'Luty', 'Marzec', 'Kwiecień',
    'Maj', 'Czerwiec', 'Lipiec', 'Sierpień',
    'Wrzesień', 'Październik', 'Listopad', 'Grudzień'
  ];

  getDate() {
    return '' + this.timeLDT.dayOfMonth() + ' ' + this.months[this.timeLDT.month().value()] + ' ' + this.timeLDT.year();
  }

  getTime() {
    return '' + this.timeLDT.hour() + ':' + (this.timeLDT.minute() >= 10 ? this.timeLDT.minute() : '0' + this.timeLDT.minute());
  }


}

