import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FacilityCreatorBaseDataComponent} from './components/facility-creator-base-data.component';
import {FacilityCreatorPageComponent} from './containers/facility-creator-page.component';
import {CoreModule} from '../core/core.module';
import {NgZorroAntdModule} from 'ng-zorro-antd';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {StoreModule} from '@ngrx/store';
import {EffectsModule} from '@ngrx/effects';
import {FacilityCreatorRoutingModule} from './facility-creator-routing.module';
import {FacilityCreatorEffects} from './store/facility-creator.effects';
import {reducer} from './store/facility-creator.reducer';
import {FacilityCreatorDetailedDataComponent} from './components/facility-creator-detailed-data.component';
import {FacilityCreatorPositionComponent} from './components/facility-creator-position.component';

export const COMPONENTS = [FacilityCreatorPageComponent, FacilityCreatorBaseDataComponent, FacilityCreatorDetailedDataComponent,
  FacilityCreatorPositionComponent];

@NgModule({
  imports: [
    CommonModule,
    CoreModule,
    NgZorroAntdModule,
    FormsModule,
    ReactiveFormsModule,
    FacilityCreatorRoutingModule,
    StoreModule.forFeature('facilityCreator', reducer),
    EffectsModule.forFeature([FacilityCreatorEffects])
  ],
  declarations: [COMPONENTS]
})
export class FacilityCreatorModule { }
