import {Component, OnDestroy, OnInit} from '@angular/core';
import * as fromRoot from '../reducers/index';
import {select, Store} from '@ngrx/store';
import LatLng = google.maps.LatLng;
import {Observable} from 'rxjs';
import {Region} from '../models/region';
import {selectMyPlayerRegion} from '../selectors/core.selectors';
import {selectMyTeamHome, selectMyTeamHomeOrRegionCenter} from '../selectors/my-team.selectors';
import {Position} from '../models/position';
import {map, tap, withLatestFrom} from 'rxjs/operators';
import {SetHome} from '../actions/manager.actions';
import {Router} from '@angular/router';

@Component({
  selector: 'app-my-team-manager-home',
  template: `
      <h2>Punkt  macierzysty</h2>
      <p>Dostosuj punkt macierzysty swojej drużyny</p>
      <app-point-picker acceptButtonText="Zapisz"
                        skipButtonText="Anuluj"
                        (accepted)="onAccepted($event)"
                        [center]="(center$ | async)" [icon]="homeIcon">
      </app-point-picker>
  `
})

export class TeamManagerHomePageComponent {

  center$: Observable<Position>;

  homeIcon = {
    url: '/assets/images/home_spot.png',
    anchor: [13, 43],
    size: [27, 43],
    scaledSize: [27, 43]
  };

  constructor(private store: Store<fromRoot.State>, private router: Router) {
    this.center$ = this.store.pipe(select(selectMyTeamHomeOrRegionCenter));
  }

  onAccepted(position: Position) {
    this.store.dispatch(new SetHome(position));
  }


}
