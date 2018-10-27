import {Component, OnDestroy, OnInit} from '@angular/core';

import * as fromCommunity from './../reducers';
import {select, Store} from '@ngrx/store';
import {LoadTeam, LoadTeamPlayers} from '../actions/community-teams.actions';
import {ActivatedRoute} from '@angular/router';
import {Observable, Subject, Subscription} from 'rxjs';
import {Team} from '../../core/models/team';
import {selectCurrentTeam, selectCurrentTeamPlayers} from './../reducers';
import {takeUntil} from 'rxjs/operators';
import {Player} from '../../core/models/player';

@Component({
  selector: 'app-community-players-profile-page',
  template: `
    <div class="spaces-sides">
      <app-breadcrumb [items]="items"></app-breadcrumb>
      <div class="content-container">
        <app-team-display *ngIf="(team$ | async) !== null" [team]="team$ | async">
          <!-- dumb component to display players -->
          <div nz-row nzGutter="16">
            <div nz-col nzXs="0" nzSm="2"></div>
            <div nz-col *ngFor="let player of (players$ | async)" nzXs="12" nzSm="4">
              <app-player-card [player]="player"></app-player-card>
            </div>
            <div nz-col nzXs="0" nzSm="2"></div>
          </div>
        </app-team-display>
        <div style="text-align: center;">
          <nz-divider style="margin-bottom: 5px;"></nz-divider>
          <button nz-button nzType="default" nzBlock>Rzuć wyzwanie</button>
          <nz-divider style="margin-top: 5px;"></nz-divider>
        </div>
        <h2>Profil</h2>

        <h2>Relatywny profil (dopasowywanie)</h2>

        <h2>Wyzwania</h2>
      </div>
    </div>
  `
})
export class CommunityTeamsProfilePageComponent implements OnInit, OnDestroy {

  team$: Observable<Team>;
  players$: Observable<Player[]>;
  sub: Subscription;
  unsubscribe$ = new Subject();

  items = [
    {title: 'Społeczność', link: '/community'}, {title: 'Drużyny', link: '/community/teams'}, {title: ' '}
  ];



  constructor(private store: Store<fromCommunity.State>, private route: ActivatedRoute) {
    this.team$ = this.store.pipe(select(selectCurrentTeam));
    this.players$ = this.store.pipe(select(selectCurrentTeamPlayers));

    this.team$.pipe(takeUntil(this.unsubscribe$)).subscribe(team => {
      if (team !== null) {
        this.items = [{title: 'Społeczność', link: '/community'}, {title: 'Drużyny', link: '/community/teams'}, {title: team.name}];
      } else {
        this.items = [{title: 'Społeczność', link: '/community'}, {title: 'Drużyny', link: '/community/teams'}, {title: ' '}];
      }
    });

  }


  ngOnInit() {
    this.sub = this.route.params.pipe(takeUntil(this.unsubscribe$)).subscribe(params => {
      this.store.dispatch(new LoadTeam(params['id']));
      this.store.dispatch(new LoadTeamPlayers(params['id']));
    });
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();

    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

}
