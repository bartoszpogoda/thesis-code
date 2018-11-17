import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {Stats} from '../service/stats.service';

@Component({
  selector: 'app-stats',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div *ngIf="stats !== null" nz-row nzGutter="16" style="background: rgb(232, 232, 232); padding: 20px;">
      <div nz-col class="gutter-row" nzXs="0" nzSm="6"></div>
      <div nz-col class="gutter-row" nzXs="24" nzSm="4" style="text-align: center;">
        <p style="font-size: 1.5em;">Zrzeszyliśmy już</p>
        <h1>{{stats.teams}}</h1>
        <h2>drużyn</h2>
      </div>
      <div nz-col class="gutter-row" nzXs="24" nzSm="4" style="text-align: center;">
        <p style="font-size: 1.5em;">Posiadamy bazę</p>
        <h1>{{stats.facilities}}</h1>
        <h2>obiektów sportowych</h2>
      </div>
      <div nz-col class="gutter-row" nzXs="24" nzSm="4" style="text-align: center;">
        <p style="font-size: 1.5em;">Pomogliśmy umówić</p>
        <h1>{{stats.finishedChallenges}}</h1>
        <h2 >spotkań</h2>
      </div>
    </div>
    `
})
export class StatsComponent {

  @Input()
  stats: Stats;

}
