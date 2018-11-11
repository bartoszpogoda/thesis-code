import {Component, EventEmitter, Input, Output} from '@angular/core';
import {NumericCriteriaType, ScoredTeam} from '../models/search-result';


@Component({
  selector: 'app-search-result-entry',
  template: `
    <div nz-row style="padding-top: 12px; padding-bottom: 12px;"
         [class.unselectable]="!selectable && !checked"
         [class.selected]="checked"
         (click)="onRowClicked()">
      <div nz-col nzXs="0" nzSm="1" class="centered-col container-vert-center">
        <label style="pointer-events: none;" nz-checkbox style="margin: 0 auto;" [nzDisabled]="!selectable && !checked"
               [(ngModel)]="checked" (click)="onClicked()"></label>
      </div>
      <div nz-col nzXs="0" nzSm="9" class="container-vert-center">
        <h3 style="margin: 0;">{{scoredTeam.team.name}}</h3>
      </div>
      <div nz-col nzXs="0" nzSm="5" class="container-vert-center">
        <nz-tag [nzColor]="'green'">Fair play </nz-tag>
      </div>
      <div nz-col nzXs="0" nzSm="2" class="centered-col">
        <nz-progress [nzPercent]="getNumericCriteriaValue('AGE')"
                     [nzFormat]="provideTextAge()" nzType="dashboard"  [nzWidth]="70"></nz-progress>
      </div>
      <div nz-col nzXs="0" nzSm="2" class="centered-col">
        <nz-progress [nzPercent]="getNumericCriteriaValue('SKILL')"
                     nzType="dashboard"  [nzWidth]="70"></nz-progress>
      </div>
      <div nz-col nzXs="0" nzSm="2" class="centered-col">
        <nz-progress [nzPercent]="getNumericCriteriaValue('DISTANCE')"
                     [nzFormat]="provideTextDistance()" nzType="dashboard"  [nzWidth]="70"></nz-progress>
      </div>
      <div nz-col nzXs="0" nzSm="1"></div>
      <div nz-col nzXs="0" nzSm="2" class="centered-col">
        <nz-progress [nzPercent]="getTotalScore()" nzType="dashboard"  [nzWidth]="70"></nz-progress>
      </div>
    </div>
  `,
  styles: [`

    [nz-row] {
      cursor: pointer;
    }

    [nz-row].unselectable {
      background-color: #fcfcfc;
      cursor: initial;
    }

    [nz-row].selected {
      background-color: #ecf3ff;
    }

    label[nz-checkbox] {
      pointer-events: none;
    }

    .container-vert-center {
      display: flex;
      /*justify-content: center; !* align horizontal *!*/
      align-items: center; /* align vertical */
      height: 70px;
    }


    div.result-entry-container {
      max-height: 100px;
      display: flex;
      justify-content: space-between;
      border: black 1px solid;
      margin: 10px 0;
    }

    .centered-col {
      text-align: center;
    }

    nz-progress {
      margin: 0 10px;
    }
  `]
})
export class SearchResultEntryComponent {

  @Input()
  scoredTeam: ScoredTeam;

  @Input()
  selectable: boolean;

  @Input()
  set allSelected(selectedResults: ScoredTeam[]) {
    if (selectedResults.indexOf(this.scoredTeam) >= 0) {
      this.checked = true;
    }
  }

  @Output()
  selected = new EventEmitter();

  @Output()
  unselected = new EventEmitter();

  checked: boolean;


  getNumericCriteria(type: NumericCriteriaType) {
    const filtered = this.scoredTeam.criteria.numericCriteria.filter(crit => crit.type === type);

    if (filtered.length > 0) {
      return filtered[0];
    }
  }

  getNumericCriteriaValue(type: NumericCriteriaType) {
      return (this.getNumericCriteria(type).normalized * 100).toFixed();
  }

  getTotalScore() {
    return (this.scoredTeam.totalScore * 100).toFixed();
  }

  provideTextAge() {
    return () => {
      const diff = Math.round(this.getNumericCriteria('AGE').original);

      if (diff === 0) {
        return '✓';
      } else if (diff < 0 && diff > -5) {
        return diff + ' lata';
      } else if (diff < 0) {
        return diff + ' lat';
      } else if (diff > 0 && diff < 5) {
        return '+' + diff + ' lata';
      } else {
        return '+' + diff + ' lat';
      }
    };
  }

  provideTextDistance() {
    return () => {
      const dist = this.getNumericCriteria('DISTANCE').original;

      if (dist >= 10) {
        return dist.toFixed(0) + 'km';
      } else {
        return dist.toFixed(1) + 'km';
      }
    };
  }


  onClicked() {
      if (this.checked) {
        this.selected.emit();
      } else {
        this.unselected.emit();
      }
  }

  onRowClicked() {
    if (this.selectable || this.checked) {
      this.checked = !this.checked;
      this.onClicked();
    }
  }
}
