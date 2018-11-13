import {Component, OnDestroy, OnInit} from '@angular/core';
import {select, Store} from '@ngrx/store';
import * as fromRoot from '../reducers/index';
import {combineLatest, Observable, Subject, Subscription} from 'rxjs';
import {Challenge, ChallengeStatus, PlaceTimeOffer} from '../models/challenge';
import {
  selectChallenge, selectChallengeStatus,
  selectMyActiveChallenges,
  selectMyTeamOffers,
  selectPlaceTimeOffers,
  selectTheirHome, selectTheirTeamOffers
} from '../selectors/my-challenges.selectors';
import {Facility} from '../../core/models/facility';
import * as fromCommunity from '../../community/reducers';
import {ActivatedRoute} from '@angular/router';
import {selectCurrentFacility} from '../../community/reducers';
import {filter, takeUntil, tap, withLatestFrom} from 'rxjs/operators';
import {LoadFacility} from '../../community/actions/community-facilities.actions';
import {
  AcceptPlaceTimeOffer,
  AddPlaceTimeOffer,
  CancelPlaceTimeOffer,
  LoadChallenge,
  LoadPlaceTimeOffers,
  LoadTheirHome, RejectPlaceTimeOffer
} from '../actions/my-challenges.actions';
import {Team} from '../../core/models/team';
import {selectMyTeam, selectMyTeamHome, selectMyTeamRegion} from '../../core/selectors/my-team.selectors';
import {Position} from '../../core/models/position';
import {Region} from '../../core/models/region';
import {selectFacilities} from '../reducers/index';

@Component({
  selector: 'app-my-challenge-page',
  template: `
    <div class="spaces-sides">
      <app-breadcrumb [items]="items"></app-breadcrumb>
      <div class="content-container">
        <h1>&zwnj; {{(challenge$ | async)?.challengingTeam?.name}} - {{(challenge$ | async)?.challengedTeam?.name}}</h1>

        <div class="block">
          <div nz-row style="text-align: center;">
            <div nz-col nzSm="5"></div>
            <div nz-col nzSm="6"><p>Drużyna gospodarzy</p></div>
            <div nz-col nzSm="2"></div>
            <div nz-col nzSm="6"><p>Drużyna gości</p></div>
            <div nz-col nzSm="5"></div>
          </div>
          <div nz-row style="text-align: center;">
            <div nz-col nzSm="5"></div>
            <div nz-col nzSm="6"><h2>&zwnj; {{(challenge$ | async)?.challengingTeam?.name}}</h2></div>
            <div nz-col nzSm="2"> vs. </div>
            <div nz-col nzSm="6"><h2>&zwnj; {{(challenge$ | async)?.challengedTeam?.name}}</h2></div>
            <div nz-col nzSm="5"></div>
          </div>
          <div nz-row style="text-align: center;" nzGutter="16">
            <div nz-col nzSm="5"></div>
            <div nz-col nzSm="1"><img src="/assets/images/home/avatar.png"></div>
            <div nz-col nzSm="1"><img src="/assets/images/home/avatar.png"></div>
            <div nz-col nzSm="1"><img src="/assets/images/home/avatar.png"></div>
            <div nz-col nzSm="1"><img src="/assets/images/home/avatar.png"></div>
            <div nz-col nzSm="2"><img src="/assets/images/home/avatar.png"></div>
            <div nz-col nzSm="2"></div>
            <div nz-col nzSm="2"><img src="/assets/images/home/avatar.png"></div>
            <div nz-col nzSm="1"><img src="/assets/images/home/avatar.png"></div>
            <div nz-col nzSm="1"><img src="/assets/images/home/avatar.png"></div>
            <div nz-col nzSm="1"><img src="/assets/images/home/avatar.png"></div>
            <div nz-col nzSm="1"><img src="/assets/images/home/avatar.png"></div>
            <div nz-col nzSm="5"></div>
          </div>
        </div>

        <nz-collapse>
          <nz-collapse-panel [nzHeader]="placeTimeHeader" [nzActive]="(challengeStatus$ | async) == 0">
            <h2>Negocjacje terminu oraz miejsca spotkania</h2>
            <ng-container *ngIf="(myHome$ | async)">
              <app-placetimeoffer-pool [theirTeamOffers]="theirTeamOffers$ | async" [myTeamOffers]="myTeamOffers$ | async"
                                       [myHome]="myHome$ | async" [theirHome]="theirHome$ | async"
                                       (canceled)="onCancelled($event)" (accepted)="onAccepted($event)" (rejected)="onRejected($event)">

                <app-new-placetimeoffer-modal *ngIf="(challengeStatus$ | async) == 0" [center]="(region$ | async)?.center"
                                              [myHome]="myHome$ | async" [theirHome]="theirHome$ | async"
                                              [facilities]="facilities$ | async" (submitted)="newOfferSubmitted($event)">
                </app-new-placetimeoffer-modal>

              </app-placetimeoffer-pool>
            </ng-container>
          </nz-collapse-panel>
        </nz-collapse>
        
        <ng-template #placeTimeHeader>
          Termin oraz miejsce spotkania
          <nz-tag *ngIf="(challengeStatus$ | async) == 0" [nzColor]="'orange'">Negocjacje w toku</nz-tag>
        </ng-template>

        

      </div>
    </div>
  `, styles: [`
    
    img {
      max-height: 100%;
      max-width: 100%;
    }
  `]
})
export class MyChallengePageComponent implements OnInit, OnDestroy {
  items = [
    {title: 'Wyzwania', link: '/challenges'}, {title: ' '}
  ];


