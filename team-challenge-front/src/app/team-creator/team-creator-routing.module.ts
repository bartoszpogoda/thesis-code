import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {TeamCreatorPageComponent} from './containers/team-creator-page.component';

const routes: Routes = [
  {
    path: '',
    component: TeamCreatorPageComponent,
    canActivate: [] // TODO should activate when has team
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TeamCreatorRoutingModule { }
