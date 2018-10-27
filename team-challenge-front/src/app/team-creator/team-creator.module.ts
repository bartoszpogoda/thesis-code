import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {CreatorBaseDataComponent} from './components/creator-base-data.component';
import {TeamCreatorLoadPhotoComponent} from './containers/team-creator-load-photo.component';
import {TeamCreatorPageComponent} from './containers/team-creator-page.component';
import {CoreModule} from '../core/core.module';
import {NgZorroAntdModule} from 'ng-zorro-antd';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {StoreModule} from '@ngrx/store';
import {EffectsModule} from '@ngrx/effects';
import {TeamCreatorRoutingModule} from './team-creator-routing.module';
import {TeamCreatorEffects} from './store/team-creator.effects';
import {reducer} from './store/team-creator.reducer';

export const COMPONENTS = [TeamCreatorLoadPhotoComponent, TeamCreatorPageComponent, CreatorBaseDataComponent];

@NgModule({
  imports: [
    CommonModule,
    CoreModule,
    NgZorroAntdModule,
    FormsModule,
    ReactiveFormsModule,
    TeamCreatorRoutingModule,
    StoreModule.forFeature('teamCreator', reducer),
    EffectsModule.forFeature([TeamCreatorEffects])
  ],
  declarations: [COMPONENTS]
})
export class TeamCreatorModule { }
