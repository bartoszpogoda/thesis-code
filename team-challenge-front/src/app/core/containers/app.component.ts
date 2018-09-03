import { Component } from '@angular/core';
import {select, Store} from '@ngrx/store';
import {Observable} from 'rxjs';

import * as fromRoot from '../../reducers';
import * as fromAuth from '../../auth/reducers';
import * as LayoutActions from '../actions/layout.actions';

@Component({
  selector: 'app-app',
  // changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <nz-layout class="layout">
      <nz-header class="app-header" #top>
        <div>
        <div class="logo" routerLink="/"></div>
        <ul nz-menu class="onlyDesktop" [nzTheme]="'dark'" [nzMode]="'horizontal'" style="line-height: 64px;">
          <li nz-menu-item routerLinkActive="ant-menu-item-selected" routerLink="/home" [routerLinkActiveOptions]="{exact: true}">
            <app-nav-item title="Home" icon="home"></app-nav-item>
          </li>
          <li *ngIf="!(loggedIn$ | async)" nz-menu-item routerLinkActive="ant-menu-item-selected" routerLink="/home/register">
            <app-nav-item title="Register"></app-nav-item></li>
          <li *ngIf="loggedIn$ | async" nz-menu-item routerLinkActive="ant-menu-item-selected" routerLink="challenges">
            <app-nav-item title="Challenges" [notify]="true" icon="play-circle-o"></app-nav-item></li>
          <li *ngIf="loggedIn$ | async" nz-menu-item routerLinkActive="ant-menu-item-selected" routerLink="team">
            <app-nav-item title="Team" icon="team"></app-nav-item>
          </li>
          <li *ngIf="loggedIn$ | async" nz-menu-item routerLinkActive="ant-menu-item-selected" routerLink="player">
            <app-nav-item title="Player" icon="user"></app-nav-item>
          </li>
        </ul>
        </div>
        <!--<app-login *ngIf="!(loggedIn$ | async)"></app-login>-->
        <app-navbar-login class="onlyDesktop" *ngIf="!(loggedIn$ | async)"></app-navbar-login>
        <ul *ngIf="loggedIn$ | async" nz-menu class="onlyDesktop" [nzTheme]="'dark'" [nzMode]="'horizontal'" style="line-height: 64px;">
          <nz-badge class="avatar-badge" (click)="toggleNotificationPanel()" [nzCount]="5" style="margin-right: 24px;">
            <span class="avatar-username">Bartosz Pogoda</span>
            <!-- TODO extract dumb component -->
            <nz-avatar [nzSize]="'large'" nzIcon="anticon anticon-user" ></nz-avatar>
            <!--[nzShape]="'square'"-->
          </nz-badge>
          <!--<li class="pull-right notification-bell">-->
            <!--<app-notification-bell [badgeCount]="4" (bellClicked)="toggleNotificationPanel()"></app-notification-bell>-->
          <!--</li>-->
        </ul>
      </nz-header>
      <nz-content>
          <router-outlet></router-outlet>
        <app-notification-panel [isVisible]="notificationPanelVisible$ | async"></app-notification-panel>
        <nz-back-top></nz-back-top>
      </nz-content>
      <nz-footer><app-footer></app-footer></nz-footer>
    </nz-layout>
  `
})
export class AppComponent {
  // breadcrumbItems = ['Home', 'App', 'Temp'];
  loggedIn$: Observable<boolean>;

  notificationPanelVisible$: Observable<boolean>;

  constructor(private store: Store<fromRoot.State>) {
    this.notificationPanelVisible$ = this.store.pipe(select(fromRoot.getShowNotificationsPanel));
    this.loggedIn$ = this.store.pipe(select(fromAuth.selectLoggedIn));
  }

  toggleNotificationPanel() {
    this.store.dispatch(new LayoutActions.ToggleNotifications());
  }
}
