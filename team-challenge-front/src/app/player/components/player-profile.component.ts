import {Component, Input, OnInit} from '@angular/core';
import {Player} from '../../core/models/player';

@Component({
  selector: 'app-player-profile',
  template: `
    <h1>Name: {{player.fullName}}</h1>
    <p>Age: {{player.age}}</p>
    <p>Height: {{player.height}}</p>
    <p>Experience: {{player.yearsOfExperience}} years</p>
    <p>Team: {{player.teamName}}</p>
  `
})
export class PlayerProfileComponent {

  @Input()
  player: Player;

  constructor() { }


}
