import {Component, Input, OnInit} from '@angular/core';
import {Player} from '../models/player';
import {Team} from '../models/team';

@Component({
  selector: 'app-team-profile',
  template: `
    <div nz-row nzGutter="16">
      <div nz-col class="gutter-row" nzXs="0" nzSm="6">
        <img style="width: 100%;" [src]="getSrc()"/>
      </div>
      <div nz-col class="gutter-row" nzXs="24" nzSm="18">
        <h1>{{team.name}}</h1>
        <p>Menedżer: {{team.managerName}}</p>
      </div>
    </div>
  `
})
export class TeamProfileComponent {

  @Input()
  team: Team;

  constructor() { }

  getSrc() {
    // if (this.player.hasImage) {
    //  return '/api/players/' + this.player.id + '/image' + '?' + new Date();
    // } else {
      return '/assets/images/home/avatar.png';
    // }
  }


}
