import {Component, OnDestroy, OnInit} from '@angular/core';
import {InvitablePlayer, Player, PlayerRegistrationForm} from '../models/player';
import {PlayerService} from '../service/player.service';
import {Page} from '../models/page';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {debounceTime, takeUntil, tap} from 'rxjs/operators';
import * as fromRoot from '../reducers/index';
import {Observable, Subject} from 'rxjs';
import {select, Store} from '@ngrx/store';
import {
  CancelInvitation, Invite,
  InvitePlayerLoadPage,
  InvitePlayerNameSearchChanged,
  InvitePlayerPageChanged,
  LoadTeamInvitations
} from '../actions/manager.actions';
import {
  selectInvitePlayerData,
  selectInvitePlayerLoading,
  selectInvitePlayerTotal,
  selectManagementInvitations
} from '../reducers/index';
import {TeamInvitation} from '../models/team-invitation';

@Component({
  selector: 'app-team-recruitment',
  template: `
      <div nz-row nzGutter="16">
        <div nz-col nzXs="0" nzSm="16">
          <h2>Zaproś gracza</h2>
          <p>Tabela prezentuje zawodników z Twojego regionu, którzy nie są aktualnie w drużynie.</p>
          <nz-input-group nzPrefixIcon="anticon anticon-user" style="margin: 10px 0;">
            <input type="text" nz-input placeholder="Szukaj po nazwie" [formControl]="nameSearch">
          </nz-input-group>
          <nz-table
            #ajaxTable
            [nzFrontPagination]="false"
            [nzData]="data$ | async"
            [nzLoading]="loading$ | async"
            [nzTotal]="totalElements$ | async"
            [(nzPageIndex)]="pageIndex"
            [(nzPageSize)]="pageSize"
            (nzPageIndexChange)="pageIndexChanged($event)">
            <thead>
            <tr>
              <th>Nazwa</th>
              <th>Wiek</th>
              <th><span>Staż</span></th>
              <th style="width:200px!important">Akcja</th>
            </tr>
            </thead>
            <tbody>
            <tr *ngFor="let data of ajaxTable.data">
              <td>{{data.player.fullName}}</td>
              <td>{{data.player.age}}</td>
              <td>{{data.player.yearsOfExperience}}</td>
              <td>
                <ng-container *ngIf="data.invited">Zaproszony</ng-container>
                <ng-container *ngIf="!data.invited"><a (click)="invite(data.player.id)">Zaproś</a></ng-container>
              </td>
            </tr>
            </tbody>
          </nz-table>
        </div>
        <div nz-col nzXs="0" nzSm="8">
          <h2>Zaproszenia w toku</h2>
          <ng-container *ngFor="let invitation of (invitations$ | async)">
            <app-sent-invitation [teamInvitation]="invitation"
                                 (canceled)="onCanceled(invitation)"
                                 (clickedPlayer)="onClickedPlayer(invitation)"></app-sent-invitation>
          </ng-container>
        </div>
      </div>
  `
})

export class TeamRecruitmentComponent implements OnInit, OnDestroy {

  pageIndex = 1;
  pageSize = 5;
  nameSearch = new FormControl('');

  destroyed$ = new Subject();

  data$: Observable<InvitablePlayer[]>;
  invitations$: Observable<TeamInvitation[]>;
  totalElements$: Observable<number>;
  loading$: Observable<boolean>;

  constructor(private playerService: PlayerService, private store: Store<fromRoot.State>) {

    this.data$ = this.store.pipe(select(selectInvitePlayerData));
    this.invitations$ = this.store.pipe(select(selectManagementInvitations));
    this.totalElements$ = this.store.pipe(select(selectInvitePlayerTotal));
    this.loading$ = this.store.pipe(select(selectInvitePlayerLoading));

    this.nameSearch.valueChanges.pipe(
      debounceTime(300),
      takeUntil(this.destroyed$)
    ).subscribe(() => {
      this.pageIndex = 1;
      this.store.dispatch(new InvitePlayerNameSearchChanged(this.nameSearch.value));
    });
  }

  ngOnInit(): void {
    this.pageIndex = 1;
    this.store.dispatch(new LoadTeamInvitations());
    this.store.dispatch(new InvitePlayerPageChanged(0));
  }

  ngOnDestroy (): void {
    this.destroyed$.next();
  }

  pageIndexChanged(index: number) {
    this.store.dispatch(new InvitePlayerPageChanged(index - 1));
  }

  onCanceled(invitation: TeamInvitation) {
    this.store.dispatch(new CancelInvitation(invitation.id));
  }

  onClickedPlayer(invitation: TeamInvitation) {
    console.log('redirect to myPlayer');
  }

  invite(playerId: string) {
    this.store.dispatch(new Invite(playerId));
  }
}
