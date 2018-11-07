import {Component, OnInit} from '@angular/core';
import {select, Store} from '@ngrx/store';
import * as fromRoot from '../reducers/index';
import {selectResult, selectSearching} from '../selectors/search.selectors';
import {Observable} from 'rxjs';
import {SearchResult} from '../models/search-result';

@Component({
  selector: 'app-challenges-search-result-page',
  template: `
    <div class="spaces-sides">
      <app-breadcrumb [items]="items"></app-breadcrumb>
      <div class="content-container">
        <h1>Wyniki wyszukiwania</h1>
        
        <div *ngIf="searching$ | async" style="text-align: center"> 
          Wyszukiwanie Waszych idealnych przeciwników trwa... 
        </div>

        <pre *ngIf="(result$ | async) !== null">{{ result$ | async | json }}</pre>
        
      </div>
    </div>
  `
})
export class ChallengesSearchResultPageComponent {
  items = [
    {title: 'Wyzwania', link: '/challenges'}, {title: 'Szukaj rywali', link: '/challenges/search'}, {title: 'Wyniki'}
  ];

  searching$: Observable<boolean>;
  result$: Observable<SearchResult>;

  constructor(private store: Store<fromRoot.State>) {

    this.searching$ = this.store.pipe(select(selectSearching));
    this.result$ = this.store.pipe(select(selectResult));
  }

}
