import {Component, Input, OnInit} from '@angular/core';
import {Player} from '../models/player';
import {Team} from '../models/team';

@Component({
  selector: 'app-team-display',
  template: `
    <div nz-row nzGutter="16">
      <div nz-col class="gutter-row" nzXs="24" nzSm="6">
        <img style="width: 100%;" src="/assets/images/home/avatar.png"/>
      </div>
      <div nz-col class="gutter-row" nzXs="24" nzSm="18">
        <h1 class="highlight">{{team.name}}</h1>
        <!--<div nz-row nzGutter="16" style="text-align: center;">-->
          <!--<div nz-col class="gutter-row" nzXs="0" nzSm="6"></div>-->
          <!--<div nz-col class="gutter-row" nzXs="0" nzSm="6"><h2>Display data...</h2></div>-->
          <!--<div nz-col class="gutter-row" nzXs="0" nzSm="6"><h2>Display data...</h2></div>-->
          <!--<div nz-col class="gutter-row" nzXs="0" nzSm="6"></div>-->
        <!--</div>-->
        <ng-content></ng-content>
      </div>
    </div>
    <p>Manager: {{team.managerName}}</p>
  `
})
export class TeamDisplayComponent {

  @Input()
  team: Team;

  constructor() { }


}
