import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {CommunityPageComponent} from './containers/community-page.component';
import {CommunityTeamsPageComponent} from './containers/community-teams-page.component';
import {CommunityPlayersPageComponent} from './containers/community-players-page.component';
import {CommunityTeamsProfilePageComponent} from './containers/community-teams-profile-page.component';
import {CommunityFacilitiesPageComponent} from './containers/community-facilities-page.component';
import {CommunityFacilitiesProfilePageComponent} from './containers/community-facilities-profile-page.component';
import {LoggedInAuthGuard} from '../core/service/auth-guard.service';

const routes: Routes = [
  {
    path: '',
    component: CommunityPageComponent
  },
  {
    path: 'teams',
    component: CommunityTeamsPageComponent
  },
  {
    path: 'teams/:id',
    component: CommunityTeamsProfilePageComponent
  },
  {
    path: 'players',
    component: CommunityPlayersPageComponent
  },
  {
    path: 'facilities',
    component: CommunityFacilitiesPageComponent
  },
  {
    path: 'facilities/creator',
    loadChildren: './../facility-creator/facility-creator.module#FacilityCreatorModule',
    canActivate: [LoggedInAuthGuard]
  },
  {
    path: 'facilities/:id',
    component: CommunityFacilitiesProfilePageComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CommunityRoutingModule { }
