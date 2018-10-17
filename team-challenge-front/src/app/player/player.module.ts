import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PlayerRoutingModule } from './player-routing.module';
import {PlayerProfilePageComponent} from './containers/player-profile-page.component';
import {CoreModule} from '../core/core.module';
import {HttpClientModule} from '@angular/common/http';
import {StoreModule} from '@ngrx/store';
import {EffectsModule} from '@ngrx/effects';
import {AuthEffects} from '../auth/effects/auth.effects';
import {PlayerEffects} from '../core/effects/player.effects';
import {PlayerService} from '../core/services/player.service';
import {PlayerRegistrationComponent} from './components/player-registration.component';
import {RouterModule} from '@angular/router';
import {NgZorroAntdModule} from 'ng-zorro-antd';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NgProgress, NgProgressModule} from '@ngx-progressbar/core';

export const COMPONENTS = [PlayerProfilePageComponent, PlayerRegistrationComponent];

@NgModule({
  imports: [
    CommonModule,
    PlayerRoutingModule,
    CoreModule,
    HttpClientModule,
    NgZorroAntdModule, FormsModule, ReactiveFormsModule,
    NgProgressModule.forRoot({
      spinner: false,
      thick: true
    })
  ],
  declarations: [COMPONENTS],
  exports: [COMPONENTS],
  providers: [PlayerService]
})
export class PlayerModule { }
