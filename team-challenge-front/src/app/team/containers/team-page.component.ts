import {Component} from '@angular/core';

@Component({
  selector: 'app-team-page',
  template: `
    <div class="spaces-sides">
      <app-breadcrumb [items]="items"></app-breadcrumb>
      <div class="content-container">
        <h1>Team</h1>
      </div>
    </div>
  `
})
export class TeamPageComponent {
  items = [
    {title: 'Team'}
  ];
}
