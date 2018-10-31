import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {FacilityCreatorPageComponent} from './containers/facility-creator-page.component';

const routes: Routes = [
  {
    path: '',
    component: FacilityCreatorPageComponent,
    canActivate: [] // TODO should activate when has team
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FacilityCreatorRoutingModule { }
