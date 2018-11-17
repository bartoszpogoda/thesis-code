import {Component, OnInit} from '@angular/core';
import {select, Store} from '@ngrx/store';
import * as fromRoot from '../reducers/index';
import {
  selectMoreThanOneSelected,
  selectOneSelected,
  selectResult,
  selectSearching, selectSelected,
  selectThreeSelected
} from '../selectors/challenge-creator.selectors';
import {Observable} from 'rxjs';
import {ScoredTeam, SearchResult} from '../models/search-result';
import {BackToSearchForm, Check, CompareSelected, SelectTeamForChallenge, Uncheck, UncheckAll} from '../actions/challenge-creator.actions';
import {Router} from '@angular/router';
import {take} from 'rxjs/operators';

@Component({
  selector: 'app-challenge-creator-search-results',
  template: `
        <div *ngIf="searching$ | async" style="text-align: center">
          <app-fancy-loading></app-fancy-loading>
          <h3>Poszukiwanie Waszych idealnych przeciwników trwa...</h3>
        </div>

        <div *ngIf="!(searching$ | async)" nz-row style="margin-top: 20px;">
          <div nz-col nzXs="0" nzSm="10">
            Nazwa drużyny
          </div>
          <div nz-col nzXs="0" nzSm="5" class="container-vert-center">
            Znaczniki
          </div>
          <div nz-col nzXs="0" nzSm="2" class="centered-header">
            Średni wiek
          </div>
          <div nz-col nzXs="0" nzSm="2" class="centered-header">
            Dopasowanie umiejętnościami
          </div>
          <div nz-col nzXs="0" nzSm="2" class="centered-header">
            Odległość
          </div>
          <div nz-col nzXs="0" nzSm="1" class="centered-header">
          </div>
          <div nz-col nzXs="0" nzSm="2" class="centered-header">
            Poziom dopasowania
          </div>
        </div>
        <div *ngIf="(result$ | async) !== null" class="demo-infinite-container">
             <!--infiniteScroll-->
             <!--[infiniteScrollDistance]="2"-->
             <!--[infiniteScrollThrottle]="50"-->
             <!--(scrolled)="onScroll()"-->
             <!--[scrollWindow]="false">-->
          <ng-container *ngFor="let result of (result$ | async).results; let i = index">
            <nz-divider *ngIf="i == 0"></nz-divider>
            <app-search-result-entry [scoredTeam]="result" (selected)="onSelected(result)"
                                     (unselected)="onUnselected(result)"
                                     [allSelected]="selected$ | async"
                                     [selectable]="!(threeSelected$ | async)"></app-search-result-entry>
            <nz-divider></nz-divider>
          </ng-container>

          <div *ngIf="(result$ | async).results.length === 0" style="text-align: center">
            <h2 style="margin-top: 20px;">Brak wyników</h2>
          </div>

            <!--<nz-spin *ngIf="loading && hasMore" class="demo-loading"></nz-spin>-->
        </div>

        <div *ngIf="(result$ | async) !== null">
        <button nz-button (click)="onChangePreferences()">
          Zmień preferencje
        </button>
        <button nz-button (click)="onTeamSelected()" [disabled]="!(oneSelected$ | async)" nzType="primary">
          <i class="anticon anticon-play-circle-o"></i> Wybierz
        </button>
        <button nz-button (click)="onCompareClicked()" [disabled]="!(moreThanOneSelected$ | async)" nzType="primary">
          Porównaj zaznaczone drużyny
        </button>
        </div>
  `,
  styles: [ `
  :host ::ng-deep .demo-infinite-container {
    border: 1px solid #e8e8e8;
    border-radius: 4px;
    overflow: auto;
    height: 350px;
  }
  :host ::ng-deep .demo-loading {
    position: absolute;
    bottom: -40px;
    left: 50%;
  }


    .centered-header {
      margin-left: -7px;
      text-align: center;
    }

    nz-divider {
      margin: 0;
    }

    button {
      margin-right: 8px;
      margin-bottom: 12px;
      margin-top: 12px;
    }
  ` ]
})
export class ChallengeCreatorSearchResultsComponent {

  searching$: Observable<boolean>;
  result$: Observable<SearchResult>;
  threeSelected$: Observable<boolean>;
  oneSelected$: Observable<boolean>;
  selected$: Observable<ScoredTeam[]>;
  moreThanOneSelected$: Observable<boolean>;

  constructor(private store: Store<fromRoot.State>, private router: Router) {

    this.searching$ = this.store.pipe(select(selectSearching));
    this.result$ = this.store.pipe(select(selectResult));
    this.threeSelected$ = this.store.pipe(select(selectThreeSelected));
    this.oneSelected$ = this.store.pipe(select(selectOneSelected));
    this.moreThanOneSelected$ = this.store.pipe(select(selectMoreThanOneSelected));
    this.selected$ = this.store.pipe(select(selectSelected));
  }

  onSelected(result: ScoredTeam) {
    this.store.dispatch(new Check(result));
  }

  onUnselected(result: ScoredTeam) {
    this.store.dispatch(new Uncheck(result));
  }

  onCompareClicked() {
    this.store.dispatch(new CompareSelected());
  }

  onChangePreferences() {
    this.store.dispatch(new BackToSearchForm());
  }

  onTeamSelected() {
    this.selected$.pipe(take(1)).subscribe(selected => {
      if (selected.length === 1) {
        this.store.dispatch(new SelectTeamForChallenge(selected[0].team));
      }
    });
  }
}
