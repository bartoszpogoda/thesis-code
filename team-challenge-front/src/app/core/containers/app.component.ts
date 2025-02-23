import {Component, OnDestroy} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {Observable, Subscription, timer} from 'rxjs';

import * as fromRoot from '../reducers/index';
import * as fromAuth from '../../auth/reducers';
import * as fromPending from '../reducers/pending.reducer';
import * as LayoutActions from '../actions/layout.actions';
import * as CoreActions from '../actions/core.actions';
import {DecodedToken} from '../../auth/models/token';
import {TokenService} from '../../auth/service/token.service';
import {map, skipUntil} from 'rxjs/operators';
import {selectPlayerAvatarUrl, selectPlayerProfileNotExisting} from '../selectors/my-player.selectors';
import {selectMyPlayerNotificationsAny} from '../selectors/notification.selectors';
import {selectHasTeam, selectIsMyTeamActive, selectIsMyTeamReadyForChallenge} from '../selectors/my-team.selectors';
import {Router} from '@angular/router';
import {selectStep} from '../../challenge/selectors/challenge-creator.selectors';

@Component({
  selector: 'app-app',
  // changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <app-progress [inProgress]="(globalPending$ | async) > 0" id="globalPending"></app-progress>
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
              <app-nav-item title="Rejestracja"></app-nav-item>
            </li>
            <li *ngIf="loggedIn$ | async" nz-menu-item routerLinkActive="ant-menu-item-selected" routerLink="community">
              <app-nav-item title="Społeczność" icon="home"></app-nav-item>
            </li>
            <li *ngIf="loggedIn$ | async" [class.disabled]="!(hasTeam$ | async) && !(isMyTeamReadyForChallenge$ | async)"
                nz-menu-item routerLinkActive="ant-menu-item-selected" routerLink="challenges">
              <app-nav-item title="Wyzwania" icon="play-circle-o"></app-nav-item>
            </li>
            <li *ngIf="loggedIn$ | async" [class.disabled]="playerNotExisting$ | async"
                nz-menu-item routerLinkActive="ant-menu-item-selected" routerLink="team">
              <app-nav-item title="Moja drużyna" [notify]="myTeamHasNotifications$ | async" icon="team"></app-nav-item>
            </li>
            <li *ngIf="loggedIn$ | async" nz-menu-item routerLinkActive="ant-menu-item-selected" routerLink="player">
              <app-nav-item title="Mój profil" [notify]="myPlayerHasNotifications$ | async" icon="user"></app-nav-item>
            </li>
          </ul>
        </div>
        <div *ngIf="isMyTeamReadyForChallenge$ | async">
          <button class="ghost-button" [disabled]="isOnNewChallengePage()" (click)="onEnterChallengeCreator()"
                  nz-button nzType="primary" nzGhost>
            <ng-container *ngIf="(challengeCreatorStep$ | async) > 0">
              Powrót do tworzonego wyzwania
            </ng-container>
            <ng-container *ngIf="(challengeCreatorStep$ | async) === 0">
              Szukaj rywali
            </ng-container>
          </button>
        </div>
        <!--<app-login *ngIf="!(loggedIn$ | async)"></app-login>-->
        <app-navbar-login class="onlyDesktop" *ngIf="!(loggedIn$ | async)"></app-navbar-login>
        <ul *ngIf="loggedIn$ | async" nz-menu class="onlyDesktop" [nzTheme]="'dark'" [nzMode]="'horizontal'" style="line-height: 64px;">
          <nz-badge class="avatar-badge" (click)="toggleNotificationPanel()" [nzCount]="0" style="margin-right: 24px;">
            <span class="avatar-username">{{(decodedToken$ | async).fullName}}</span>
            <!-- TODO extract dumb component -->
            <nz-avatar [nzSize]="'large'" [nzSrc]="this.avatarUrl$ | async"></nz-avatar> <!--nzIcon="anticon anticon-user"-->
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
      <nz-footer>
        <app-footer></app-footer>
      </nz-footer>
    </nz-layout>
  `
})
export class AppComponent implements OnDestroy {
  // breadcrumbItems = ['Home', 'App', 'Temp'];
  loggedIn$: Observable<boolean>;
  avatarUrl$: Observable<string>;
  // loginPending$: Observable<boolean>;
  notificationPanelVisible$: Observable<boolean>;
  decodedToken$: Observable<DecodedToken>;
  playerNotExisting$: Observable<boolean>;
  myPlayerHasNotifications$: Observable<boolean>;
  myTeamHasNotifications$: Observable<boolean>;
  hasTeam$: Observable<boolean>;
  isMyTeamReadyForChallenge$: Observable<boolean>;
  challengeCreatorStep$: Observable<number>;

  periodicRenewalSub: Subscription;

  globalPending$: Observable<number>;

  constructor(private store: Store<fromRoot.State>, private tokenService: TokenService, private router: Router) {
    this.notificationPanelVisible$ = this.store.pipe(select(fromRoot.getShowNotificationsPanel));
    this.loggedIn$ = this.store.pipe(select(fromAuth.selectLoggedIn));
    this.decodedToken$ = this.store.pipe(select(fromAuth.selectDecodedToken));
    // this.loginPending$ = this.store.pipe(select(fromAuth.selectLoginPending));
    this.playerNotExisting$ = this.store.pipe(select(selectPlayerProfileNotExisting));
    this.hasTeam$ = this.store.pipe(select(selectHasTeam));
    this.globalPending$ = this.store.pipe(select(fromRoot.selectPending));
    this.avatarUrl$ = this.store.pipe(select(selectPlayerAvatarUrl));
    this.isMyTeamReadyForChallenge$ = this.store.pipe(select(selectIsMyTeamReadyForChallenge));
    this.challengeCreatorStep$ = this.store.pipe(select(selectStep));

    this.myPlayerHasNotifications$ = this.store.pipe(
      select(selectMyPlayerNotificationsAny));

    this.store.dispatch(new CoreActions.EnterApplication());
    this.periodicRenewalSub = this.tokenService.startPeriodicRenewal();
  }

  toggleNotificationPanel() {
    this.store.dispatch(new LayoutActions.ToggleNotifications());
  }

  ngOnDestroy(): void {
    this.periodicRenewalSub.unsubscribe();
  }

  onEnterChallengeCreator() {
    this.router.navigate(['/challenges/new']);
  }

  isOnNewChallengePage() {
    return this.router.isActive('/challenges/new', true);
  }
}
