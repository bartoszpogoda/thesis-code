import {Component, OnInit} from '@angular/core';
import {select, Store} from '@ngrx/store';
import * as fromRoot from '../reducers/index';
import {Observable} from 'rxjs';
import {selectComparing, selectSearchForm, selectStep} from '../selectors/challenge-creator.selectors';
import {SearchForm} from '../models/search-form';
import {BackToResults, Search} from '../actions/challenge-creator.actions';

@Component({
  selector: 'app-challenges-creator-page',
  template: `
    <div class="spaces-sides">
      <app-breadcrumb [items]="items"></app-breadcrumb>
      <div class="content-container">

        <nz-affix [nzOffsetTop]="117" >
          <div class="small-steps-container">
            <nz-steps [nzCurrent]="step$ | async" nzSize="small" class="steps-with-link-in-desc">
              <nz-step nzTitle="Określ preferencje"></nz-step>

              <nz-step *ngIf="!(comparing$ | async)" nzTitle="Wybierz rywali"></nz-step>
              <nz-step *ngIf="(comparing$ | async)" style="cursor:pointer;" (click)="onBackToResults()"
                       nzTitle="Wybierz rywali (porównanie)" nzDescription="Powrót do wyników"></nz-step>

              <nz-step nzTitle="Zaoferuj termin i miejsce"></nz-step>
            </nz-steps>
          </div>
        </nz-affix>

        <!-- STEP 0s -->
        <ng-container *ngIf="(step$ | async) === 0">
          <div nz-row nzGutter="16">
            <div nz-col nzXs="0" nzSm="1"></div>
            <div nz-col nzXs="24" nzSm="22">
              <app-challenge-search-form
                [builder]="searchForm$ | async"
                (submitted)="onSearch($event)">
              </app-challenge-search-form>
            </div>
          </div>
        </ng-container>

        <!-- STEP 1: Search results -->
        <ng-container *ngIf="(step$ | async) === 1 && !(comparing$ | async)">
          <app-challenge-creator-search-results></app-challenge-creator-search-results>
        </ng-container>

        <!-- STEP 1.5: Comparison -->
        <ng-container *ngIf="(step$ | async) === 1 && (comparing$ | async)">
          <app-challenge-creator-comparison></app-challenge-creator-comparison>
        </ng-container>

        <!-- STEP 2: Entry Place Time Offers -->
        <ng-container *ngIf="(step$ | async) === 2">
          <app-challenge-creator-offers></app-challenge-creator-offers>
        </ng-container>

      </div>
    </div>
  `
})
export class ChallengeCreatorPageComponent {
  items = [
    {title: 'Wyzwania', link: '/challenges'}, {title: 'Tworzenie wyzwania'}
  ];

  step$: Observable<number>;
  searchForm$: Observable<SearchForm>;
  comparing$: Observable<boolean>;

  constructor(private store: Store<fromRoot.State>) {
    this.step$ = this.store.pipe(select(selectStep));
    this.searchForm$ = this.store.pipe(select(selectSearchForm));
    this.comparing$ = this.store.pipe(select(selectComparing));
  }

  onSearch(searchForm: SearchForm) {
    this.store.dispatch(new Search(searchForm));
  }

  onBackToResults() {
    this.store.dispatch(new BackToResults());
  }
}
