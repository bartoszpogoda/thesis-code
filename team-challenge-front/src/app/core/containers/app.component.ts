import {Component, OnDestroy} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {Observable, Subscription, timer} from 'rxjs';

import * as fromRoot from '../../reducers';
import * as fromAuth from '../../auth/reducers';
import * as LayoutActions from '../actions/layout.actions';
import * as CoreActions from '../actions/core.actions';
import {DecodedToken} from '../../auth/models/token';
import {TokenService} from '../../auth/service/token.service';
import {skipUntil} from 'rxjs/operators';

@Component({
  selector: 'app-app',
  // changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <app-progress [inProgress]="loginPending$ | async" id="loginPending"></app-progress>
    <nz-layout class="layout">
      <nz-header class="app-header" #top>
        <div>
        <div class="logo" routerLink="/"></div>
        <ul nz-menu class="onlyDesktop" [nzTheme]="'dark'" [nzMode]="'horizontal'" style="line-height: 64px;">
          <li *ngIf="!(loggedIn$ | async)" nz-menu-item
              routerLinkActive="ant-menu-item-selected" routerLink="/home" [routerLinkActiveOptions]="{exact: true}">
            <app-nav-item title="Strona główna" icon="home"></app-nav-item>
          </li>
          <li *ngIf="!(loggedIn$ | async)" nz-menu-item routerLinkActive="ant-menu-item-selected" routerLink="/home/register">
            <app-nav-item title="Rejestracja"></app-nav-item></li>
          <li *ngIf="loggedIn$ | async" nz-menu-item routerLinkActive="ant-menu-item-selected" routerLink="community">
            <app-nav-item title="Społeczność" icon="home"></app-nav-item></li>
          <li *ngIf="loggedIn$ | async" [class.disabled]="!(hasTeam$ | async)"
              nz-menu-item routerLinkActive="ant-menu-item-selected" routerLink="challenges">
            <app-nav-item title="Wyzwania" icon="play-circle-o"></app-nav-item></li>
          <li *ngIf="loggedIn$ | async" [class.disabled]="playerNotExisting$ | async"
              nz-menu-item routerLinkActive="ant-menu-item-selected" routerLink="team">
            <app-nav-item title="Drużyna" icon="team"></app-nav-item>
          </li>
          <li *ngIf="loggedIn$ | async" nz-menu-item routerLinkActive="ant-menu-item-selected" routerLink="player">
            <app-nav-item title="Zawodnik" [notify]="playerHasNotifications$ | async" icon="user"></app-nav-item>
          </li>
        </ul>
        </div>
        <!--<app-login *ngIf="!(loggedIn$ | async)"></app-login>-->
        <app-navbar-login class="onlyDesktop" *ngIf="!(loggedIn$ | async)"></app-navbar-login>
        <ul *ngIf="loggedIn$ | async" nz-menu class="onlyDesktop" [nzTheme]="'dark'" [nzMode]="'horizontal'" style="line-height: 64px;">
          <nz-badge class="avatar-badge" (click)="toggleNotificationPanel()" [nzCount]="5" style="margin-right: 24px;">
            <span class="avatar-username">{{(decodedToken$ | async).fullName}}</span>
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
export class AppComponent implements OnDestroy {
  // breadcrumbItems = ['Home', 'App', 'Temp'];
  loggedIn$: Observable<boolean>;
  loginPending$: Observable<boolean>;
  notificationPanelVisible$: Observable<boolean>;
  decodedToken$: Observable<DecodedToken>;
  playerNotExisting$: Observable<boolean>;
  playerHasNotifications$: Observable<boolean>;
  hasTeam$: Observable<boolean>;
  periodicRenewalSub: Subscription;

  constructor(private store: Store<fromRoot.State>, private tokenService: TokenService) {
    this.notificationPanelVisible$ = this.store.pipe(select(fromRoot.getShowNotificationsPanel));
    this.loggedIn$ = this.store.pipe(select(fromAuth.selectLoggedIn));
    this.decodedToken$ = this.store.pipe(select(fromAuth.selectDecodedToken));
    this.loginPending$ = this.store.pipe(select(fromAuth.selectLoginPending));
    this.playerNotExisting$ = this.store.pipe(select(fromRoot.selectPlayerProfileNotExisting));
    this.hasTeam$ = this.store.pipe(select(fromRoot.selectHasTeam));

    this.playerHasNotifications$ = this.store.pipe(
      select(fromRoot.selectPlayerProfileHasAnyNotifications));

    this.store.dispatch(new CoreActions.EnterApplication());
    this.periodicRenewalSub = this.tokenService.startPeriodicRenewal();
  }

  toggleNotificationPanel() {
    this.store.dispatch(new LayoutActions.ToggleNotifications());
  }

  ngOnDestroy(): void {
    this.periodicRenewalSub.unsubscribe();
  }
}
