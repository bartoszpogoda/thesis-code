import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PlayerRoutingModule } from './player-routing.module';
import {PlayerProfilePageComponent} from './containers/player-profile-page.component';
import {CoreModule} from '../core/core.module';

export const COMPONENTS = [PlayerProfilePageComponent];

@NgModule({
  imports: [
    CommonModule,
    PlayerRoutingModule,
    CoreModule
  ],
  declarations: [COMPONENTS],
  exports: [COMPONENTS]
})
export class PlayerModule { }
