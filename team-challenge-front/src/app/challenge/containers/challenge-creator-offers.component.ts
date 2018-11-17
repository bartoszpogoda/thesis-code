import {Component, OnInit} from '@angular/core';
import {select, Store} from '@ngrx/store';
import * as fromRoot from '../reducers/index';
import {Observable} from 'rxjs';
import {
  selectEntryPlaceTimeOffers,
  selectPickedTeam,
  selectPickedTeamHome,
  selectSelected,
  selectSelectedHomes,
  selectSelectedPlayers
} from '../selectors/challenge-creator.selectors';
import {Router} from '@angular/router';
import {
  AddEntryPlaceTimeOffer,
  BackToResults, CancelEntryPlaceTimeOffer,
  CompareLoadHomePoints,
  CompareLoadPlayers,
  CreateChallenge
} from '../actions/challenge-creator.actions';
import {LoadFacilities} from '../../community/actions/community-facilities.actions';
import {selectMyTeam, selectMyTeamHome, selectMyTeamRegion} from '../../core/selectors/my-team.selectors';
import {Position} from '../../core/models/position';
import {Region} from '../../core/models/region';
import {Facility} from '../../core/models/facility';
import {Team} from '../../core/models/team';
import {PlaceTimeOffer} from '../models/challenge';
import {selectFacilities} from '../reducers/index';

@Component({
  selector: 'app-challenge-creator-offers',
  template: `
    <h2>Rzucasz wyzwanie drużynie: {{(pickedTeam$ | async)?.name}}</h2>

    <p>Dodaj wstępne propozycje czasu oraz terminu spotkania. <strong>Wymagana</strong> jest co najmniej jedna oferta. 
      Mapa przedstawia punkty macierzyste Waszych drużyn oraz proponowane lokalizacje spotkania.</p>

    <app-entry-placetimeoffer-pool [placeTimeOffers]="entryPlaceTimeOffers$ | async"
                                   [myHome]="myHome$ | async" [theirHome]="pickedTeamHome$ | async"
                                   (canceled)="onCancelled($event)">

      <app-new-placetimeoffer-modal [center]="(region$ | async)?.center"
                                    [myHome]="myHome$ | async" [theirHome]="pickedTeamHome$ | async"
                                    [facilities]="facilities$ | async" (submitted)="newOfferSubmitted($event)">
      </app-new-placetimeoffer-modal>

    </app-entry-placetimeoffer-pool>


    <div>
      <button nz-button (click)="onChangeRivals()">
        Zmień rywali
      </button>
      <button nz-button [disabled]="(entryPlaceTimeOffers$ | async).length < 1" (click)="onChallenge()" nzType="primary">
        <i class="anticon anticon-play-circle-o"></i> Rzuć wyzwanie
      </button>
    </div>
  `, styles: [`
    button {
      margin-right: 8px;
      margin-bottom: 12px;
      margin-top: 12px;
    }
  `]
})
export class ChallengeCreatorOffersComponent implements OnInit {

  pickedTeam$: Observable<Team>;

  myTeam$: Observable<Team>;
  facilities$: Observable<Facility[]>;
  myHome$: Observable<Position>;
  region$: Observable<Region>;
  pickedTeamHome$: Observable<Position>;
  entryPlaceTimeOffers$: Observable<PlaceTimeOffer[]>;

  constructor(private store: Store<fromRoot.State>, private router: Router) {
    this.myTeam$ = this.store.pipe(select(selectMyTeam));
    this.region$ = this.store.pipe(select(selectMyTeamRegion));
    this.facilities$ = this.store.pipe(select(selectFacilities));
    this.myHome$ = this.store.pipe(select(selectMyTeamHome));

    this.pickedTeam$ = this.store.pipe(select(selectPickedTeam));
    this.pickedTeamHome$ = this.store.pipe(select(selectPickedTeamHome));
    this.entryPlaceTimeOffers$ = this.store.pipe(select(selectEntryPlaceTimeOffers));
  }

  onChallenge() {
    // TODO dispatch challenge
    // TODO make challenge button possible when any offers

    this.store.dispatch(new CreateChallenge());
  }

  onChangeRivals() {
    this.store.dispatch(new BackToResults());
  }

  ngOnInit(): void {
    this.store.dispatch(new LoadFacilities());
  }

  newOfferSubmitted(newOffer: PlaceTimeOffer) {
    this.store.dispatch(new AddEntryPlaceTimeOffer(newOffer));
  }

  onCancelled(offer: PlaceTimeOffer) {
    this.store.dispatch(new CancelEntryPlaceTimeOffer(offer));
  }
}
