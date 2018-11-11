import {Component, OnInit} from '@angular/core';
import {select, Store} from '@ngrx/store';
import * as fromRoot from '../reducers/index';
import {Observable} from 'rxjs';
import {Player} from '../models/player';
import {selectPlayerProfile} from '../selectors/my-player.selectors';
import {
  selectPickedTeam,
  selectPickedTeamHome,
  selectSelected,
  selectSelectedHomes,
  selectSelectedPlayers
} from '../selectors/search.selectors';
import {Team} from '../models/team';
import {ScoredTeam} from '../models/search-result';
import {Facility} from '../models/facility';
import {Position} from '../models/position';
import {Region} from '../models/region';
import {Router} from '@angular/router';
import {selectMyTeam, selectMyTeamHome} from '../selectors/my-team.selectors';
import {selectFacilities, selectSelectedRegionOrDefault} from '../../community/reducers';
import {LoadFacilities} from '../../community/actions/community-facilities.actions';

@Component({
  selector: 'app-challenges-summary-page',
  template: `
    <div class="spaces-sides">
      <app-breadcrumb [items]="items"></app-breadcrumb>
      <div class="content-container">
        <div class="small-steps-container">
          <nz-steps [nzCurrent]="3" nzSize="small">
            <nz-step nzTitle="Określ preferencje"></nz-step>
            <nz-step nzTitle="Wybierz rywali"></nz-step>
            <nz-step nzTitle="Zaoferuj termin i miejsce"></nz-step>
            <nz-step nzTitle="Podsumowanie"></nz-step>
          </nz-steps>
        </div>

        <h2>Rzucasz wyzwanie drużynie: {{(pickedTeam$ | async)?.name}}</h2>

        <div>
          <button nz-button (click)="onGoBack()">
            Cofnij
          </button>
          <button nz-button (click)="onCreateChallenge()" nzType="primary">
            <i class="anticon anticon-play-circle-o"></i> Rzuć wyzwanie
          </button>
        </div>

      </div>
    </div>
  `
})
export class ChallengesSummaryPageComponent implements OnInit {
  items = [
    {title: 'Wyzwania', link: '/challenges'}, {title: 'Tworzenie wyzwania'}
  ];

  pickedTeam$: Observable<Team>;

  constructor(private store: Store<fromRoot.State>, private router: Router) {
    this.pickedTeam$ = this.store.pipe(select(selectPickedTeam));
  }

  ngOnInit(): void {
    this.store.dispatch(new LoadFacilities());
  }

  onGoBack() {

  }

  onCreateChallenge() {

  }
}
