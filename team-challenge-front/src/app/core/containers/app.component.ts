import { Component } from '@angular/core';

@Component({
  selector: 'app-app',
  // changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <nz-layout class="layout">
      <nz-header class="app-header" #top>
        <div>
        <div class="logo" routerLink="/"></div>
        <ul nz-menu class="onlyDesktop" [nzTheme]="'dark'" [nzMode]="'horizontal'" style="line-height: 64px;">
          <li nz-menu-item routerLink="/"><app-nav-item title="Home" icon="home"></app-nav-item></li>
          <li *ngIf="loggedIn" nz-menu-item routerLink="challenges">
            <app-nav-item title="Challenges" [notify]="true" icon="play-circle-o"></app-nav-item></li>
          <li *ngIf="loggedIn" nz-menu-item routerLink="team"><app-nav-item title="Team" icon="team"></app-nav-item></li>
          <li *ngIf="loggedIn" nz-menu-item routerLink="player"><app-nav-item title="Player" icon="user"></app-nav-item></li>
        </ul>
        </div>
        <app-login *ngIf="!loggedIn"></app-login>
        <ul *ngIf="loggedIn" nz-menu class="onlyDesktop" [nzTheme]="'dark'" [nzMode]="'horizontal'" style="line-height: 64px;">
          <li class="pull-right notification-bell">
            <app-notification-bell [badgeCount]="4" (bellClicked)="toggleNotificationPanel()"></app-notification-bell>
          </li>
        </ul>
      </nz-header>
      <nz-content>
        <!--<app-breadcrumb [items]="breadcrumbItems"></app-breadcrumb>-->
          <router-outlet></router-outlet>
        <app-notification-panel [isVisible]="notificationPanelVisible"></app-notification-panel>
        <nz-back-top></nz-back-top>
      </nz-content>
      <nz-footer><app-footer></app-footer></nz-footer>
    </nz-layout>
  `
})
export class AppComponent {
  // breadcrumbItems = ['Home', 'App', 'Temp'];
  notificationPanelVisible = false;
  loggedIn = false;

  toggleNotificationPanel() {
    this.notificationPanelVisible = !this.notificationPanelVisible;
  }
}
