import {Component} from '@angular/core';

@Component({
  selector: 'app-community-page',
  template: `
    <div class="spaces-sides">
      <app-breadcrumb [items]="items"></app-breadcrumb>
      <div class="content-container">
        <h1>Społeczność</h1>
        <h2 routerLink="teams">(Link, TODO styling) Drużyny</h2>
        <h2 routerLink="players">(Link, TODO styling) Gracze</h2>
      </div>
    </div>
  `
})
export class CommunityPageComponent {
  items = [
    {title: 'Społeczność'}
  ];
}
