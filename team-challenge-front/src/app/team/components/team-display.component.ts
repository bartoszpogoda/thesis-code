import {Component, Input, OnInit} from '@angular/core';
import {Player} from '../../core/models/player';
import {Team} from '../../core/models/team';

@Component({
  selector: 'app-team-display',
  template: `
    <h1>Name: {{team.name}}</h1>
    <p>Manager: {{team.managerName}}</p>
  `
})
export class TeamDisplayComponent {

  @Input()
  team: Team;

  constructor() { }


}
