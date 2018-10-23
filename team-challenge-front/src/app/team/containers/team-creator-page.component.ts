import {Component} from '@angular/core';


@Component({
  selector: 'app-team-creator-page',
  template: `
    <div class="spaces-sides">
      <app-breadcrumb [items]="items"></app-breadcrumb>
      <div class="content-container">
        <h1>Kreator drużyny</h1>
        <h2>TODO, steps based: https://ng.ant.design/components/steps/en</h2>
      </div>
    </div>
  `
})
export class TeamCreatorPageComponent {
  items = [
    {title: 'Drużyna', link: '/team'}, {title: 'Kreator'}
  ];
}
