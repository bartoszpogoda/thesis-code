import {ChangeDetectionStrategy, Component, EventEmitter, Input, Output, ViewRef} from '@angular/core';
import {PlaceTimeOffer} from '../models/challenge';


import {LocalDateTime, ZonedDateTime} from 'js-joda';
import {months} from './my-place-time-offer.component';
import {Facility} from '../../core/models/facility';

@Component({
  selector: 'app-their-placetimeoffer',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="offer-card" [class.highlighted]="highlightedFacility && (_offer.offeredFacilityId === highlightedFacility.id)"
         [class.innactive]="_offer.status === 2 || _offer.status === 3">
      <div class="status">
        <nz-tag *ngIf="_offer.status === 0" [nzColor]="'gold'">Otrzymana oferta</nz-tag>
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
      <div class="actions">
        <nz-button-group>
          <button (click)="this.rejected.emit()" *ngIf="_offer.status === 0" nz-button nzType="default">Odrzuć</button>
          <button (click)="this.accepted.emit()" *ngIf="_offer.status === 0" nz-button nzType="primary">Przyjmij</button>
        </nz-button-group>

      </div>
    </div>

  `
})
export class TheirPlaceTimeOfferComponent {

  _offer: PlaceTimeOffer;
  timeLDT: ZonedDateTime;

  @Input()
  set offer(offer: PlaceTimeOffer) {
    this._offer = offer;
    this.timeLDT = ZonedDateTime.parse(offer.offeredDate);
  }

  @Input()
  highlightedFacility: Facility;

  @Output()
  accepted = new EventEmitter();

  @Output()
  rejected = new EventEmitter();

  getDate() {
    return '' + this.timeLDT.dayOfMonth() + ' ' + months[this.timeLDT.month().value()] + ' ' + this.timeLDT.year();
  }

  getTime() {
    return '' + this.timeLDT.hour() + ':' + (this.timeLDT.minute() >= 10 ? this.timeLDT.minute() : '0' + this.timeLDT.minute());
  }


}

