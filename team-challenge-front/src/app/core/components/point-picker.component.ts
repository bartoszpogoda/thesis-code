import {ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output, ViewRef} from '@angular/core';
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
      <ngui-map [options]="mapOptions" (mapClick)="onMapClick($event)" [center]="">
        <marker *ngIf="currentPosition" [position]="currentPosition"></marker>
      </ngui-map>
    </div>

    <button style="margin: 10px 4px;" *ngIf="skipButtonText" nz-button (click)="onSkipped()">{{skipButtonText}}</button>
    <button style="margin: 10px 4px;" nz-button nzType="primary" (click)="onAccepted()">{{acceptButtonText}}</button>
  `
})
export class PointPickerComponent {

  @Input()
  set center(center: Position) {
    this.mapOptions = {
      center: new LatLng(center.lat, center.lng)
    };

    this.currentPosition = new LatLng(center.lat, center.lng);
  }

  @Input()
  acceptButtonText: String = 'Wybierz';

  @Input()
  skipButtonText: String;

  @Output()
  accepted = new EventEmitter<Position>();

  @Output()
  skipped = new EventEmitter();

  currentPosition: LatLng = new LatLng(0.5, 0.5);

  mapOptions: MapOptions = {
    center: new LatLng(0.5, 0.5),
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
