import {ChangeDetectionStrategy, Component, EventEmitter, Input, Output, ViewRef} from '@angular/core';
import {PlaceTimeOffer, PlaceTimeOfferStatus} from '../models/challenge';


import {LocalDateTime, ZonedDateTime} from 'js-joda';
import {Facility} from '../../core/models/facility';

// export enum PlaceTimeOfferStatus {
//   Pending,
//   Accepted,
//   Rejected,
//   Cancelled
// }

@Component({
  selector: 'app-my-placetimeoffer',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="offer-card" [class.highlighted]="highlightedFacility && (_offer.offeredFacilityId === highlightedFacility.id)"
         [class.innactive]="_offer.status === 2 || _offer.status === 3" >
      <div class="status">
        <nz-tag *ngIf="_offer.status === 0" [nzColor]="'gold'">Zaoferowano</nz-tag>
        <nz-tag *ngIf="_offer.status === 1" [nzColor]="'green'">Zaakceptowana</nz-tag>
        <nz-tag *ngIf="_offer.status === 2" [nzColor]="'red'">Odrzucona</nz-tag>
        <nz-tag *ngIf="_offer.status === 3" [nzColor]="'#a9a9a9'">Anulowana</nz-tag>
      </div>
      <div class="place">
        {{_offer.offeredFacility.name}}
      </div>
      <p style="margin-top: 5px;">
        <strong>Adres: </strong>{{_offer.offeredFacility.address}}<br />
        <strong>Data: </strong>{{getDate()}}<br />
        <strong>Czas: </strong>{{getTime()}}
      </p>
      <div class="actions" *ngIf="isManager">
        <button (click)="this.canceled.emit()" *ngIf="_offer.status === 0" nz-button nzType="default">Anuluj</button>
      </div>
    </div>

  `
})
export class MyPlaceTimeOfferComponent {

  _offer: PlaceTimeOffer;
  timeLDT: ZonedDateTime;

  @Input()
  highlightedFacility: Facility;

  @Input()
  set offer(offer: PlaceTimeOffer) {
    this._offer = offer;
    this.timeLDT = ZonedDateTime.parse(offer.offeredDate);
  }

  @Input()
  isManager: boolean;

  @Output()
  canceled = new EventEmitter();

  getDate() {
    return '' + this.timeLDT.dayOfMonth() + ' ' + months[this.timeLDT.month().value()] + ' ' + this.timeLDT.year();
  }

  getTime() {
    return '' + this.timeLDT.hour() + ':' + (this.timeLDT.minute() >= 10 ? this.timeLDT.minute() : '0' + this.timeLDT.minute());
  }


}

export const months = [
  '', 'Stycznia', 'Lutego', 'Marca', 'Kwietnia',
  'Maja', 'Czerwca', 'Lipca', 'Sierpnia',
  'Września', 'Października', 'Listopada', 'Grudnia'
];
