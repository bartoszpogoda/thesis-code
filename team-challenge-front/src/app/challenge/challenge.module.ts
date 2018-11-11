import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {CoreModule} from '../core/core.module';
import {NgZorroAntdModule} from 'ng-zorro-antd';
import {StoreModule} from '@ngrx/store';
import {reducers} from './reducers';
import {EffectsModule} from '@ngrx/effects';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ChallengeService} from './service/challenge.service';
import {SearchEffects} from './effects/search.effects';
import {ChallengeRoutingModule} from './challenge-routing.module';
import {ChallengeCreatorStepsComponent} from './components/challenge-creator-steps.component';
import {ChallengeSearchFormComponent} from './components/challenge-search-form.component';
import {MapTeamsFacilitiesComponent} from './components/map-teams-facilities.component';
import {MapTwoTeamsFacilitiesComponent} from './components/map-two-teams-facilities.component';
import {PlacetimeofferPoolComponent} from './components/placetimeoffer-pool.component';
import {SearchResultEntryComponent} from './components/search-result-entry.component';
import {ChallengesEntryDateTimePageComponent} from './containers/challenges-entry-date-time-page.component';
import {ChallengesPageComponent} from './containers/challenges-page.component';
import {ChallengesSearchPageComponent} from './containers/challenges-search-page.component';
import {ChallengesSummaryPageComponent} from './containers/challenges-summary-page.component';
import {ComparisonPageComponent} from './containers/comparison-page.component';
import {NewPlacetimeofferModalComponent} from './containers/new-placetimeoffer-modal.component';
import {TeamComparisonEntryComponent} from './containers/team-comparison-entry.component';
import {NguiMapModule} from '@ngui/map';
import {ChartsModule} from 'ng2-charts';
import {ChallengesSearchResultPageComponent} from './containers/challenges-search-result-page.component';
import {SearchService} from './service/search.service';

export const COMPONENTS = [
  ChallengeCreatorStepsComponent, ChallengeSearchFormComponent, MapTeamsFacilitiesComponent, MapTwoTeamsFacilitiesComponent,
  PlacetimeofferPoolComponent, SearchResultEntryComponent, ChallengesEntryDateTimePageComponent,
  ChallengesPageComponent, ChallengesSearchPageComponent, ChallengesSummaryPageComponent, ComparisonPageComponent,
  NewPlacetimeofferModalComponent, TeamComparisonEntryComponent, ChallengesSearchResultPageComponent
];

@NgModule({
  imports: [
    CommonModule,
    ChallengeRoutingModule,
    CoreModule,
    NgZorroAntdModule,
    FormsModule,
    ReactiveFormsModule,
    NguiMapModule, ChartsModule,
    StoreModule.forFeature('challenge', reducers),
    EffectsModule.forFeature([SearchEffects]),
  ],
  declarations: [COMPONENTS],
  exports: [COMPONENTS],
  providers: [ChallengeService, SearchService]
})
export class ChallengeModule { }
