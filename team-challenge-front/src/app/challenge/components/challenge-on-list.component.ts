import {ChangeDetectionStrategy, Component, EventEmitter, Input, Output} from '@angular/core';
import {Team} from '../../core/models/team';
import {Challenge, PlaceTimeOffer, PlaceTimeOfferStatus} from '../models/challenge';
import {LocalDateTime, ZonedDateTime} from 'js-joda';
import {months} from './my-place-time-offer.component';


@Component({
  selector: 'app-challenge-on-list',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div *ngIf="myTeam && challenge && placeTimeOffers"
         nz-row style="padding-top: 18px; padding-bottom: 18px; cursor: pointer;" (click)="this.clicked.emit()" nzGutter="16">
      <div nz-col nzXs="0" nzSm="2" class="container-vert-center" style="text-align: center; ">
        <i class="anticon anticon-trophy" style="font-size: 1.4em;" ></i>
      </div>
      <div nz-col nzXs="0" nzSm="4" class="container-vert-center">
        <h3 style="margin: 0;">{{getOtherTeamName()}}</h3>
      </div>
      <div nz-col nzXs="0" nzSm="4" class="container-vert-center">
        <h3 style="margin: 0;">{{getOtherTeamManagerName()}}</h3>
      </div>
      <div nz-col nzXs="0" nzSm="4" class="container-vert-center">
        <nz-tag [nzColor]="colors[challenge.status]">{{statuses[challenge.status]}}</nz-tag>
        <nz-tag *ngIf="awaitsReaction()" [nzColor]="'gold'">Aktywne oferty od rywali</nz-tag>
      </div>
      <div nz-col nzXs="0" nzSm="5" class="container-vert-center">
        <p *ngIf="getAcceptedPlace() !== null" style="margin: 0;">{{getAcceptedPlace()}}</p>
        <p *ngIf="getAcceptedPlace() == null" style="margin: 0;">Nie ustalono</p>
      </div>
      <div nz-col nzXs="0" nzSm="3" class="container-vert-center">
        <p *ngIf="getAcceptedDate() !== null" style="margin: 0;">{{getAcceptedDate()}}</p>
        <p *ngIf="getAcceptedDate() == null" style="margin: 0;">Nie ustalono</p>
      </div>
      <div nz-col nzXs="0" nzSm="2" class="container-vert-center"> </div>
    </div>
  `
})
export class ChallengeOnListComponent {

  @Input()
  challenge: Challenge;

  @Input()
  placeTimeOffers: PlaceTimeOffer[];

  @Input()
  myTeam: Team;

  @Output()
  clicked = new EventEmitter();

  colors = [
    'orange',
    'green',
    'red',
    'purple',
    'blue'
  ];

  statuses = [
    'W trakcie negocjacji',
    'Zaakceptowane',
    'Odrzucone',
    'Anulowane',
    'Zakończone'
  ];

  getOtherTeamName() {
    return this.isMyTeamChallenged() ? this.challenge.challengingTeam.name : this.challenge.challengedTeam.name;
  }

  getOtherTeamManagerName() {
    return this.isMyTeamChallenged() ? this.challenge.challengingTeam.managerName : this.challenge.challengedTeam.managerName;
  }

  isMyTeamChallenged() {
    return this.challenge.challengedTeamId === this.myTeam.id;
  }

  awaitsReaction() {
    return this.placeTimeOffers.filter(offer => this.isTheirOffer(offer))
      .filter(offer => offer.status === PlaceTimeOfferStatus.Pending).length > 0;
  }

  isTheirOffer(offer: PlaceTimeOffer) {
    return offer.offeringTeamId !== this.myTeam.id;
  }

  getAcceptedDate(): string {
    const acceptedOffers = this.placeTimeOffers.filter(offer => offer.status === PlaceTimeOfferStatus.Accepted);
    const acceptedOffer = acceptedOffers.length > 0 ? acceptedOffers[0] : null;

    if (acceptedOffer) {
      const zdt = ZonedDateTime.parse(acceptedOffer.offeredDate);
      return this.getDate(zdt) + ' ' + this.getTime(zdt);
    } else {
      return null;
    }
  }

  getAcceptedPlace() {
    const acceptedOffers = this.placeTimeOffers.filter(offer => offer.status === PlaceTimeOfferStatus.Accepted);
    const acceptedOffer = acceptedOffers.length > 0 ? acceptedOffers[0] : null;

    if (acceptedOffer) {
      return acceptedOffer.offeredFacility.name;
    } else {
      return null;
    }
  }

  getDate(zdt: ZonedDateTime) {
    return '' + zdt.dayOfMonth() + ' ' + months[zdt.month().value()] + ' ' + zdt.year();
  }

  getTime(zdt: ZonedDateTime) {
    return '' + zdt.hour() + ':' + (zdt.minute() >= 10 ? zdt.minute() : '0' + zdt.minute());
  }

}
