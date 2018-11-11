import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ChallengesPageComponent} from './containers/challenges-page.component';
import {ChallengesSearchPageComponent} from './containers/challenges-search-page.component';
import {ChallengesSearchResultPageComponent} from './containers/challenges-search-result-page.component';
import {ComparisonPageComponent} from './containers/comparison-page.component';
import {ChallengesEntryDateTimePageComponent} from './containers/challenges-entry-date-time-page.component';
import {ChallengesSummaryPageComponent} from './containers/challenges-summary-page.component';

const routes: Routes = [
  {
    path: '',
    component: ChallengesPageComponent
  },
  {
    path: 'new',
    component: ChallengesSearchPageComponent
  },
  {
    path: 'new/pick',
    component: ChallengesSearchResultPageComponent
  },
  {
    path: 'new/comparison',
    component: ComparisonPageComponent
  },
  {
    path: 'new/offer',
    component: ChallengesEntryDateTimePageComponent
  },
  {
    path: 'new/summary',
    component: ChallengesSummaryPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ChallengeRoutingModule { }
