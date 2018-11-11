import {ChangeDetectionStrategy, Component, EventEmitter, Input, Output} from '@angular/core';
import {PlaceTimeOffer} from '../models/challenge';
import {Position} from '../../core/models/position';
import {Facility} from '../../core/models/facility';

@Component({
  selector: 'app-new-placetimeoffer-modal',
  template: `
    <button nz-button [nzType]="'primary'" (click)="showModal()"><span>Nowa oferta</span></button>
    <nz-modal [(nzVisible)]="isVisible" nzTitle="Dodaj propozycje" (nzOnCancel)="handleCancel()" (nzOnOk)="handleOk()" nzWidth="700px">
      <h2>Wybierz miejsce</h2>

      <div nz-row>
        <div nz-col [nzSm]="12">
          <app-map-two-teams-facilities *ngIf="showMap" [theirHome]="theirHome"
            [myHome]="myHome" [facilities]="facilities" [center]="center" [height]="200"
             (selected)="onFacilitiySelected($event)">
          </app-map-two-teams-facilities></div>
        <div nz-col [nzSm]="12"><pre>{{selectedFacility  | json}}</pre></div>
      </div>

     <h2>Wybierz termin</h2>
      <nz-date-picker [(ngModel)]="date"></nz-date-picker>
      <nz-time-picker [(ngModel)]="time" nzFormat="HH:mm"></nz-time-picker>

    </nz-modal>
  `
})
export class NewPlacetimeofferModalComponent {

  isVisible = false;
  showMap = false;

  date: string;
  time: string;

  selectedFacility: Facility;

  @Input()
  theirHome: Position;

  @Input()
  myHome: Position;

  @Input()
  facilities: Facility[];

  @Input()
  center: Position;

  constructor() {}

  showModal(): void {
    this.isVisible = true;

    setTimeout(() => {
      this.showMap = true;
    }, 100);
  }

  handleOk(): void {
    console.log('Button ok clicked!');
    this.isVisible = false;
  }

  handleCancel(): void {
    console.log('Button cancel clicked!');
    this.isVisible = false;
  }

  onFacilitiySelected(facility: Facility) {
    this.selectedFacility = facility;
  }
}

