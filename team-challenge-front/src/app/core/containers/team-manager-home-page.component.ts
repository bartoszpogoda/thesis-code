import {Component, OnDestroy, OnInit} from '@angular/core';
import * as fromRoot from '../reducers/index';
import {select, Store} from '@ngrx/store';
import LatLng = google.maps.LatLng;

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
                          (skipped)="onSkipped()">
        </app-point-picker>
      </div>
    </div>
      </div>
    </div>
  `
})

export class TeamManagerHomePageComponent implements OnInit {
  items = [
    {title: 'Moja drużyna', link: '/team'}, {title: 'Zarządzanie', link: '/team/manager'}, {title: 'Punkt macierzysty'}
  ];


  constructor(private store: Store<fromRoot.State>) {

  }

  ngOnInit(): void {

  }

  onAccepted(position: LatLng) {
    console.log('onAccepted ' + position);
  }

  onSkipped() {
    console.log('onSkipped');
  }


}
