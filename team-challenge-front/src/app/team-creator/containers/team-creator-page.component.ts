import {Component} from '@angular/core';
import {select, Store} from '@ngrx/store';
import * as fromRoot from '../../core/reducers/index';
import LatLng = google.maps.LatLng;
import {TeamCreationForm} from '../../core/models/team';
import {CreateTeam, SetHome} from '../store/team-creator.actions';
import {selectStage} from '../store/team-creator.selectors';
import {Observable} from 'rxjs';
import {Position} from '../../core/models/position';
import {Region} from '../../core/models/region';
import {selectMyPlayerRegion, selectRegions} from '../../core/selectors/core.selectors';
import {Player} from '../../core/models/player';
import {selectPlayerProfile} from '../../core/selectors/my-player.selectors';


@Component({
  selector: 'app-team-creator-page',
  template: `
    <div class="spaces-sides">
      <app-breadcrumb [items]="items"></app-breadcrumb>
      <div class="content-container">
        <h1>Kreator drużyny</h1>
        <nz-steps [nzCurrent]="stage$ | async">
          <nz-step nzTitle="Podstawowe dane"></nz-step>
          <nz-step nzTitle="Zdjęcie"></nz-step>
          <nz-step nzTitle="Punkt macierzysty"></nz-step>
          <nz-step nzTitle="Terminarz"></nz-step>
          <nz-step nzTitle="Rekrutacja"></nz-step>
        </nz-steps>

        <div class="steps-content">

          <div nz-row nzGutter="16">
          <div nz-col class="gutter-row" nzXs="0" nzSm="3"></div>
          <div nz-col class="gutter-row" nzXs="24" nzSm="18">

            <div *ngIf="(stage$ | async) == 0">
              <h2>Wprowadź podstawowe dane swojej drużyny</h2>
              <p>Po wprowadzeniu tych danych oraz przesłaniu formularza drużyna zostanie założona.
                Następnie będziesz mógł uzupełnić dodatkowe dane drużyny.</p>
              <app-creator-base-data (submitted)="baseStageSubmitted($event)" [regions]="regions$ | async"
                                     [fixedRegionId]="(myPlayerRegion$ | async).id">
              </app-creator-base-data>
            </div>
            <app-team-creator-load-photo *ngIf="(stage$ | async) == 1"></app-team-creator-load-photo>
            <div *ngIf="(stage$ | async) == 2">
              <h2>Oznacz markerem punkt macierzysty swojej drużyny</h2>
              <p> Będzie on używany jako referencyjny punkt dla porównywania odległości od obiektów sportowych
                oraz przeciwników.</p>
              <p>Może to być na przykład Wasze ulubione boisko, lub częste miejsce spotkań bliskie zawodnikom.
                W przypadku trudności wybierz centrum regionu.</p>
              <app-point-picker [icon]="homeIcon" [center]="(myPlayerRegion$ | async).center" (accepted)="homePointStageSubmitted($event)"
                acceptButtonText="Dalej"></app-point-picker>
            </div>
            </div>
          </div>

        </div>
    </div>
    </div>
  `,
  styles  : [
    `
      .steps-content {
        margin-top: 16px;
        border: 1px dashed #e9e9e9;
        border-radius: 6px;
        background-color: #fafafa;
        min-height: 200px;
        text-align: center;
        padding-top: 20px;
      }

      .steps-action {
        margin-top: 24px;
      }

      button {
        margin-right: 8px;
      }

    `
  ]
})
export class TeamCreatorPageComponent {
  items = [
    {title: 'Moja drużyna', link: '/team'}, {title: 'Kreator'}
  ];

  stage$: Observable<number>;
  regions$: Observable<Region[]>;
  myPlayerRegion$: Observable<Region>;

  homeIcon = {
    url: '/assets/images/home_spot.png',
    anchor: [13, 43],
    size: [27, 43],
    scaledSize: [27, 43]
  };


  baseStageSubmitted(teamCreationForm: TeamCreationForm) {
    this.store.dispatch(new CreateTeam(teamCreationForm));
  }

  homePointStageSubmitted(position: Position) {
    this.store.dispatch(new SetHome(position));
  }

  constructor(private store: Store<fromRoot.State>) {
    this.stage$ = this.store.pipe(select(selectStage));
    this.regions$ = this.store.pipe(select(selectRegions));
    this.myPlayerRegion$ = this.store.pipe(select(selectMyPlayerRegion));
  }

}