  challenge$: Observable<Challenge>;
  facilities$: Observable<Facility[]>;
  placeTimeOffers$: Observable<PlaceTimeOffer[]>;
  myTeam$: Observable<Team>;
  myHome$: Observable<Position>;
  region$: Observable<Region>;
  theirHome$: Observable<Position>;
  challengeStatus$: Observable<ChallengeStatus>;

  myTeamOffers$: Observable<PlaceTimeOffer[]>;
  theirTeamOffers$: Observable<PlaceTimeOffer[]>;

  unsubscribe$ = new Subject();

  constructor(private store: Store<fromCommunity.State>, private route: ActivatedRoute) {
    this.challenge$ = this.store.pipe(select(selectChallenge));
    this.placeTimeOffers$ = this.store.pipe(select(selectPlaceTimeOffers));
    this.myTeam$ = this.store.pipe(select(selectMyTeam));
    this.region$ = this.store.pipe(select(selectMyTeamRegion));
    this.myHome$ = this.store.pipe(select(selectMyTeamHome));
    this.theirHome$ = this.store.pipe(select(selectTheirHome));
    this.facilities$ = this.store.pipe(select(selectFacilities));

    this.myTeamOffers$ = this.store.pipe(select(selectMyTeamOffers));
    this.theirTeamOffers$ = this.store.pipe(select(selectTheirTeamOffers));
    this.challengeStatus$ = this.store.pipe(select(selectChallengeStatus));

    combineLatest(this.challenge$, this.myTeam$).pipe(
      takeUntil(this.unsubscribe$),
    ).subscribe(([challenge, myTeam]) => {
      if (challenge !== null && myTeam !== null) {

        this.store.dispatch(new LoadTheirHome(this.getOtherTeam(challenge, myTeam).id));

        this.items = [{title: 'Wyzwania', link: '/challenges'}, {title: this.getOtherTeam(challenge, myTeam).name}];
      } else {
        this.items = [{title: 'Wyzwania', link: '/challenges'}, {title: ' '}];
      }
    });

  }

  ngOnInit() {
    this.route.params.pipe(takeUntil(this.unsubscribe$)).subscribe(params => {
      this.store.dispatch(new LoadChallenge(params['id']));
      this.store.dispatch(new LoadPlaceTimeOffers(params['id']));
    });
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  getOtherTeam(challenge: Challenge, myTeam: Team) {
    return this.isMyTeamChallenged(challenge, myTeam) ? challenge.challengingTeam : challenge.challengedTeam;
  }

  isMyTeamChallenged(challenge: Challenge, myTeam: Team) {
    return challenge.challengedTeamId === myTeam.id;
  }

  onCancelled(offer: PlaceTimeOffer) {
    this.store.dispatch(new CancelPlaceTimeOffer(offer.id));
  }

  onAccepted(offer: PlaceTimeOffer) {
    this.store.dispatch(new AcceptPlaceTimeOffer(offer.id));
  }

  onRejected(offer: PlaceTimeOffer) {
    this.store.dispatch(new RejectPlaceTimeOffer(offer.id));
  }

  newOfferSubmitted(offer: PlaceTimeOffer) {
    this.store.dispatch(new AddPlaceTimeOffer(offer));
  }

}
