import {ChangeDetectionStrategy, Component, EventEmitter, Input, Output} from '@angular/core';
import MapOptions = google.maps.MapOptions;
import LatLng = google.maps.LatLng;
import {Position} from '../../core/models/position';
import {Facility} from '../../core/models/facility';
import {Team} from '../../core/models/team';


@Component({
  selector: 'app-result',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div style="text-align: center; margin: 15px 0;">
      <div nz-row style="margin: 5px 0" [nzGutter]="16">
        <div nz-col [nzOffset]="4" [nzSm]="7">
          <i *ngIf="hostTeamPoints > guestTeamPoints" style="font-size: 1.5em" class="anticon anticon-trophy"></i>
        </div>
        <div nz-col [nzSm]="2">
          <i *ngIf="hostTeamPoints === guestTeamPoints" style="font-size: 1.5em" class="anticon anticon-trophy"></i>
        </div>
        <div nz-col [nzSm]="7" >
          <i *ngIf="hostTeamPoints < guestTeamPoints" style="font-size: 1.5em" class="anticon anticon-trophy"></i>
        </div>
      </div>
  
  
      <div nz-row [nzGutter]="16">
        <div nz-col [nzOffset]="4" [nzSm]="7">
          <h2>{{hostTeam.name}}</h2>
        </div>
        <div nz-col [nzOffset]="2" [nzSm]="7" >
          <h2>{{guestTeam.name}}</h2>
        </div>
      </div>
      <div nz-row [nzGutter]="16">
        <div nz-col [nzOffset]="4" [nzSm]="7">
          <h2>{{hostTeamPoints}}</h2>
        </div>
        <div nz-col [nzSm]="2">
          <h2>-</h2>
        </div>
        <div nz-col [nzSm]="7" >
          <h2>{{guestTeamPoints}}</h2>
        </div>
      </div>
    </div>
  `
})
export class ResultComponent {

  @Input()
  hostTeam: Team;

  @Input()
  hostTeamPoints: number;

  @Input()
  guestTeam: Team;

  @Input()
  guestTeamPoints: number;

}
