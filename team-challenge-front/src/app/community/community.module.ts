import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CommunityRoutingModule } from './community-routing.module';
import {CoreModule} from '../core/core.module';
import {PlayerProfilePageComponent} from '../player/containers/player-profile-page.component';
import {CommunityPageComponent} from './containers/community-page.component';
import {CommunityPlayersPageComponent} from './containers/community-players-page.component';
import {CommunityTeamsPageComponent} from './containers/community-teams-page.component';
import {NgZorroAntdModule} from 'ng-zorro-antd';
import {HttpClientModule} from '@angular/common/http';
import {StoreModule} from '@ngrx/store';
import {reducers} from './reducers';
import {EffectsModule} from '@ngrx/effects';
import {AuthEffects} from '../auth/effects/auth.effects';
import {CommunityEffects} from './effects/community.effects';
import {CommunityService} from './service/community.service';
import {CommunityTeamsProfilePageComponent} from './containers/community-teams-profile-page.component';

export const COMPONENTS = [CommunityPageComponent, CommunityPlayersPageComponent, CommunityTeamsPageComponent,
  CommunityTeamsProfilePageComponent];

@NgModule({
  imports: [
    CommonModule,
    CommunityRoutingModule,
    CoreModule,
    NgZorroAntdModule,
    StoreModule.forFeature('community', reducers),
    EffectsModule.forFeature([CommunityEffects]),
  ],
  declarations: [COMPONENTS],
  exports: [COMPONENTS],
  providers: [CommunityService]
})
export class CommunityModule { }
