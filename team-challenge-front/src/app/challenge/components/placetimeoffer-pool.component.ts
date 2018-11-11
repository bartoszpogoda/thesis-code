import {ChangeDetectionStrategy, Component, EventEmitter, Input, Output} from '@angular/core';
import {PlaceTimeOffer} from '../models/challenge';
import LatLng = google.maps.LatLng;
import MapOptions = google.maps.MapOptions;
import {Facility} from '../../core/models/facility';
import {Position} from '../../core/models/position';

@Component({
  selector: 'app-placetimeoffer-pool',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="offer-pool-container">
      <h2>Negocjacje</h2>
      <div class="map-container">
        <ngui-map [options]="mapOptions" (mapClick)="onMapClick($event)" [center]="" [style.height.px]="200">
          <!--<ng-container *ngIf="facilities">-->
            <!--<marker *ngFor="let facility of facilities" [position]="facility.position"-->
                    <!--(click)="onMarkerClicked($event, facility)" [icon]="getBasketIcon()">-->
            <!--</marker>-->
            <!--<marker *ngIf="myHome" [position]="getLatLngPosition(myHome)"-->
                    <!--[icon]="myHomeIcon" title="Punkt macierzysty Twojej drużyny">-->
            <!--</marker>-->
            <!--<marker *ngIf="theirHome" [position]="getLatLngPosition(theirHome)"-->
                    <!--[icon]="theirHomeIcon" title="Punkt macierzysty drugiej drużyny">-->
            <!--</marker>-->
          <!--</ng-container>-->
        </ngui-map>
      </div>

    </div>
  `, styles: [`

  `]
})
export class PlacetimeofferPoolComponent {

  @Input()
  placeTimeOffers: PlaceTimeOffer[];

  @Input()
  myHome: Position;

  @Input()
  theirHome: Position;

  @Output()
  selected = new EventEmitter<Facility>();

  @Input()
  set center(center: Position) {
    this.mapOptions = {
      ...this.mapOptions,
      center: new LatLng(center.lat, center.lng)
    };

    this.currentPosition = new LatLng(center.lat, center.lng);
  }

  myHomeIcon = {
    url: '/assets/images/home_spot.png',
    anchor: [13, 43],
    size: [27, 43],
    scaledSize: [27, 43]
  };

  theirHomeIcon = {
    url: '/assets/images/their_home_spot.png',
    anchor: [13, 43],
    size: [27, 43],
    scaledSize: [27, 43]
  };

  currentPosition: LatLng = new LatLng(0.5, 0.5);

  mapOptions: MapOptions = {
    center: new LatLng(0.5, 0.5),
    streetViewControl: false,
    fullscreenControl: false,
    mapTypeControl: false,
    minZoom: 10,
    zoom: 11
  };

  onMapClick(ev) {
    this.currentPosition = ev.latLng;
  }

  getLatLngPosition(position: Position): LatLng {
    return new LatLng(position.lat, position.lng);
  }

  onMarkerClicked({target: marker}, facility) {
    this.selected.emit(facility);
    // this.selectedFacility = facility;
    // marker.nguiMapComponent.openInfoWindow('iw', marker);
  }

  getBasketIcon() {
    return {
      url: '/assets/images/basket_spot.png',
      anchor: [13, 43],
      size: [27, 43],
      scaledSize: [27, 43]
    };
  }

}

