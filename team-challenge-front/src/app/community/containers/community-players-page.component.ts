import {Component} from '@angular/core';

@Component({
  selector: 'app-community-players-page',
  template: `
    <div class="spaces-sides">
      <app-breadcrumb [items]="items"></app-breadcrumb>
      <div class="content-container">
        <h1>Zawodnicy</h1>
        <app-prototype-notification [unavailable]="true" [inline]="true"></app-prototype-notification>
      </div>
    </div>
  `
})
export class CommunityPlayersPageComponent {
  items = [
    {title: 'Społeczność', link: '/community'}, {title: 'Zawodnicy'}
  ];
}
