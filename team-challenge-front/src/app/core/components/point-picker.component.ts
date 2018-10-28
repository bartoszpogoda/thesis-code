import {ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Player} from '../models/player';
import { ViewChild } from '@angular/core';
import MapOptions = google.maps.MapOptions;
import LatLng = google.maps.LatLng;
import {Position} from '../models/position';

@Component({
  selector: 'app-point-picker',
  template: `
    <!--<div #gmap style="width:100%;height:400px"></div>-->
    <div class="point-picker map-container">
      <ngui-map [options]="mapOptions" (mapClick)="onMapClick($event)">
        <marker *ngIf="currentPosition" [position]="currentPosition"></marker>
      </ngui-map>
    </div>

    <button style="margin: 10px 4px;" *ngIf="skipButtonText" nz-button (click)="onSkipped()">{{skipButtonText}}</button>
    <button style="margin: 10px 4px;" nz-button nzType="primary" (click)="onAccepted()">{{acceptButtonText}}</button>
  `
})
export class PointPickerComponent {

  @Input()
  center: LatLng = new LatLng(51.110736, 17.033733);

  @Input()
  acceptButtonText: String = 'Wybierz';

  @Input()
  skipButtonText: String;

  @Output()
  accepted = new EventEmitter<Position>();

  @Output()
  skipped = new EventEmitter();

  currentPosition: LatLng = this.center;

  mapOptions: MapOptions = {
    center: this.center,
    streetViewControl: false
  };

  onMapClick(ev) {
    this.currentPosition = ev.latLng;
  }

  onAccepted() {
    this.accepted.emit({
      lat: this.currentPosition.lat(),
      lng: this.currentPosition.lng()
    });
  }

  onSkipped() {
    this.skipped.emit();
  }
}
