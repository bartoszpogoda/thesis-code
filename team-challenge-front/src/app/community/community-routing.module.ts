import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {CommunityPageComponent} from './containers/community-page.component';
import {CommunityTeamsPageComponent} from './containers/community-teams-page.component';
import {CommunityPlayersPageComponent} from './containers/community-players-page.component';
import {CommunityTeamsProfilePageComponent} from './containers/community-teams-profile-page.component';

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
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CommunityRoutingModule { }
