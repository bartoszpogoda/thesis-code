import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TeamRoutingModule } from './team-routing.module';
import {CoreModule} from '../core/core.module';
import {TeamPageComponent} from './containers/team-page.component';
import { TeamJoinPageComponent } from './containers/team-join-page.component';
import {TeamJoinRedirectGuard} from './services/team-join-redirect-guard';
import {NgZorroAntdModule, NzDividerModule} from 'ng-zorro-antd';
import {ReceivedInvitationComponent} from './components/received-invitation.component';
import {TeamDisplayComponent} from './components/team-display.component';
import {TeamManagerPageComponent} from './containers/manager/team-manager-page.component';
import {IsManagerGuard} from './services/is-manager.guard';
import {TeamCreatorPageComponent} from './containers/creator/team-creator-page.component';
import {PlayerModule} from '../player/player.module';
import {TeamRecruitmentPageComponent} from './containers/manager/team-recruitment-page.component';
import {ReactiveFormsModule} from '@angular/forms';
import {SentInvitationComponent} from './components/sent-invitation.component';
import {CreatorBaseDataComponent} from './components/creator-base-data.component';
import {PlayerCardComponent} from './components/player-card.component';
import {PointPickerComponent} from './components/point-picker.component';
import {NguiMapModule} from '@ngui/map';
import {TeamManagerHomePageComponent} from './containers/manager/team-manager-home-page.component';
import {TeamCreatorLoadPhotoComponent} from './containers/creator/team-creator-load-photo.component';

export const COMPONENTS = [TeamPageComponent, TeamJoinPageComponent, ReceivedInvitationComponent, TeamDisplayComponent,
  TeamManagerPageComponent, TeamCreatorPageComponent, TeamRecruitmentPageComponent, SentInvitationComponent,
  CreatorBaseDataComponent, PlayerCardComponent, PointPickerComponent, TeamManagerHomePageComponent,
  TeamCreatorLoadPhotoComponent];

@NgModule({
  imports: [
    CommonModule,
    TeamRoutingModule,
    CoreModule,
    NgZorroAntdModule,
    ReactiveFormsModule,
    NguiMapModule
  ],
  declarations: [COMPONENTS],
  exports: [COMPONENTS],
  providers: [TeamJoinRedirectGuard, IsManagerGuard]
})
export class TeamModule { }
