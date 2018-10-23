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
import {TeamManagerPageComponent} from './containers/team-manager-page.component';
import {IsManagerGuard} from './services/is-manager.guard';
import {TeamCreatorPageComponent} from './containers/team-creator-page.component';
import {PlayerModule} from '../player/player.module';
import {TeamRecruitmentPageComponent} from './containers/team-recruitment-page.component';
import {ReactiveFormsModule} from '@angular/forms';
import {SentInvitationComponent} from './components/sent-invitation.component';
import {CreatorBaseDataComponent} from './components/creator-base-data.component';

export const COMPONENTS = [TeamPageComponent, TeamJoinPageComponent, ReceivedInvitationComponent, TeamDisplayComponent,
  TeamManagerPageComponent, TeamCreatorPageComponent, TeamRecruitmentPageComponent, SentInvitationComponent,
  CreatorBaseDataComponent];

@NgModule({
  imports: [
    CommonModule,
    TeamRoutingModule,
    CoreModule,
    NgZorroAntdModule,
    ReactiveFormsModule
  ],
  declarations: [COMPONENTS],
  exports: [COMPONENTS],
  providers: [TeamJoinRedirectGuard, IsManagerGuard]
})
export class TeamModule { }
