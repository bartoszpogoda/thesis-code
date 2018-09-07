import {Component} from '@angular/core';

@Component({
  selector: 'app-community-page',
  template: `
    <div class="spaces-sides">
      <app-breadcrumb [items]="items"></app-breadcrumb>
      <div class="content-container">
        <h1>Community</h1>
      </div>
    </div>
  `
})
export class CommunityPageComponent {
  items = [
    {title: 'Community'}
  ];
}
