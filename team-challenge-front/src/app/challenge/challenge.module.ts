import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {CoreModule} from '../core/core.module';
import {NgZorroAntdModule} from 'ng-zorro-antd';
import {StoreModule} from '@ngrx/store';
import {reducers} from './reducers';
import {EffectsModule} from '@ngrx/effects';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ChallengeService} from './service/challenge.service';
import {ChallengeCreatorEffects} from './effects/challenge-creator-effects.service';
import {ChallengeRoutingModule} from './challenge-routing.module';
import {ChallengeSearchFormComponent} from './components/challenge-search-form.component';
import {MapTeamsFacilitiesComponent} from './components/map-teams-facilities.component';
import {MapTwoTeamsFacilitiesComponent} from './components/map-two-teams-facilities.component';
import {PlacetimeofferPoolComponent} from './components/placetimeoffer-pool.component';
import {SearchResultEntryComponent} from './components/search-result-entry.component';
import {ChallengeCreatorOffersComponent} from './containers/challenge-creator-offers.component';
import {ChallengesPageComponent} from './containers/challenges-page.component';
import {ChallengeCreatorComparisonComponent} from './containers/challenge-creator-comparison.component';
import {NewPlacetimeofferModalComponent} from './containers/new-placetimeoffer-modal.component';
import {TeamComparisonEntryComponent} from './components/team-comparison-entry.component';
import {NguiMapModule} from '@ngui/map';
import {ChartsModule} from 'ng2-charts';
import {ChallengeCreatorSearchResultsComponent} from './containers/challenge-creator-search-results.component';
import {SearchService} from './service/search.service';
import {ChallengeCreatorPageComponent} from './containers/challenge-creator-page.component';
import {FacilityComponent} from './components/facility.component';
import {PlacetimeofferComponent} from './components/placetimeoffer.component';

export const COMPONENTS = [
  ChallengeSearchFormComponent, MapTeamsFacilitiesComponent, MapTwoTeamsFacilitiesComponent,
  PlacetimeofferPoolComponent, SearchResultEntryComponent, ChallengeCreatorOffersComponent,
  ChallengesPageComponent, ChallengeCreatorComparisonComponent, PlacetimeofferComponent,
  NewPlacetimeofferModalComponent, TeamComparisonEntryComponent, ChallengeCreatorSearchResultsComponent, FacilityComponent
];

export const PAGES = [
  ChallengeCreatorPageComponent
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
    EffectsModule.forFeature([ChallengeCreatorEffects]),
  ],
  declarations: [COMPONENTS, PAGES],
  exports: [COMPONENTS, PAGES],
  providers: [ChallengeService, SearchService]
})
export class ChallengeModule { }
