import {Component} from '@angular/core';

@Component({
  selector: 'app-player-profile-page',
  template: `
    <div class="spaces-sides">
      <app-breadcrumb [items]="items"></app-breadcrumb>
      <div class="content-container">
        <h1>Player Profile</h1>
      </div>
    </div>
  `
})
export class PlayerProfilePageComponent {
  items = [
    {title: 'Player'}
  ];
}
