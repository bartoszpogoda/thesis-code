import {ChangeDetectionStrategy, Component, EventEmitter, Input, Output} from '@angular/core';
import MapOptions = google.maps.MapOptions;
import LatLng = google.maps.LatLng;
import {Position} from '../../core/models/position';
import {Facility} from '../../core/models/facility';

@Component({
  selector: 'app-map-two-teams-facilities',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="point-picker map-container">
      <ngui-map [options]="mapOptions" (mapClick)="onMapClick($event)" [center]="" [style.height.px]="height">
        <ng-container *ngIf="facilities">
          <marker *ngFor="let facility of facilities" [position]="facility.position"
                  (click)="onMarkerClicked($event, facility)" [icon]="getBasketIcon()">
          </marker>
          <marker *ngIf="myHome" [position]="getLatLngPosition(myHome)"
                  [icon]="myHomeIcon" title="Punkt macierzysty Twojej drużyny">
          </marker>
          <marker *ngIf="theirHome" [position]="getLatLngPosition(theirHome)"
                  [icon]="theirHomeIcon" title="Punkt macierzysty drugiej drużyny">
          </marker>
          <!--<info-window id="iw">-->
            <!--<h3>{{selectedFacility?.name}}</h3>-->
            <!--<p>Adres: {{selectedFacility?.address}}<br />-->
              <!--Miejsc do gry: {{selectedFacility?.playingSpots}}</p>-->
            <!--&lt;!&ndash;<a (click)="onFacilityShowDetails(selectedFacility)">Pokaż szczegóły</a>&ndash;&gt;-->
          <!--</info-window>-->
        </ng-container>
      </ngui-map>
    </div>

  `
})
export class MapTwoTeamsFacilitiesComponent {

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

  @Input()
  facilities: Facility[];

  @Input()
  myHome: Position;

  @Input()
  theirHome: Position;

  @Input()
  height = 200;

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

  selectedFacility: Facility;

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
