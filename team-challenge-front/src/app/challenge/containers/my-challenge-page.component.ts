import {Component, OnDestroy, OnInit} from '@angular/core';
import {select, Store} from '@ngrx/store';
import * as fromRoot from '../reducers/index';
import {combineLatest, Observable, Subject, Subscription} from 'rxjs';
import {Challenge, ChallengeStatus, PlaceTimeOffer, PlaceTimeOfferStatus} from '../models/challenge';
import {
  selectChallenge,
  selectChallengedTeamPlayers, selectChallengePlaceName,
  selectChallengeStatus, selectChallengeTime,
  selectChallengingTeamPlayers,
  selectIsChallengeCancellable,
  selectIsChallengeRejectable,
  selectMyActiveChallenges,
  selectMyTeamOffers,
  selectPlaceTimeOffers,
  selectTheirHome,
  selectTheirTeamOffers
} from '../selectors/my-challenges.selectors';
import {Facility} from '../../core/models/facility';
import * as fromCommunity from '../../community/reducers';
import {ActivatedRoute} from '@angular/router';
import {selectCurrentFacility} from '../../community/reducers';
import {filter, take, takeUntil, tap, withLatestFrom} from 'rxjs/operators';
import {LoadFacility} from '../../community/actions/community-facilities.actions';
import {
  AcceptPlaceTimeOffer,
  AddPlaceTimeOffer, CancelChallenge,
  CancelPlaceTimeOffer,
  LoadChallenge,
  LoadPlaceTimeOffers,
  LoadTheirHome, LoadTheirPlayers, RejectChallenge, RejectPlaceTimeOffer
} from '../actions/my-challenges.actions';
import {Team} from '../../core/models/team';
import {selectMyTeam, selectMyTeamHome, selectMyTeamRegion} from '../../core/selectors/my-team.selectors';
import {Position} from '../../core/models/position';
import {Region} from '../../core/models/region';
import {selectFacilities} from '../reducers/index';
import {Player} from '../../core/models/player';

