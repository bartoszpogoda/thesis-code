import { Component } from '@angular/core';

@Component({
  selector: 'app-app',
  // changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <nz-layout class="layout">
      <nz-header>
        <div class="logo" routerLink="/"></div>
        <ul nz-menu class="onlyDesktop" [nzTheme]="'dark'" [nzMode]="'horizontal'" style="line-height: 64px;">
          <li nz-menu-item routerLink="/"><app-nav-item title="Home" icon="home"></app-nav-item></li>
          <li nz-menu-item routerLink="challenges">
            <app-nav-item title="Challenges" [badgeCount]="2" icon="play-circle-o"></app-nav-item></li>
          <li nz-menu-item routerLink="team"><app-nav-item title="Team" icon="team"></app-nav-item></li>
          <li nz-menu-item routerLink="player"><app-nav-item title="Player" icon="user"></app-nav-item></li>
          <li class="pull-right notification-bell">
            <app-notification-bell [badgeCount]="4" (bellClicked)="toggleNotificationPanel()"></app-notification-bell>
          </li>
        </ul>
      </nz-header>
      <nz-content>
        <app-breadcrumb [items]="breadcrumbItems"></app-breadcrumb>
        <div class="content-container">
          <router-outlet></router-outlet>
        </div>
        <app-notification-panel [isVisible]="notificationPanelVisible"></app-notification-panel>
      </nz-content>
      <nz-footer><app-footer></app-footer></nz-footer>
    </nz-layout>
  `
})
export class AppComponent {
  breadcrumbItems = ['Home', 'App', 'Temp'];
  notificationPanelVisible = false;

  toggleNotificationPanel() {
    this.notificationPanelVisible = !this.notificationPanelVisible;
  }
}
