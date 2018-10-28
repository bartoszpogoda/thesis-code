import {Component} from '@angular/core';

@Component({
  selector: 'app-community-page',
  template: `
    <div class="spaces-sides">
      <app-breadcrumb [items]="items"></app-breadcrumb>
      <div class="content-container">
        <h1>Społeczność</h1>
        <p>Poznaj społeczność koszykarską w Twoim regionie..</p>

        <div nz-row nzGutter="16" class="one-row-cards-container">
          <div nz-col class="gutter-row" nzXs="0" nzSm="4"></div>
          <div nz-col class="gutter-row" nzXs="24" nzSm="8">
            <h2 routerLink="teams" class="tempStyling">(Link, TODO styling, maybe image?) Drużyny</h2>
          </div>
          <div nz-col class="gutter-row" nzXs="24" nzSm="8">
            <h2 routerLink="players" class="tempStyling">(Link, TODO styling, maybe image?) Zawodnicy</h2>
          </div>
          <div nz-col class="gutter-row" nzXs="0" nzSm="4"></div>
        </div>

      </div>
    </div>
  `,
  styles: [`
    
    
  
  `]
})
export class CommunityPageComponent {
  items = [
    {title: 'Społeczność'}
  ];
}
