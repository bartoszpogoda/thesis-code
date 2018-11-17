import {Component, OnDestroy, OnInit} from '@angular/core';
import {select, Store} from '@ngrx/store';
import * as fromRoot from '../reducers/index';
import {combineLatest, Observable, Subject, Subscription} from 'rxjs';
import {Challenge, ChallengeStatus, PlaceTimeOffer, PlaceTimeOfferStatus, Result} from '../models/challenge';
import {
  selectChallenge,
  selectChallengedTeamPlayers, selectChallengeHasResultToConfirm, selectChallengePlaceName, selectChallengeResult,
  selectChallengeStatus, selectChallengeTime,
  selectChallengingTeamPlayers, selectGuestTeamPoints, selectHostTeamPoints,
  selectIsChallengeCancellable, selectIsChallengeReadyForResults,
  selectIsChallengeRejectable,
  selectMyActiveChallenges,
  selectMyTeamOffers,
  selectPlaceTimeOffers, selectTeamReportingResult,
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
  CancelPlaceTimeOffer, ConfirmResult,
  LoadChallenge,
  LoadPlaceTimeOffers,
  LoadTheirHome, LoadTheirPlayers, RejectChallenge, RejectPlaceTimeOffer, RejectResult, SaveResult
} from '../actions/my-challenges.actions';
import {Team} from '../../core/models/team';
import {selectMyTeam, selectMyTeamHome, selectMyTeamRegion} from '../../core/selectors/my-team.selectors';
import {Position} from '../../core/models/position';
import {Region} from '../../core/models/region';
import {selectFacilities} from '../reducers/index';
import {Player} from '../../core/models/player';

@Component({
  selector: 'app-my-challenge-result',
  template: `
    <p *ngIf="(myTeam$ | async)?.id === (teamReportingResult$ | async)?.id && (challengeResult$ | async).status === 0">
      Wynik został zgłoszony przez Ciebie. Wynik oczekuje na potwierdzenie przez drużynę rywali. 
    </p>
    <p *ngIf="hasResultsToConfirm$ | async">
      Wynik został zgłoszony przez drużynę rywali. W celu sfinalizowania wyzwania potwierdź ten wynik. 
      W przypadku niezgodności możesz go odrzucić, spowoduje to odrzucenie wyzwania.
    </p>
    <app-result [hostTeam]="(challenge$ | async)?.challengingTeam"
                [guestTeam]="(challenge$ | async)?.challengedTeam"
                [hostTeamPoints]="hostTeamPoints$ | async"
                [guestTeamPoints]="guestTeamPoints$ | async">
    </app-result>

    <div *ngIf="hasResultsToConfirm$ | async" style="text-align: center;">
      <div style="display: inline-block; margin: 0 auto;">
        <button (click)="onRejectResult()" nz-button>
          Odrzuć wynik
        </button>
        <button nzType="primary" (click)="onConfirmResult()" nz-button>
          Potwierdź wynik
        </button>
      </div>
    </div>
  `, styles: [`    
    button {
      margin-right: 8px;
      margin-bottom: 12px;
      margin-top: 12px;
    }
  `]
})
export class MyChallengeResultComponent implements OnInit {
  readyForResults$: Observable<boolean>;
  hasResultsToConfirm$: Observable<boolean>;

  challengeResult$: Observable<Result>;
  challenge$: Observable<Challenge>;

  hostTeamPoints$: Observable<number>;
  guestTeamPoints$: Observable<number>;

  teamReportingResult$: Observable<Team>;
  myTeam$: Observable<Team>;


  constructor(private store: Store<fromCommunity.State>) {
    this.challengeResult$ = this.store.pipe(select(selectChallengeResult));
    this.readyForResults$ = this.store.pipe(select(selectIsChallengeReadyForResults));
    this.hasResultsToConfirm$ = this.store.pipe(select(selectChallengeHasResultToConfirm));
    this.challenge$ = this.store.pipe(select(selectChallenge));

    this.hostTeamPoints$ = this.store.pipe(select(selectHostTeamPoints));
    this.guestTeamPoints$ = this.store.pipe(select(selectGuestTeamPoints));

    this.teamReportingResult$ = this.store.pipe(select(selectTeamReportingResult));
    this.myTeam$ = this.store.pipe(select(selectMyTeam));

  }

  ngOnInit() {

  }

  onRejectResult() {
    this.challenge$.pipe(take(1)).subscribe(challenge => this.store.dispatch(new RejectResult(challenge.id)));
  }

  onConfirmResult() {
    this.challenge$.pipe(take(1)).subscribe(challenge => this.store.dispatch(new ConfirmResult(challenge.id)));
  }


}