@Component({
  selector: 'app-my-challenge-page',
  template: `
    <div class="spaces-sides">
      <app-breadcrumb [items]="items"></app-breadcrumb>
      <div class="content-container">
        <nz-affix [nzOffsetTop]="117">
        <ul nz-menu [nzMode]="'horizontal'" style="margin-bottom: 25px;">
          <li nz-menu-item (click)="onGeneralTabClicked()" [nzSelected]="true"><i class="anticon anticon-trophy"></i> Ogólne informacje</li>
          <li nz-menu-item (click)="onPlayersTabClicked()"><i class="anticon anticon-team"></i> Zawodnicy</li>
          <li nz-menu-item  (click)="onChatTabClicked()"><i class="anticon anticon-message"></i> Czat</li>
           <li nz-menu-item (click)="onNegotiationsTabClicked()"><i class="anticon anticon-schedule"></i> Negocjacje <nz-tag *ngIf="(challengeStatus$ | async) == 0" [nzColor]="'orange'">W toku</nz-tag></li>
        </ul>
        </nz-affix>

        <h1>&zwnj; {{(challenge$ | async)?.challengingTeam?.name}} - {{(challenge$ | async)?.challengedTeam?.name}}</h1>


        <ng-container *ngIf="currentTab === 0">
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
            <div nz-col nzSm="2"> vs.</div>
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
            <div nz-col nzSm="2"><h1>0 : 0</h1></div>
            <div nz-col nzSm="2"><img src="/assets/images/home/avatar.png"></div>
            <div nz-col nzSm="1"><img src="/assets/images/home/avatar.png"></div>
            <div nz-col nzSm="1"><img src="/assets/images/home/avatar.png"></div>
            <div nz-col nzSm="1"><img src="/assets/images/home/avatar.png"></div>
            <div nz-col nzSm="1"><img src="/assets/images/home/avatar.png"></div>
            <div nz-col nzSm="5"></div>
          </div>
        </div>

        <div class="block">
          <div nz-row style="text-align: center;">
            <div nz-col nzSm="9"></div>
            <div nz-col nzSm="6"><h2>Data spotkania</h2></div>
            <div nz-col nzSm="9"></div>
          </div>
          <div nz-row style="text-align: center;">
            <div nz-col nzSm="9"></div>
            <div nz-col nzSm="6">
              <p *ngIf="(challengeTime$ | async) === null">Nie ustalono</p>
              <p *ngIf="(challengeTime$ | async) !== null">{{challengeTime$ | async}}</p>
            </div>
            <div nz-col nzSm="9"></div>
          </div>
          <div nz-row style="text-align: center;">
            <div nz-col nzSm="9"></div>
            <div nz-col nzSm="6"><h2>Miejsce spotkania</h2></div>
            <div nz-col nzSm="9"></div>
          </div>
          <div nz-row style="text-align: center;">
            <div nz-col nzSm="9"></div>
            <div nz-col nzSm="6">
            <p *ngIf="(challengePlaceName$ | async) === null">Nie ustalono</p>
            <p *ngIf="(challengePlaceName$ | async) !== null">{{challengePlaceName$ | async}}</p>
            </div>
            <div nz-col nzSm="9"></div>
          </div>
        </div>

          <div style="text-align: center;">
          <div style="display: inline-block; margin: 0 auto;">
            <button *ngIf="isChallengeCancellable$ | async" (click)="onCancelChallenge()" nz-button>
              Anuluj wyzwanie
            </button>
            <button *ngIf="isChallengeRejectable$ | async"(click)="onRejectChallenge()"  nz-button>
              Odrzuć wyzwanie
            </button>
            <button *ngIf="(challengeStatus$ | async) === ChallengeStatus.Accepted" nz-button>
              Wprowadź wynik
            </button>
            <!--<button nz-button>-->
              <!--Potwierdź wynik-->
            <!--</button>-->
            <!--<button nz-button>-->
              <!--Odrzuć wynik-->
            <!--</button>-->
          </div>
          </div>
        </ng-container>

        <ng-container *ngIf="currentTab === 1">
          <div nz-row style="text-align: center;">
            <div nz-col nzSm="5"></div>
            <div nz-col nzSm="6"><p>Drużyna gospodarzy</p></div>
            <div nz-col nzSm="2"></div>
            <div nz-col nzSm="6"><p>Drużyna gości</p></div>
            <div nz-col nzSm="5"></div>
          </div>
            <div nz-row>
              <div nz-col nzSm="3"></div>
              <div nz-col nzSm="8">
                <app-player-horizontal-card *ngFor="let player of (challengingTeamPlayers$ | async)"
                                            [player]="player" [alignRight]="true" [team]="(challenge$ | async)?.challengingTeam"></app-player-horizontal-card>
              </div>
              <div nz-col nzSm="2"></div>
              <div nz-col nzSm="8">
                <app-player-horizontal-card *ngFor="let player of (challengedTeamPlayers$ | async)"
                                            [player]="player" [team]="(challenge$ | async)?.challengedTeam"></app-player-horizontal-card>
              </div>
            </div>
        </ng-container>


        <ng-container *ngIf="currentTab === 2">
          <app-prototype-notification [inline]="true" [unavailable]="true"></app-prototype-notification>
        </ng-container>
        
        <ng-container *ngIf="currentTab === 3">
            <ng-container *ngIf="(myHome$ | async)">
              <p>
                Negocjacje terminu oraz miejsca spotkania kończą się w momencie zaakceptowania przez jednego z menedżerów oferty drugiej strony.
              </p>
              <app-placetimeoffer-pool [theirTeamOffers]="theirTeamOffers$ | async" [myTeamOffers]="myTeamOffers$ | async"
                                       [myHome]="myHome$ | async" [theirHome]="theirHome$ | async"
                                       (canceled)="onCancelled($event)" (accepted)="onAccepted($event)" (rejected)="onRejected($event)">

                <app-new-placetimeoffer-modal *ngIf="(challengeStatus$ | async) == 0" [center]="(region$ | async)?.center"
                                              [myHome]="myHome$ | async" [theirHome]="theirHome$ | async"
                                              [facilities]="facilities$ | async" (submitted)="newOfferSubmitted($event)">
                </app-new-placetimeoffer-modal>

              </app-placetimeoffer-pool>
            </ng-container>
        </ng-container>

      </div>
    </div>
  `, styles: [`

    nz-collapse {
      margin: 10px 0;
    }

    button {
      margin-right: 8px;
      margin-bottom: 12px;
      margin-top: 12px;
    }

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

  currentTab = 0;

  ChallengeStatus = ChallengeStatus;

  challenge$: Observable<Challenge>;
  facilities$: Observable<Facility[]>;
  placeTimeOffers$: Observable<PlaceTimeOffer[]>;
  myTeam$: Observable<Team>;
  myHome$: Observable<Position>;
  region$: Observable<Region>;
  theirHome$: Observable<Position>;
  challengeStatus$: Observable<ChallengeStatus>;

  challengingTeamPlayers$: Observable<Player[]>;
  challengedTeamPlayers$: Observable<Player[]>;

  isChallengeCancellable$: Observable<boolean>;
  isChallengeRejectable$: Observable<boolean>;

  myTeamOffers$: Observable<PlaceTimeOffer[]>;
  theirTeamOffers$: Observable<PlaceTimeOffer[]>;
  challengePlaceName$: Observable<boolean>;
  challengeTime$: Observable<boolean>;

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

    this.challengingTeamPlayers$ = this.store.pipe(select(selectChallengingTeamPlayers));
    this.challengedTeamPlayers$ = this.store.pipe(select(selectChallengedTeamPlayers));

    this.isChallengeCancellable$ = this.store.pipe(select(selectIsChallengeCancellable));
    this.isChallengeRejectable$ =  this.store.pipe(select(selectIsChallengeRejectable));

    this.challengeTime$ = this.store.pipe(select(selectChallengeTime));
    this.challengePlaceName$ = this.store.pipe(select(selectChallengePlaceName));

    combineLatest(this.challenge$, this.myTeam$).pipe(
      takeUntil(this.unsubscribe$),
    ).subscribe(([challenge, myTeam]) => {
      if (challenge !== null && myTeam !== null) {

        this.store.dispatch(new LoadTheirHome(this.getOtherTeam(challenge, myTeam).id));
        this.store.dispatch(new LoadTheirPlayers(this.getOtherTeam(challenge, myTeam).id));

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

  onGeneralTabClicked() {
    this.currentTab = 0;
  }

  onChatTabClicked() {
    this.currentTab = 2;
  }

  onPlayersTabClicked() {
    this.currentTab = 1;
  }

  onNegotiationsTabClicked() {
    this.currentTab = 3;
  }

  onCancelChallenge() {
    this.challenge$.pipe(take(1)).subscribe(challenge => this.store.dispatch(new CancelChallenge(challenge.id)));
  }

  onRejectChallenge() {
    this.challenge$.pipe(take(1)).subscribe(challenge => this.store.dispatch(new RejectChallenge(challenge.id)));
  }

}
