import {Component, Input, OnInit} from '@angular/core';
import {getFrequencyDescription, getSkillDescription, Player} from '../models/player';

@Component({
  selector: 'app-player-profile',
  template: `
    <div nz-row nzGutter="16">
      <div nz-col class="gutter-row" nzXs="0" nzSm="6">
        <img style="width: 100%;" [src]="getSrc()"/>
      </div>
      <div nz-col class="gutter-row" nzXs="24" nzSm="18">
        <h1>{{player.fullName}}</h1>
        <p>Wiek: {{player.age}}</p>
        <p>Wzrost: {{player.height}}</p>
        <p>Umiejętności: {{getSkillDescription(player.skill)}}</p>
        <p>Częstość gry: {{getFrequencyDescription(player.skill)}}</p>
        <p>Drużyna: {{player.teamName}}</p>
      </div>
    </div>
  `
})
export class PlayerProfileComponent {

  @Input()
  player: Player;

  getSkillDescription = getSkillDescription;

  getFrequencyDescription = getFrequencyDescription;

  constructor() { }

  getSrc() {
    if (this.player.hasImage) {
     return '/api/players/' + this.player.id + '/image' + '?' + new Date();
    } else {
      return '/assets/images/home/avatar.png';
    }
  }


}
