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
import {MyTeamEffects} from './effects/my-team.effects';
import {ManagerEffects} from './effects/manager.effects';
import {ImageLoaderComponent} from './components/image-loader.component';
import {TeamCardComponent} from './components/team-card.component';
import {PlayerEffects} from './effects/player.effects';
import {CoreRoutingModule} from './core-routing.module';
import {PlayerService} from './service/player.service';
import {PlayerCreatorGuard} from './guard/player-creator-guard.service';
import {MyPlayerPageComponent} from './containers/my-player-page.component';
import {PlayerProfileComponent} from './components/player-profile.component';
import {MyTeamPageComponent} from './containers/my-team-page.component';
import {TeamJoinPageComponent} from './containers/team-join-page.component';
import {ReceivedInvitationComponent} from './components/received-invitation.component';
import {TeamDisplayComponent} from './components/team-display.component';
import {TeamRecruitmentPageComponent} from './containers/team-recruitment-page.component';
import {SentInvitationComponent} from './components/sent-invitation.component';
import {PlayerCardComponent} from './components/player-card.component';
import {PointPickerComponent} from './components/point-picker.component';
import {TeamManagerHomePageComponent} from './containers/team-manager-home-page.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NguiMapModule} from '@ngui/map';
import {TeamJoinRedirectGuard} from './guard/team-join-redirect-guard';
import {IsManagerGuard} from './guard/is-manager.guard';
import {RegionService} from './service/region.service';
import {CoreEffects} from './effects/core.effects';
import {TeamInvitationService} from './service/team-invitation.service';
import {FacilityService} from './service/facility.service';
import {TeamRecruitmentComponent} from './containers/team-recruitment.component';
import {PrototypeNotificationComponent} from './components/prototype-notification.component';
import {RegionFacilityPickerComponent} from './components/region-facility-picker.component';
import {FancyLoadingComponent} from './components/fancy-loading.component';
import {PlayerHorizontalCardComponent} from './components/player-horizontal-card.component';
import {MyTeamPlayersComponent} from './containers/my-team-players.component';
import {MyTeamProfileComponent} from './containers/my-team-profile.component';
import {MyTeamEditDataComponent} from './containers/my-team-edit-data.component';
import {MyTeamManagerRemoveComponent} from './containers/my-team-manager-remove.component';
import {TeamProfileComponent} from './components/team-profile.component';
import {MyPlayerEditProfileComponent} from './containers/my-player-edit-profile.component';
import {MyPlayerRemoveProfileComponent} from './containers/my-player-remove-profile.component';

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
  TeamCardComponent, MyTeamPlayersComponent,
  MyPlayerPageComponent, TeamProfileComponent, MyPlayerEditProfileComponent, MyPlayerRemoveProfileComponent,
  PlayerProfileComponent, MyTeamProfileComponent, MyTeamEditDataComponent, MyTeamManagerRemoveComponent,
  FancyLoadingComponent, PlayerHorizontalCardComponent,
  TeamRecruitmentComponent,
  MyTeamPageComponent, TeamJoinPageComponent, ReceivedInvitationComponent, TeamDisplayComponent,
  TeamRecruitmentPageComponent, SentInvitationComponent, PlayerCardComponent,
  PointPickerComponent, TeamManagerHomePageComponent, PrototypeNotificationComponent, RegionFacilityPickerComponent
];

@NgModule({
  imports: [CommonModule, RouterModule, NgZorroAntdModule, AuthModule, CoreRoutingModule,
    NguiMapModule, ReactiveFormsModule, FormsModule,
    NgProgressModule.forRoot(),
    EffectsModule.forFeature([MyTeamEffects, ManagerEffects, PlayerEffects, CoreEffects])],
  declarations: COMPONENTS,
  exports: COMPONENTS,
  providers: [{ provide: NZ_I18N, useValue: en_US }, {
    provide: HTTP_INTERCEPTORS,
    useClass: ErrorInterceptor,
    multi: true,
  }, { provide: NZ_MESSAGE_CONFIG, useValue: { nzDuration: 5000 }},
    TeamService, PlayerService, RegionService, PlayerCreatorGuard, TeamJoinRedirectGuard,
    IsManagerGuard, TeamInvitationService, FacilityService]
})
export class CoreModule {
  static forRoot() {
    return {
      ngModule: CoreModule,
      providers: [],
    };
  }
}
