import {Component} from '@angular/core';

@Component({
  selector: 'app-community-page',
  template: `
    <div class="spaces-sides">
      <app-breadcrumb [items]="items"></app-breadcrumb>
      <div class="content-container">
        <h1>Społeczność</h1>
        <p>TODO: Drużyny</p>
        <p>TODO: Zawodnicy</p>
      </div>
    </div>
  `
})
export class CommunityPageComponent {
  items = [
    {title: 'Społeczność'}
  ];
}
