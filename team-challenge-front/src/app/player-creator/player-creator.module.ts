import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {StoreModule} from '@ngrx/store';
import {EffectsModule} from '@ngrx/effects';
import {PlayerProfileCreatorPageComponent} from './containers/player-profile-creator-page.component';
import {PlayerRegistrationComponent} from './components/player-registration.component';
import {PlayerCreatorLoadPhotoComponent} from './containers/player-creator-load-photo.component';
import {CoreModule} from '../core/core.module';
import {HttpClientModule} from '@angular/common/http';
import {NgZorroAntdModule} from 'ng-zorro-antd';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {PlayerCreatorRoutingModule} from './player-creator-routing.module';
import {PlayerCreatorEffects} from './store/player-creator.effects';
import {reducer} from './store/player-creator.reducer';
import {PlayerSkillFormComponent} from './components/player-skill-form.component';

export const COMPONENTS = [PlayerProfileCreatorPageComponent, PlayerRegistrationComponent, PlayerCreatorLoadPhotoComponent, PlayerSkillFormComponent];
export const EXPORED_COMPONENTS = [];

@NgModule({
  imports: [
    CommonModule,
    CoreModule,
    HttpClientModule,
    NgZorroAntdModule,
    FormsModule,
    ReactiveFormsModule,
    PlayerCreatorRoutingModule,
    StoreModule.forFeature('playerCreator', reducer),
    EffectsModule.forFeature([PlayerCreatorEffects])
  ],
  declarations: [COMPONENTS],
  exports: [EXPORED_COMPONENTS],
  providers: []
})
export class PlayerCreatorModule { }
