import {Component} from '@angular/core';


@Component({
  selector: 'app-team-manager-page',
  template: `
    <div class="spaces-sides">
      <app-breadcrumb [items]="items"></app-breadcrumb>
      <div class="content-container">
        <h2 class="tempStyling" routerLink="base">Podstawowe dane</h2>
        <h2 class="tempStyling" routerLink="recruitment">Rekrutacja</h2>
        <h2 class="tempStyling" routerLink="home">Punkt macierzysty</h2>
      </div>
    </div>
  `
})
export class TeamManagerPageComponent {
  items = [
    {title: 'Moja drużyna', link: '/team'}, {title: 'Zarządzanie'}
  ];

}
