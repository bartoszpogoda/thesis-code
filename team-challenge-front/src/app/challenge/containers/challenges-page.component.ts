import {Component, OnInit} from '@angular/core';
import {select, Store} from '@ngrx/store';
import * as fromRoot from '../reducers/index';
import {Observable} from 'rxjs';
import {Challenge, PlaceTimeOffer} from '../models/challenge';
import {selectMyActiveChallenges, selectMyActivePlaceTimeOffers} from '../selectors/my-challenges.selectors';
import {LoadActiveChallenges} from '../actions/my-challenges.actions';
import {Team} from '../../core/models/team';
import {selectMyTeam} from '../../core/selectors/my-team.selectors';
import {Router} from '@angular/router';

@Component({
  selector: 'app-challenges-page',
  template: `
    <div class="spaces-sides">
      <app-breadcrumb [items]="items"></app-breadcrumb>
      <div class="content-container">
        <div nz-row nzGutter="16">
          <button (click)="onSearchClicked()" nz-button nzType="primary" style="margin-bottom: 20px;">
            <i class="anticon anticon-search"></i> Nowe wyzwanie
          </button>
        </div>
        <h2>Obecne wyzwania</h2>

        <div style="margin-bottom: 20px;">
          <div nz-row class="headers" nzGutter="16">
            <div nz-col nzXs="0" nzSm="2" class="container-vert-center"></div>
            <div nz-col nzXs="0" nzSm="4" class="container-vert-center">Nazwa drużyny</div>
            <div nz-col nzXs="0" nzSm="4" class="container-vert-center">Menedżer</div>
            <div nz-col nzXs="0" nzSm="4" class="container-vert-center">Status</div>
            <div nz-col nzXs="0" nzSm="5" class="container-vert-center">Miejsce</div>
            <div nz-col nzXs="0" nzSm="3" class="container-vert-center">Data</div>
            <div nz-col nzXs="0" nzSm="2" class="container-vert-center"></div>
          </div>
          <ng-container *ngFor="let chall of (myActiveChallenges$ | async); let i = index">
            <nz-divider *ngIf="i == 0"></nz-divider>
            <app-challenge-on-list [challenge]="chall" [placeTimeOffers]="(myActivePlaceTimeOffers$ | async)[i]"
                                   [myTeam]="myTeam$ | async" (clicked)="onChallengeClicked(chall)"></app-challenge-on-list>
            <nz-divider></nz-divider>
          </ng-container>
          <div *ngIf="(myActiveChallenges$ | async).length === 0">
            <p style="margin-top: 15px;">Brak aktywnych wyzwań</p>
          </div>
        </div>

        <h2>Ostatnie wyzwania</h2>
        <app-past-challenges></app-past-challenges>
      </div>
    </div>
  `, styles: [`
    
    .headers div[nz-col] {
      padding-left: 11px;
    }
    
  `]
})
export class ChallengesPageComponent implements OnInit {
  items = [
    {title: 'Wyzwania'}
  ];

  myActiveChallenges$: Observable<Challenge[]>;
  myActivePlaceTimeOffers$: Observable<PlaceTimeOffer[][]>;
  myTeam$: Observable<Team>;

  constructor(private store: Store<fromRoot.State>, private router: Router) {
    this.myActiveChallenges$ = this.store.pipe(select(selectMyActiveChallenges));
    this.myActivePlaceTimeOffers$ = this.store.pipe(select(selectMyActivePlaceTimeOffers));
    this.myTeam$ = this.store.pipe(select(selectMyTeam));
  }

  ngOnInit(): void {
    this.store.dispatch(new LoadActiveChallenges());
  }

  onSearchClicked() {
    this.router.navigate(['/challenges/new']);
  }

  onChallengeClicked(challenge: Challenge) {
    this.router.navigate(['/challenges/' + challenge.id]);
  }
}
