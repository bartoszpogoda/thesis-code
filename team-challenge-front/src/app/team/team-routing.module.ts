import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {TeamPageComponent} from './containers/team-page.component';
import {TeamJoinPageComponent} from './containers/team-join-page.component';
import {TeamJoinRedirectGuard} from './services/team-join-redirect-guard';
import {TeamManagerPageComponent} from './containers/manager/team-manager-page.component';
import {IsManagerGuard} from './services/is-manager.guard';
import {TeamRecruitmentPageComponent} from './containers/manager/team-recruitment-page.component';
import {TeamCreatorPageComponent} from './containers/creator/team-creator-page.component';
import {TeamManagerHomePageComponent} from './containers/manager/team-manager-home-page.component';

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
  },
  {
    path: 'manager/recruitment',
    component: TeamRecruitmentPageComponent,
    canActivate: [IsManagerGuard]
  },
  {
    path: 'manager/home',
    component: TeamManagerHomePageComponent,
    canActivate: [IsManagerGuard]
  },
  {
    path: 'creator',
    component: TeamCreatorPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TeamRoutingModule { }
