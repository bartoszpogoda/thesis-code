import {Component, OnDestroy, OnInit} from '@angular/core';

@Component({
  selector: 'app-team-recruitment-page',
  template: `
    <div class="spaces-sides">
      <app-breadcrumb [items]="items"></app-breadcrumb>
      <div class="content-container">
        <app-team-recruitment></app-team-recruitment>
      </div>
    </div>
  `
})

export class TeamRecruitmentPageComponent {
  items = [
    {title: 'Moja drużyna', link: '/team'}, {title: 'Zarządzanie', link: '/team/manager'}, {title: 'Rekrutacja'}
  ];

}
