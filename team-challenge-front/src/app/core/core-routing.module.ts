import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {PlayerProfilePageComponent} from './containers/player-profile-page.component';
import {PlayerCreatorGuard} from './guard/player-creator-guard.service';
import {TeamPageComponent} from './containers/team-page.component';
import {TeamJoinRedirectGuard} from './guard/team-join-redirect-guard';
import {TeamJoinPageComponent} from './containers/team-join-page.component';
import {TeamManagerPageComponent} from './containers/team-manager-page.component';
import {IsManagerGuard} from './guard/is-manager.guard';
import {TeamRecruitmentPageComponent} from './containers/team-recruitment-page.component';
import {TeamManagerHomePageComponent} from './containers/team-manager-home-page.component';

const routes: Routes = [
  {
    path: 'player',
    component: PlayerProfilePageComponent,
    canActivate: [PlayerCreatorGuard],
    canActivateChild: []
  },
  {
    path: 'player/new',
    loadChildren: './../player-creator/player-creator.module#PlayerCreatorModule'
  },
  {
    path: 'team',
    component: TeamPageComponent,
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
    path: 'team/manager',
    component: TeamManagerPageComponent,
    canActivate: [IsManagerGuard]
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
