import {Component} from '@angular/core';


@Component({
  selector: 'app-team-manager-page',
  template: `
    <div class="spaces-sides">
      <app-breadcrumb [items]="items"></app-breadcrumb>
      <div class="content-container">
        <h1 routerLink="recruitment">(TODO: Styling) Rekrutacja</h1>
      </div>
    </div>
  `
})
export class TeamManagerPageComponent {
  items = [
    {title: 'Drużyna', link: '/team'}, {title: 'Zarządzanie'}
  ];

}
