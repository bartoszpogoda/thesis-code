import {Component, OnDestroy, OnInit} from '@angular/core';
import {InvitablePlayer, Player, PlayerRegistrationForm} from '../../core/models/player';
import {PlayerService} from '../../core/service/player.service';
import {Page} from '../../core/models/page';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {debounceTime, takeUntil, tap} from 'rxjs/operators';
import * as fromRoot from '../../reducers/index';
import {Observable, Subject} from 'rxjs';
import {select, Store} from '@ngrx/store';
import {
  InvitePlayerLoadPage,
  InvitePlayerNameSearchChanged,
  InvitePlayerPageChanged,
  LoadTeamInvitations
} from '../../core/actions/manager.actions';
import {
  selectInvitePlayerData,
  selectInvitePlayerLoading,
  selectInvitePlayerTotal,
  selectManagementInvitations
} from '../../reducers/index';
import {TeamInvitation} from '../../core/models/team-invitation';

@Component({
  selector: 'app-team-invite-player',
  template: `
    <h2>Zaproszeni gracze</h2>
    <!-- below is very temp!! -->
    <div *ngFor="let invitation of (invitations$ | async)">
     <p>for: {{invitation.playerName}}</p>
    </div>
    <h2>Zaproś gracza</h2>
    <nz-input-group nzPrefixIcon="anticon anticon-user">
      <input  type="text" nz-input placeholder="Szukaj po nazwie" [formControl]="nameSearch">
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
        <th >Nazwa</th>
        <th >Wiek</th>
        <th><span>Staż</span></th>
        <th>Akcja</th>
      </tr>
      </thead>
      <tbody>
      <tr *ngFor="let data of ajaxTable.data">
        <td>{{data.player.fullName}}</td>
        <td>{{data.player.age}}</td>
        <td>{{data.player.yearsOfExperience}}</td>
        <td>
          <ng-container *ngIf="data.invited">Zaproszony</ng-container>
          <ng-container *ngIf="!data.invited"><a href="#">Zaproś</a></ng-container>
        </td>
      </tr>
      </tbody>
    </nz-table>
  `
})

export class TeamInvitePlayerComponent implements OnInit, OnDestroy {

  pageIndex = 1;
  pageSize = 10;
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
}
