import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TeamRoutingModule } from './team-routing.module';
import {CoreModule} from '../core/core.module';
import {TeamPageComponent} from './containers/team-page.component';

export const COMPONENTS = [TeamPageComponent];

@NgModule({
  imports: [
    CommonModule,
    TeamRoutingModule,
    CoreModule
  ],
  declarations: [COMPONENTS],
  exports: [COMPONENTS]
})
export class TeamModule { }
