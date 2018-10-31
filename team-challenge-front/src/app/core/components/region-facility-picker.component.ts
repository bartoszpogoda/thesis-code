import {ChangeDetectionStrategy, Component, EventEmitter, Input, Output} from '@angular/core';
import {Position} from '../models/position';
import {Facility} from '../models/facility';
import MapOptions = google.maps.MapOptions;
import LatLng = google.maps.LatLng;

@Component({
  selector: 'app-region-facility-picker',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="point-picker map-container">
      <ngui-map [options]="mapOptions" (mapClick)="onMapClick($event)" [center]="" [style.height.px]="height">
        <ng-container *ngIf="facilities">
          <marker *ngFor="let facility of facilities" [position]="facility.position"
                  (click)="onMarkerClicked($event, facility)" [icon]="getBasketIcon()">
          </marker>
          <marker *ngIf="home" [position]="getLatLngPosition(home)"
                  [icon]="homeIcon" title="Punkt macierzysty Twojej drużyny">
          </marker>
          <info-window id="iw">
            {{selectedFacility?.name}}
            <a (click)="onFacilityShowDetails(selectedFacility)">Szczegóły</a>
          </info-window>
        </ng-container>
      </ngui-map>
    </div>

  `
})
export class RegionFacilityPickerComponent {

  homeIcon = {
    url: '/assets/images/home_spot.png',
    anchor: [13, 43],
    size: [27, 43],
    scaledSize: [27, 43]
  };

  @Input()
  facilities: Facility[];

  @Input()
  height = 200;

  @Input()
  home: Position | null;

  @Output()
  picked =  new EventEmitter<Facility>();

  selectedFacility: Facility;


  @Input()
  set center(center: Position) {
    this.mapOptions = {
      ...this.mapOptions,
      center: new LatLng(center.lat, center.lng)
    };

    this.currentPosition = new LatLng(center.lat, center.lng);
  }

  @Output()
  clicked = new EventEmitter<Facility>();

  currentPosition: LatLng = new LatLng(0.5, 0.5);

  mapOptions: MapOptions = {
    center: new LatLng(0.5, 0.5),
    streetViewControl: false,

  };

  onMapClick(ev) {
    this.currentPosition = ev.latLng;
  }

  getLatLngPosition(position: Position): LatLng {
    return new LatLng(position.lat, position.lng);
  }

  onMarkerClicked({target: marker}, facility) {
    this.selectedFacility = facility;
    marker.nguiMapComponent.openInfoWindow('iw', marker);
  }

  onFacilityShowDetails(selectedFacility: Facility) {
    this.picked.emit((selectedFacility));
  }

  getBasketIcon() {
    console.log('xd');
    return {
      url: '/assets/images/basket_spot.png',
      anchor: [13, 43],
      size: [27, 43],
      scaledSize: [27, 43]
    };
  }
}
