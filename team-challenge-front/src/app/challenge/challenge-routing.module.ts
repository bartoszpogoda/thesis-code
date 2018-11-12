import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ChallengesPageComponent} from './containers/challenges-page.component';
import {ChallengeCreatorPageComponent} from './containers/challenge-creator-page.component';
import {CommunityTeamsProfilePageComponent} from '../community/containers/community-teams-profile-page.component';
import {MyChallengePageComponent} from './containers/my-challenge-page.component';

const routes: Routes = [
  {
    path: '',
    component: ChallengesPageComponent
  },
  {
    path: 'new',
    component: ChallengeCreatorPageComponent
  },
  {
    path: 'new',
    component: ChallengeCreatorPageComponent
  },
  {
    path: ':id',
    component: MyChallengePageComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ChallengeRoutingModule { }
