import {Component, OnInit} from '@angular/core';
import {select, Store} from '@ngrx/store';
import * as fromRoot from '../reducers/index';
import {
  selectMoreThanOneSelected,
  selectOneSelected,
  selectResult,
  selectSearching, selectSelected,
  selectThreeSelected
} from '../selectors/search.selectors';
import {Observable} from 'rxjs';
import {ScoredTeam, SearchResult} from '../models/search-result';
import {Check, Uncheck, UncheckAll} from '../actions/search.actions';
import {Router} from '@angular/router';

@Component({
  selector: 'app-challenges-search-result-page',
  template: `
    <div class="spaces-sides">
      <app-breadcrumb [items]="items"></app-breadcrumb>
      <div class="content-container">
        <!--<h1>Wyniki wyszukiwania</h1>-->

        <div *ngIf="searching$ | async" style="text-align: center">
          Wyszukiwanie Waszych idealnych przeciwników trwa...
        </div>

        <div *ngIf="!(searching$ | async)" nz-row>
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
            Średni poziom umiejętności (0-10)
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


            <!--<nz-spin *ngIf="loading && hasMore" class="demo-loading"></nz-spin>-->
        </div>

        <div *ngIf="(result$ | async) !== null">
        <button nz-button [disabled]="!(oneSelected$ | async)" nzType="primary">
          Rzuć wyzwanie
        </button>
        <button nz-button (click)="onCompareClicked()" [disabled]="!(moreThanOneSelected$ | async)" nzType="primary">
          Porównaj zaznaczone drużyny
        </button>
        </div>

      </div>
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
export class ChallengesSearchResultPageComponent implements OnInit {
  items = [
    {title: 'Wyzwania', link: '/challenges'}, {title: 'Szukaj rywali', link: '/challenges/search'}, {title: 'Wyniki'}
  ];

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
    this.router.navigate(['challenges/search/result/comparison']);
  }

  ngOnInit(): void {
    // this.store.dispatch(new UncheckAll());
  }
}
