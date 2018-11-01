import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CommunityRoutingModule } from './community-routing.module';
import {CoreModule} from '../core/core.module';
import {CommunityPageComponent} from './containers/community-page.component';
import {CommunityPlayersPageComponent} from './containers/community-players-page.component';
import {CommunityTeamsPageComponent} from './containers/community-teams-page.component';
import {NgZorroAntdModule} from 'ng-zorro-antd';
import {StoreModule} from '@ngrx/store';
import {reducers} from './reducers';
import {EffectsModule} from '@ngrx/effects';
import {CommunityEffects} from './effects/community.effects';
import {CommunityService} from './service/community.service';
import {CommunityTeamsProfilePageComponent} from './containers/community-teams-profile-page.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CommunityFacilitiesPageComponent} from './containers/community-facilities-page.component';
import {CommunityFacilitiesProfilePageComponent} from './containers/community-facilities-profile-page.component';

export const COMPONENTS = [CommunityPageComponent, CommunityPlayersPageComponent, CommunityTeamsPageComponent,
  CommunityTeamsProfilePageComponent, CommunityFacilitiesPageComponent, CommunityFacilitiesProfilePageComponent];

@NgModule({
  imports: [
    CommonModule,
    CommunityRoutingModule,
    CoreModule,
    NgZorroAntdModule,
    FormsModule,
    ReactiveFormsModule,
    StoreModule.forFeature('community', reducers),
    EffectsModule.forFeature([CommunityEffects]),
  ],
  declarations: [COMPONENTS],
  exports: [COMPONENTS],
  providers: [CommunityService]
})
export class CommunityModule { }
