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
import {EntryPlacetimeofferPoolComponent} from './components/entry-placetimeoffer-pool.component';
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
import {MyPlaceTimeOfferComponent} from './components/my-place-time-offer.component';
import {MyChallengesEffects} from './effects/my-challenges.effects';
import {MyChallengePageComponent} from './containers/my-challenge-page.component';
import {ChallengeOnListComponent} from './components/challenge-on-list.component';
import {FacilitiesEffects} from './effects/facilities.effects';
import {PlacetimeofferPoolComponent} from './components/placetimeoffer-pool.component';
import {TheirPlaceTimeOfferComponent} from './components/their-place-time-offer.component';
import {PastChallengesComponent} from './containers/past-challenges.component';
import {PastChallengesEffects} from './effects/past-challenges.effects';
import {ResultModalComponent} from './components/result-modal.component';
import {MyChallengeResultComponent} from './containers/my-challenge-result.component';
import {ResultComponent} from './components/result.component';
import {ReviewCreatorComponent} from './components/review-creator.component';
import {ReviewComponent} from './components/review.component';
import {SearchFormHelpModalComponent} from './components/search-form-help-modal.component';

export const COMPONENTS = [
  ChallengeSearchFormComponent, MapTeamsFacilitiesComponent, MapTwoTeamsFacilitiesComponent,
  EntryPlacetimeofferPoolComponent, SearchResultEntryComponent, ChallengeCreatorOffersComponent, ResultComponent,
  ChallengesPageComponent, ChallengeCreatorComparisonComponent, MyPlaceTimeOfferComponent, MyChallengeResultComponent,
  NewPlacetimeofferModalComponent, TeamComparisonEntryComponent, ChallengeCreatorSearchResultsComponent, FacilityComponent,
  ChallengeOnListComponent, PlacetimeofferPoolComponent, TheirPlaceTimeOfferComponent, PastChallengesComponent, ResultModalComponent,
  ReviewCreatorComponent, ReviewComponent, SearchFormHelpModalComponent
];

export const PAGES = [
  ChallengeCreatorPageComponent, MyChallengePageComponent
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
    EffectsModule.forFeature([ChallengeCreatorEffects, MyChallengesEffects, FacilitiesEffects, PastChallengesEffects]),
  ],
  declarations: [COMPONENTS, PAGES],
  exports: [COMPONENTS, PAGES],
  providers: [ChallengeService, SearchService]
})
export class ChallengeModule { }
