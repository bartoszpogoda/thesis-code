import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ChallengesPageComponent} from './containers/challenges-page.component';
import {ChallengeCreatorPageComponent} from './containers/challenge-creator-page.component';

const routes: Routes = [
  {
    path: '',
    component: ChallengesPageComponent
  },
  {
    path: 'new',
    component: ChallengeCreatorPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ChallengeRoutingModule { }
