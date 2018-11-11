import {Component, OnInit} from '@angular/core';
import {select, Store} from '@ngrx/store';
import * as fromRoot from '../reducers/index';
import {Observable} from 'rxjs';
import {
  selectPickedTeam,
  selectPickedTeamHome,
  selectSelected,
  selectSelectedHomes,
  selectSelectedPlayers
} from '../selectors/challenge-creator.selectors';
import {Router} from '@angular/router';
import {selectFacilities, selectSelectedRegionOrDefault} from '../../community/reducers';
import {CompareLoadHomePoints, CompareLoadPlayers} from '../actions/challenge-creator.actions';
import {LoadFacilities} from '../../community/actions/community-facilities.actions';
import {selectMyTeam, selectMyTeamHome} from '../../core/selectors/my-team.selectors';
import {Position} from '../../core/models/position';
import {Region} from '../../core/models/region';
import {Facility} from '../../core/models/facility';
import {Team} from '../../core/models/team';

@Component({
  selector: 'app-challenges-entry-date-time-page',
  template: `
    <div class="spaces-sides">
      <app-breadcrumb [items]="items"></app-breadcrumb>
      <div class="content-container">
        <div class="small-steps-container">
          <nz-steps [nzCurrent]="2" nzSize="small">
            <nz-step nzTitle="Określ preferencje"></nz-step>
            <nz-step nzTitle="Wybierz rywali"></nz-step>
            <nz-step nzTitle="Zaoferuj termin i miejsce"></nz-step>
            <nz-step nzTitle="Podsumowanie"></nz-step>
          </nz-steps>
        </div>

        <h2>Rzucasz wyzwanie drużynie: {{(pickedTeam$ | async)?.name}}</h2>

        <p>Dodaj wstępne propozycje czasu oraz terminu spotkania.</p>

        <app-placetimeoffer-pool></app-placetimeoffer-pool>
        <app-new-placetimeoffer-modal [center]="(region$ | async)?.center"
                                      [myHome]="myHome$ | async" [theirHome]="pickedTeamHome$ | async"
                                      [facilities]="facilities$ | async">
        </app-new-placetimeoffer-modal>

        <div>
          <button nz-button (click)="onChangeRivals()">
            Zmień rywali
          </button>
          <button nz-button (click)="onContinue()" nzType="primary">
            Dalej
          </button>
        </div>

      </div>
    </div>
  `
})
export class ChallengesEntryDateTimePageComponent implements OnInit {
  items = [
    {title: 'Wyzwania', link: '/challenges'}, {title: 'Tworzenie wyzwania'}
  ];

  pickedTeam$: Observable<Team>;

  myTeam$: Observable<Team>;
  facilities$: Observable<Facility[]>;
  myHome$: Observable<Position>;
  region$: Observable<Region>;
  pickedTeamHome$: Observable<Position>;

  selectedSize: number;

  constructor(private store: Store<fromRoot.State>, private router: Router) {
    this.myTeam$ = this.store.pipe(select(selectMyTeam));
    this.region$ = this.store.pipe(select(selectSelectedRegionOrDefault));
    this.facilities$ = this.store.pipe(select(selectFacilities));
    this.myHome$ = this.store.pipe(select(selectMyTeamHome));

    this.pickedTeam$ = this.store.pipe(select(selectPickedTeam));
    this.pickedTeamHome$ = this.store.pipe(select(selectPickedTeamHome));

    // TODO load their home
  }

  ngOnInit(): void {
    this.store.dispatch(new LoadFacilities());
  }

  onContinue() {
    this.router.navigate(['/challenges/new/summary']);
  }

  onChangeRivals() {
    this.router.navigate(['/challenges/new/pick']);
  }
}
