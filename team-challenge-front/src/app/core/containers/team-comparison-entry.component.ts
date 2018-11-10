import {ChangeDetectionStrategy, Component, EventEmitter, Input, Output} from '@angular/core';
import {NumericCriteria, NumericCriteriaType, ScoredTeam} from '../models/search-result';
import {Team} from '../models/team';
import {Facility} from '../models/facility';
import {Position} from '../models/position';
import {Player} from '../models/player';


@Component({
  selector: 'app-team-comparison-entry',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `

    <nz-affix [nzOffsetTop]="115" (nzChange)="onAffixChange($event)" [class.affix-fixed]="affixFixed">
      <div style="text-align: center; background-color: #fff; padding-bottom: 10px">
        <h2>{{comparedTeamScore.team.name}}
          <div class="color-marker"
               [style.border-color]="color.borderColor"
               [style.background-color]="color.backgroundColor"></div>
        </h2>
        <button class="challenge-button" nz-button nzType="primary">
          Rzuć wyzwanie
        </button>
      </div>
    </nz-affix>

    <div class="section">
      <h3>Dystans</h3>
      <p>Odległość: {{getNumericCriteria(comparedTeamScore, 'DISTANCE').original.toPrecision(2)}}km</p>
    </div>

    <div class="section">
      <h3>Menedżer</h3>

      <div nz-row>
        <div nz-col nzSm="8"></div>
        <div nz-col nzSm="8">
          <app-player-card [player]="getManager()"></app-player-card>
        </div>
      </div>
    </div>

    <div class="section">
      <h3>Zawodnicy</h3>

      <div nz-row>
        <ng-container *ngFor="let player of getRegularPlayers(); let i = index">
          <div nz-col [nzSm]="i == 0 || i == 2 ? 3 : 1"></div>
          <div nz-col nzSm="8">
            <app-player-card [player]="player"></app-player-card>
          </div>
          <div nz-col [nzSm]="i == 1 || i == 3 ? 3 : 1"></div>
        </ng-container>
      </div>
    </div>


  `,
  styles: [`

    .section {
      text-align: center;
      margin-bottom: 15px;
    }
    
    .challenge-button {
      transition: none;
    }
    
    .affix-fixed .challenge-button {
      display: inline-block;
      margin-left: 15px;
    }

    .affix-fixed h2 {
      display: inline-block;
    }

    .color-marker {
      display: inline-block;
      width: 0.7em;
      height: 0.7em;
      border: 3px solid;
      margin: 0 auto;
    }

  `]
})
export class TeamComparisonEntryComponent {

  @Input()
  team: Team;

  @Input()
  comparedTeamScore: ScoredTeam;

  @Input()
  color: any;

  @Input()
  theirPlayers: Player[];

  @Output()
  challenge = new EventEmitter();

  affixFixed = false;

  getNumericCriteria(scoredTeam: ScoredTeam, type: NumericCriteriaType): NumericCriteria {
    const filtered = scoredTeam.criteria.numericCriteria.filter(crit => crit.type === type);

    if (filtered.length > 0) {
      return filtered[0];
    }
  }

  getManager(): Player {
    return this.theirPlayers.filter(player => player.id === this.comparedTeamScore.team.managerId)[0];
  }

  getRegularPlayers(): Player[] {
    return this.theirPlayers.filter(player => player.id !== this.comparedTeamScore.team.managerId);
  }

  onAffixChange(status: boolean) {
    this.affixFixed = status;
  }
}
