import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { AppComponent } from './containers/app.component';
import {NotFoundPageComponent} from './containers/not-found-page.component';
import {en_US, NgZorroAntdModule, NZ_I18N, NZ_MESSAGE_CONFIG} from 'ng-zorro-antd';
import {BreadcrumbComponent} from './components/breadcrumb.component';
import {FooterComponent} from './components/footer.component';
import {NavItemComponent} from './components/nav-item.component';
import {NotificationBellComponent} from './components/notification-bell.component';
import {NotificationPanelComponent} from './containers/notification-panel.component';
import {NgProgressModule} from '@ngx-progressbar/core';
import {AuthModule} from '../auth/auth.module';
import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {ErrorInterceptor} from './service/error.interceptor';
import {ApiErrorAlertComponent} from './components/api-error-alert.component';
import {NavbarLoginComponent} from './containers/navbar-login.component';
import {SuccessAlertComponent} from './components/success-alert.component';
import {ProgressComponent} from './components/progress.component';
import {TeamService} from './service/team.service';
import {EffectsModule} from '@ngrx/effects';
import {TeamEffects} from './effects/team.effects';
import {ManagerEffects} from './effects/manager.effects';
import {ImageLoaderComponent} from './components/image-loader.component';
import {TeamCardComponent} from './components/team-card.component';
import {TeamCreatorEffects} from '../team-creator/store/team-creator.effects';
import {PlayerCreatorEffects} from '../player-creator/store/player-creator.effects';
import {PlayerEffects} from './effects/player.effects';
import {CoreRoutingModule} from './core-routing.module';
import {PlayerService} from './service/player.service';
import {PlayerCreatorGuard} from './guard/player-creator-guard.service';
import {PlayerProfilePageComponent} from './containers/player-profile-page.component';
import {PlayerProfileComponent} from './components/player-profile.component';
import {TeamPageComponent} from './containers/team-page.component';
import {TeamJoinPageComponent} from './containers/team-join-page.component';
import {ReceivedInvitationComponent} from './components/received-invitation.component';
import {TeamDisplayComponent} from './components/team-display.component';
import {TeamManagerPageComponent} from './containers/team-manager-page.component';
import {TeamRecruitmentPageComponent} from './containers/team-recruitment-page.component';
import {SentInvitationComponent} from './components/sent-invitation.component';
import {PlayerCardComponent} from './components/player-card.component';
import {PointPickerComponent} from './components/point-picker.component';
import {TeamManagerHomePageComponent} from './containers/team-manager-home-page.component';
import {ReactiveFormsModule} from '@angular/forms';
import {NguiMapModule} from '@ngui/map';
import {TeamJoinRedirectGuard} from './guard/team-join-redirect-guard';
import {IsManagerGuard} from './guard/is-manager.guard';

export const COMPONENTS = [
  AppComponent,
  NotFoundPageComponent,
  BreadcrumbComponent,
  FooterComponent,
  NavItemComponent,
  NotificationBellComponent,
  NotificationPanelComponent,
  ApiErrorAlertComponent,
  SuccessAlertComponent,
  NavbarLoginComponent,
  ProgressComponent,
  ImageLoaderComponent,
  TeamCardComponent,
  PlayerProfilePageComponent,
  PlayerProfileComponent,
  TeamPageComponent, TeamJoinPageComponent, ReceivedInvitationComponent, TeamDisplayComponent,
  TeamManagerPageComponent, TeamRecruitmentPageComponent, SentInvitationComponent, PlayerCardComponent,
  PointPickerComponent, TeamManagerHomePageComponent,
];

@NgModule({
  imports: [CommonModule, RouterModule, NgZorroAntdModule, AuthModule, CoreRoutingModule,
    NguiMapModule, ReactiveFormsModule,
    NgProgressModule.forRoot(),
    EffectsModule.forFeature([TeamEffects, ManagerEffects, PlayerEffects])],
  declarations: COMPONENTS,
  exports: COMPONENTS,
  providers: [{ provide: NZ_I18N, useValue: en_US }, {
    provide: HTTP_INTERCEPTORS,
    useClass: ErrorInterceptor,
    multi: true,
  }, { provide: NZ_MESSAGE_CONFIG, useValue: { nzDuration: 5000 }},
    TeamService, PlayerService, PlayerCreatorGuard, TeamJoinRedirectGuard, IsManagerGuard]
})
export class CoreModule {
  static forRoot() {
    return {
      ngModule: CoreModule,
      providers: [],
    };
  }
}
