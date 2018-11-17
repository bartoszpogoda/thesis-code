import {Component, OnInit} from '@angular/core';
import {select, Store} from '@ngrx/store';
import * as fromRoot from '../reducers/index';
import {Observable} from 'rxjs';
import {Challenge, PlaceTimeOffer} from '../models/challenge';
import {selectMyActiveChallenges, selectMyActivePlaceTimeOffers} from '../selectors/my-challenges.selectors';
import {LoadActiveChallenges} from '../actions/my-challenges.actions';
import {Team} from '../../core/models/team';
import {selectMyTeam} from '../../core/selectors/my-team.selectors';
import {ActivatedRoute, Router} from '@angular/router';
import * as fromCommunity from '../../community/reducers';
import {
  selectChallenges,
  selectCurrentPage,
  selectPageSize,
  selectPlaceTimeOffers,
  selectTotal
} from '../selectors/past-challenges.selectors';
import {EnterPage, LoadPage} from '../actions/past-challenges.actions';

@Component({
  selector: 'app-past-challenges',
  template: `
    <ng-container *ngIf="(challenges$ | async).length > 0">
      <h2>Ostatnie wyzwania</h2>
      <ng-container *ngFor="let challenge of (challenges$ | async); let i = index" >
  
        <nz-divider *ngIf="i == 0"></nz-divider>
        <app-challenge-on-list [myTeam]="myTeam$ | async"
                               [challenge]="challenge" [placeTimeOffers]="(placeTimeOffers$ | async)[i]"
                               (clicked)="onChallengeClicked(challenge)">
        </app-challenge-on-list>
        <nz-divider></nz-divider>
  
      </ng-container>
  
      <nz-pagination [nzPageIndex]="(currentPage$ | async) + 1" [nzTotal]="totalPages$ | async"
                     [nzPageSize]="pageSize$ | async" (nzPageIndexChange)="onPageIndexChanged($event)"></nz-pagination>
    </ng-container>
  `, styles: [`
      nz-divider {
        margin: 0 !important;
      }
  `]
})
export class PastChallengesComponent implements OnInit {

  challenges$: Observable<Challenge[]>;
  currentPage$: Observable<number>;
  totalPages$: Observable<number>;
  pageSize$: Observable<number>;
  myTeam$: Observable<Team>;
  placeTimeOffers$: Observable<PlaceTimeOffer[][]>;

  constructor(private store: Store<fromCommunity.State>, private router: Router) {
    this.challenges$ = this.store.pipe(select(selectChallenges));
    this.currentPage$ = this.store.pipe(select(selectCurrentPage));
    this.totalPages$ = this.store.pipe(select(selectTotal));
    this.pageSize$ = this.store.pipe(select(selectPageSize));
    this.myTeam$ = this.store.pipe(select(selectMyTeam));
    this.placeTimeOffers$ = this.store.pipe(select(selectPlaceTimeOffers));
  }


  ngOnInit() {
    this.store.dispatch(new EnterPage());
  }

  onPageIndexChanged(id: number) {
    this.store.dispatch(new LoadPage(id - 1));
  }

  onChallengeClicked(challenge: Challenge) {
    this.router.navigate(['/challenges/' + challenge.id]);
  }


}
