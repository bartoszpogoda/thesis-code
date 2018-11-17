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

      <div class="block">
        <div nz-row nzGutter="16">

          <div nz-col nzSm="16">
            <div class="block">
              <h2>Wasze oferty</h2>
              <div nz-row nzGutter="16">
                <div nz-col nzSm="24">
                  <div class="pool-container">
                    <div class="place-time-offer" *ngFor="let offer of myTeamOffers">
                      <app-my-placetimeoffer [offer]="offer" (canceled)="onCanceled(offer)" [highlightedFacility]="selectedFacility">
                      </app-my-placetimeoffer>
                    </div>
                    <div class="place-time-offer">
                      <ng-content></ng-content>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div class="block">
              <h2>Oferty rywali</h2>
              <div nz-row nzGutter="16">
                <div nz-col nzSm="24">
                  <div class="pool-container">
                    <div class="place-time-offer" *ngFor="let offer of theirTeamOffers">
                      <app-their-placetimeoffer [offer]="offer" (accepted)="onAccepted(offer)" (rejected)="onRejected(offer)"
                                                [highlightedFacility]="selectedFacility">
                      </app-their-placetimeoffer>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div nz-col nzSm="8">
            <div class="map-container">
              <ngui-map [options]="mapOptions" [center]="" [style.height.px]="500" (mapClick)="onMapClick()">
                <marker *ngFor="let offer of getOngoingOffers()" [position]="offer.offeredFacility.position"
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
        </div>
      </div>

      


    </div>
  `
})
export class PlacetimeofferPoolComponent {

  @Input()
  myTeamOffers: PlaceTimeOffer[];

  @Input()
  theirTeamOffers: PlaceTimeOffer[];

  _myHome: Position;

  selectedFacility: Facility;

  @Input()
  set myHome(myHome: Position) {
    this._myHome = myHome;

    if (this._myHome !== null) {
      this.mapOptions = {
        ...this.mapOptions,
        center: new LatLng(myHome.lat, myHome.lng)
      };
    }
  }

  @Input()
  theirHome: Position;

  @Output()
  selected = new EventEmitter<Facility>();

  @Output()
  canceled = new EventEmitter<PlaceTimeOffer>();

  @Output()
  rejected = new EventEmitter<PlaceTimeOffer>();

  @Output()
  accepted = new EventEmitter<PlaceTimeOffer>();

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

  onAccepted(offer: PlaceTimeOffer) {
    this.accepted.emit(offer);
  }

  onRejected(offer: PlaceTimeOffer) {
    this.rejected.emit(offer);
  }

  getLatLngPosition(position: Position): LatLng {
    return new LatLng(position.lat, position.lng);
  }

  onOfferClicked({target: marker}, offer: PlaceTimeOffer) {
    this.selectedFacility = offer.offeredFacility;
  }

  onMapClick() {
    this.selectedFacility = null;
  }

  getOngoingOffers() {
    return this.myTeamOffers.filter(this.filterActive).concat(this.theirTeamOffers.filter(this.filterActive));
  }

  filterActive = (offer: PlaceTimeOffer) => offer.status === 0 || offer.status === 1;

  getBasketIcon() {
    return {
      url: '/assets/images/basket_spot.png',
      anchor: [13, 43],
      size: [27, 43],
      scaledSize: [27, 43]
    };
  }

}

