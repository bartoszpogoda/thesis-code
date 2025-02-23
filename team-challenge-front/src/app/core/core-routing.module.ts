import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {MyPlayerPageComponent} from './containers/my-player-page.component';
import {PlayerCreatorGuard} from './guard/player-creator-guard.service';
import {MyTeamPageComponent} from './containers/my-team-page.component';
import {TeamJoinRedirectGuard} from './guard/team-join-redirect-guard';
import {TeamJoinPageComponent} from './containers/team-join-page.component';
import {IsManagerGuard} from './guard/is-manager.guard';
import {TeamRecruitmentPageComponent} from './containers/team-recruitment-page.component';
import {TeamManagerHomePageComponent} from './containers/team-manager-home-page.component';

const routes: Routes = [
  {
    path: 'player',
    component: MyPlayerPageComponent,
    canActivate: [PlayerCreatorGuard],
    canActivateChild: []
  },
  {
    path: 'player/new',
    loadChildren: './../player-creator/player-creator.module#PlayerCreatorModule'
  },
  {
    path: 'team',
    component: MyTeamPageComponent,
    canActivate: [TeamJoinRedirectGuard]
  },
  {
    path: 'team/new',
    loadChildren: './../team-creator/team-creator.module#TeamCreatorModule'
  },
  {
    path: 'team/join',
    component: TeamJoinPageComponent
  },
  {
    path: 'team/manager/recruitment',
    component: TeamRecruitmentPageComponent,
    canActivate: [IsManagerGuard]
  },
  {
    path: 'team/manager/home',
    component: TeamManagerHomePageComponent,
    canActivate: [IsManagerGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CoreRoutingModule { }
