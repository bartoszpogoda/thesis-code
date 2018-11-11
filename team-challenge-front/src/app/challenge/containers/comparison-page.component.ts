import {Component, OnDestroy, OnInit} from '@angular/core';
import {select, Store} from '@ngrx/store';
import * as fromRoot from '../reducers/index';
import {CompareLoadHomePoints, CompareLoadPlayers, SelectTeamForChallenge} from '../actions/challenge-creator.actions';
import {Observable, Subject} from 'rxjs';
import {selectSelected, selectSelectedHomes, selectSelectedPlayers} from '../selectors/challenge-creator.selectors';
import {NumericCriteria, NumericCriteriaType, ScoredTeam} from '../models/search-result';
import {takeUntil} from 'rxjs/operators';
import {selectFacilities, selectSelectedRegionOrDefault} from '../../community/reducers';
import {LoadFacilities} from '../../community/actions/community-facilities.actions';
import {Router} from '@angular/router';
import {Position} from '../../core/models/position';
import {Facility} from '../../core/models/facility';
import {Player} from '../../core/models/player';
import {Team} from '../../core/models/team';
import {Region} from '../../core/models/region';
import {selectMyTeam, selectMyTeamHome} from '../../core/selectors/my-team.selectors';

@Component({
  selector: 'app-comparison-page',
  template: `
    <script src="~/assets/js/Chart.bundle.js"></script>
    <div class="spaces-sides">
      <app-breadcrumb [items]="items"></app-breadcrumb>
      <div class="content-container">
        <nz-affix [nzOffsetTop]="117" >
          <div class="small-steps-container" style="background-color: #fff;">
          <nz-steps class="steps-with-link-in-desc" [nzCurrent]="1" nzSize="small" style="margin-bottom: 20px;">
            <nz-step nzTitle="Określ preferencje"></nz-step>
            <nz-step style="cursor:pointer;" (click)="onBackToResults()"
                     nzTitle="Wybierz rywali (porównanie)" nzDescription="Powrót do wyników"></nz-step>
            <nz-step nzTitle="Zaoferuj termin i miejsce"></nz-step>
            <nz-step nzTitle="Podsumowanie"></nz-step>
          </nz-steps>
          </div>
        </nz-affix>
        <!--<button  nz-button nzType="default" nzBlock style="width: 100%; margin: 20px 0;">Powrót do wyników</button>-->

        <div nz-row>
          <div nz-col nzSm="1"></div>
          <div nz-col nzXs="0" nzSm="12">
              <canvas style="margin: 0 auto;" width="600" height="400" baseChart
                      [options]="radarChartOptions"
                      [datasets]="radarChartData"
                      [labels]="radarChartLabels"
                      [chartType]="radarChartType"
                      [colors]="radarChartColors"></canvas>
          </div>
          <div nz-col nzSm="1"></div>
          <div nz-col nzSm="8">
            <app-map-teams-facilities
              [facilities]="facilities$ | async"
              [center]="(region$ | async)?.center"
              [myHome]="myHome$ | async"
              [theirHomes]="selectedHomes$ | async"
              height="320">
            </app-map-teams-facilities>
          </div>
          <div nz-col nzSm="2"></div>
        </div>

        <div nz-row>
          <div nz-col nzXs="24" [nzSm]="getColSize()" style="border-right: #eeeeee 1px solid;">
            <app-team-comparison-entry *ngIf="selectedSize >= 1 && (selectedHomes$ | async).length >= 1 &&
                                        (selectedPlayers$ | async).length >= 1"
                                       [team]="myTeam$ | async " [comparedTeamScore]="(selected$ | async)[0]"
                                       [color]="radarChartColors[0]"
                                       [theirPlayers]="(selectedPlayers$ | async)[0]"
                                       (challenge)="onChallenged($event)">
            </app-team-comparison-entry>
          </div>
          <div nz-col nzXs="24" [nzSm]="getColSize()" >
            <app-team-comparison-entry *ngIf="selectedSize >= 2 && (selectedHomes$ | async).length >= 2 &&
                                        (selectedPlayers$ | async).length >= 2"
                                       [team]="myTeam$ | async " [comparedTeamScore]="(selected$ | async)[1]"
                                       [color]="radarChartColors[1]"
                                       [theirPlayers]="(selectedPlayers$ | async)[1]"
                                       (challenge)="onChallenged($event)">
            </app-team-comparison-entry>
          </div>
          <div nz-col nzXs="24" [nzSm]="getColSize()" style="border-left: #eeeeee 1px solid;">
            <app-team-comparison-entry *ngIf="selectedSize >= 3 && (selectedHomes$ | async).length >= 3 &&
                                        (selectedPlayers$ | async).length >= 3"
                                       [team]="myTeam$ | async " [comparedTeamScore]="(selected$ | async)[2]"
                                       [color]="radarChartColors[2]"
                                       [theirPlayers]="(selectedPlayers$ | async)[2]"
                                       (challenge)="onChallenged($event)">
            </app-team-comparison-entry>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [ `

  ` ]
})
export class ComparisonPageComponent implements OnInit, OnDestroy {
  items = [
    {title: 'Wyzwania', link: '/challenges'}, {title: 'Tworzenie wyzwania'}
  ];

  radarChartColors = [
    { // green
      backgroundColor: 'rgba(0, 255, 0, 0.2)',
      borderColor: 'rgba(0, 255, 0, 1)',
    },
    { // blue
      backgroundColor: 'rgba(0, 102, 255, 0.2)',
      borderColor: 'rgba(0, 102, 255, 1)',
    },
    { // orange
      backgroundColor: 'rgba(255, 153, 0, 0.2)',
      borderColor: 'rgba(255, 153, 0, 1)',
    }
  ];

  radarChartLabels = ['Dopasowanie wiekiem', 'Dopasowanie poziomem umiejętności', 'Dopasowanie odległości'];
  radarChartData = [];
  radarChartType = 'radar';
  radarChartOptions = {
    responsive: false,
    maintainAspectRatio: false,
    scale: {
      ticks: {
        beginAtZero: true,
        max: 1,
        stepSize: 0.25
      }
    },
  };

  destroyed$ = new Subject();

  myTeam$: Observable<Team>;
  selected$: Observable<ScoredTeam[]>;
  facilities$: Observable<Facility[]>;
  myHome$: Observable<Position>;
  selectedHomes$: Observable<Position[]>;
  selectedPlayers$: Observable<Player[][]>;
  region$: Observable<Region>;

  selectedSize: number;

  constructor(private store: Store<fromRoot.State>, private router: Router) {
    this.myTeam$ = this.store.pipe(select(selectMyTeam));
    this.selected$ = this.store.pipe(select(selectSelected));
    this.region$ = this.store.pipe(select(selectSelectedRegionOrDefault));
    this.facilities$ = this.store.pipe(select(selectFacilities));
    this.myHome$ = this.store.pipe(select(selectMyTeamHome));
    this.selectedHomes$ = this.store.pipe(select(selectSelectedHomes));
    this.selectedPlayers$ = this.store.pipe(select(selectSelectedPlayers));

    this.selected$.pipe(takeUntil(this.destroyed$)).subscribe(next => {
      this.selectedSize = next.length;

        // update chart data

      next.forEach(entry => {
        const age = this.getNumericCriteria(entry, 'AGE').normalized.toPrecision(2);
        const skill = this.getNumericCriteria(entry, 'SKILL').normalized.toPrecision(2);
        const distance = this.getNumericCriteria(entry, 'DISTANCE').normalized.toPrecision(2);

        this.radarChartData.push({data: [age, skill, distance], label: entry.team.name});
      });


    });
  }

  ngOnInit(): void {
    this.store.dispatch(new CompareLoadPlayers());
    this.store.dispatch(new CompareLoadHomePoints());
    this.store.dispatch(new LoadFacilities());
  }

  ngOnDestroy (): void {
    this.destroyed$.next();
  }

  getNumericCriteria(scoredTeam: ScoredTeam, type: NumericCriteriaType): NumericCriteria {
    const filtered = scoredTeam.criteria.numericCriteria.filter(crit => crit.type === type);

    if (filtered.length > 0) {
      return filtered[0];
    }
  }

  onChallenged(team: Team) {
    this.store.dispatch(new SelectTeamForChallenge(team));
  }

  getColSize() {
    return this.selectedSize === 3 ? 8 : 12;
  }

  onBackToResults() {
    this.router.navigate(['challenges/new/pick']);
  }
}
