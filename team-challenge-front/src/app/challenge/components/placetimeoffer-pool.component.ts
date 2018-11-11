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
      <div nz-row nzGutter="16">
        <div nz-col nzSm="8">
          <div class="map-container">
            <ngui-map [options]="mapOptions" [center]="" [style.height.px]="300">
              <marker *ngFor="let offer of placeTimeOffers" [position]="offer.offeredFacility.position"
                      (click)="onOfferClicked($event, offer)" [icon]="getBasketIcon()">
              </marker>
              <marker *ngIf="_myHome" [position]="getLatLngPosition(_myHome)"
                      [icon]="myHomeIcon" title="Punkt macierzysty Twojej drużyny">
              </marker>
              <marker *ngIf="theirHome" [position]="getLatLngPosition(theirHome)"
                      [icon]="theirHomeIcon" title="Punkt macierzysty drugiej drużyny">
              </marker>
            </ngui-map>
          </div>
        </div>
        <div nz-col nzSm="16">
          <div class="pool-container">
            <div class="place-time-offer" *ngFor="let offer of placeTimeOffers">
              <app-placetimeoffer [offer]="offer" (canceled)="onCanceled(offer)"></app-placetimeoffer>
            </div>
            <div class="place-time-offer">
              <ng-content></ng-content>
            </div>
          </div>
        </div>
      </div>

    </div>
  `, styles: [`

    .place-time-offer {
      display: inline-block;
      margin: 0 5px;
      float: none;
      height: 90%;
      display: inline-block;
      zoom: 1;
    }

    .pool-container {
      padding: 10px;
      border: #eeeeee 1px solid;
      height: 300px;

      white-space: nowrap;
      position: relative;
      overflow-x: scroll;
      overflow-y: hidden;
      -webkit-overflow-scrolling: touch;
    }

  `]
})
export class PlacetimeofferPoolComponent {

  @Input()
  placeTimeOffers: PlaceTimeOffer[];

  _myHome: Position;

  @Input()
  set myHome(myHome: Position) {
    this._myHome = myHome;

    this.mapOptions = {
      ...this.mapOptions,
      center: new LatLng(myHome.lat, myHome.lng)
    };
  }

  @Input()
  theirHome: Position;

  @Output()
  selected = new EventEmitter<Facility>();

  @Output()
  canceled = new EventEmitter<PlaceTimeOffer>();

  @Input()
  set center(center: Position) {
    this.mapOptions = {
      ...this.mapOptions,
      center: new LatLng(center.lat, center.lng)
    };

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

  mapOptions: MapOptions = {
    center: new LatLng(0.5, 0.5),
    streetViewControl: false,
    fullscreenControl: false,
    mapTypeControl: false,
    minZoom: 10,
    zoom: 11
  };

  onCanceled(offer: PlaceTimeOffer) {
    this.canceled.emit(offer);
  }

  getLatLngPosition(position: Position): LatLng {
    return new LatLng(position.lat, position.lng);
  }

  onOfferClicked({target: marker}, offer: PlaceTimeOffer) {
    // somehow mark picked offer
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

