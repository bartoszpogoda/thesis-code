import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CommunityRoutingModule } from './community-routing.module';
import {CoreModule} from '../core/core.module';
import {PlayerProfilePageComponent} from '../player/containers/player-profile-page.component';
import {CommunityPageComponent} from './containers/community-page.component';

export const COMPONENTS = [CommunityPageComponent];

@NgModule({
  imports: [
    CommonModule,
    CommunityRoutingModule,
    CoreModule
  ],
  declarations: [COMPONENTS],
  exports: [COMPONENTS]
})
export class CommunityModule { }
