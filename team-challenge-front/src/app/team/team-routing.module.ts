import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {TeamPageComponent} from './containers/team-page.component';
import {TeamJoinPageComponent} from './containers/team-join-page.component';
import {TeamJoinRedirectGuard} from './services/team-join-redirect-guard';
import {TeamManagerPageComponent} from './containers/team-manager-page.component';
import {IsManagerGuard} from './services/is-manager.guard';

const routes: Routes = [
  {
    path: '',
    component: TeamPageComponent,
    canActivate: [TeamJoinRedirectGuard]
  },
  {
    path: 'join',
    component: TeamJoinPageComponent
  },
  {
    path: 'manager',
    component: TeamManagerPageComponent,
    canActivate: [IsManagerGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TeamRoutingModule { }
