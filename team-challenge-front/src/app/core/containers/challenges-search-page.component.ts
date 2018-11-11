import {Component, OnInit} from '@angular/core';
import {select, Store} from '@ngrx/store';
import * as fromRoot from '../reducers/index';
import {Observable} from 'rxjs';
import {Player} from '../models/player';
import {selectPlayerProfile} from '../selectors/my-player.selectors';
import {selectRegions} from '../selectors/core.selectors';
import {selectSelectedRegionOrDefault} from '../../community/reducers';
import {selectBuilder} from '../selectors/search.selectors';
import {FacilityCreationForm} from '../models/facility';
import {SearchForm} from '../models/search-form';
import {Search} from '../actions/search.actions';

@Component({
  selector: 'app-challenges-search-page',
  template: `
    <div class="spaces-sides">
      <app-breadcrumb [items]="items"></app-breadcrumb>
      <div class="content-container">
        <div class="small-steps-container">
          <nz-steps [nzCurrent]="0" nzSize="small">
            <nz-step nzTitle="Określ preferencje"></nz-step>
            <nz-step nzTitle="Wybierz rywali"></nz-step>
            <nz-step nzTitle="Zaoferuj termin i miejsce"></nz-step>
            <nz-step nzTitle="Podsumowanie"></nz-step>
        </nz-steps>
        </div>
        <!--<h1>Szukaj rywali</h1>-->
        <div nz-row nzGutter="16">
          <div nz-col nzXs="0" nzSm="1"></div>
          <div nz-col nzXs="24" nzSm="22">
            <app-challenge-search-form [builder]="builder$ | async" (submitted)="onSubmitted($event)"></app-challenge-search-form>
          </div>
        </div>
      </div>
    </div>
  `
})
export class ChallengesSearchPageComponent {
  items = [
    {title: 'Wyzwania', link: '/challenges'}, {title: 'Tworzenie wyzwania'}
  ];

  builder$: Observable<SearchForm>;

  constructor(private store: Store<fromRoot.State>) {
      this.builder$ = this.store.pipe(select(selectBuilder));
  }

  onSubmitted(searchForm: SearchForm) {
    this.store.dispatch(new Search(searchForm));
  }
}
