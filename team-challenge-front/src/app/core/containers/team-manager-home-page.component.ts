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
  selector: 'app-team-recruitment-page',
  template: `
    <div class="spaces-sides">
      <app-breadcrumb [items]="items"></app-breadcrumb>
      <div class="content-container">
        <div nz-row nzGutter="16">
          <div nz-col nzXs="0" nzSm="2"></div>
        <div nz-col nzXs="24" nzSm="20">
        <h2>Punkt macierzysty</h2>
        <p>Dostosuj punkt macierzysty swojej drużyny</p>
        <app-point-picker acceptButtonText="Zapisz"
                          skipButtonText="Anuluj"
                          (accepted)="onAccepted($event)"
                          (skipped)="onSkipped()"
                          [center]="(center$ | async)" [icon]="homeIcon">
        </app-point-picker>
      </div>
    </div>
      </div>
    </div>
  `
})

export class TeamManagerHomePageComponent {
  items = [
    {title: 'Moja drużyna', link: '/team'}, {title: 'Zarządzanie', link: '/team/manager'}, {title: 'Punkt macierzysty'}
  ];

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

  onSkipped() {
    this.router.navigate(['/team/manager']);
  }


}
