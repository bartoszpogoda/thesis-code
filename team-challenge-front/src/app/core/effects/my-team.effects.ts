import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {catchError, exhaustMap, filter, map, switchMap, take, tap, withLatestFrom} from 'rxjs/operators';
import {of, timer} from 'rxjs';
import {select, Store} from '@ngrx/store';
import {State} from '../reducers/index';
import {TeamService} from '../service/team.service';
import {
  LoadCurrent,
  LoadCurrentFailure,
  LoadCurrentSuccess, LoadHome, LoadHomeFailure, LoadHomeSuccess, LoadPlayers, LoadPlayersFailure, LoadPlayersSuccess,
  MyTeamActionTypes, UpdateIsManager
} from '../actions/my-team.actions';
import {
  AcceptTeamInvitationSuccess,
  LoadCurrentSuccess as LoadCurrentPlayerSuccess,
  PlayerActionTypes,
} from '../actions/player.actions';
import {Router} from '@angular/router';
import {NzMessageService} from 'ng-zorro-antd';
import {selectPlayerProfile} from '../selectors/my-player.selectors';
import {NoAction} from '../actions/core.actions';
import {toPayload} from '../util/functions';
import {selectMyTeam} from '../selectors/my-team.selectors';
import {AuthActionTypes, LoginSuccess} from '../../auth/actions/auth.actions';

@Injectable()
export class MyTeamEffects {


  @Effect()
  $loadPlayersTeamOnPlayerLoaded = this.actions$.pipe(
    ofType<LoadCurrentSuccess>(PlayerActionTypes.LoadCurrentSuccess),
    withLatestFrom(this.store.pipe(select(selectPlayerProfile))),
    filter(([, player]) => player.teamId !== null),
    map(([, player]) => new LoadCurrent(player.teamId))
  );

  @Effect()
  $loadCurrentTeam = this.actions$.pipe(
    ofType<LoadCurrent>(MyTeamActionTypes.LoadCurrent),
    map(toPayload),
    exhaustMap((id) => {
        return this.teamService.get(id).pipe(
          map(team => new LoadCurrentSuccess(team)),
          catchError(error => of(new LoadCurrentFailure(error)))
        );
    })
  );

  @Effect()
  $updateIsManagerAfterTeamLoaded = this.actions$.pipe(
    ofType<LoadCurrentSuccess>(MyTeamActionTypes.LoadCurrentSuccess),
    map(action => action.payload),
    withLatestFrom(this.store.pipe(select(selectPlayerProfile))),
    map(([team, player]) => {
      return new UpdateIsManager(this.teamService.isManager(team, player));
    })
  );

  @Effect()
  $loadHomeAndPlayersAfterTeamLoaded = this.actions$.pipe(
    ofType<LoadCurrentSuccess>(MyTeamActionTypes.LoadCurrentSuccess),
    switchMap(() => [new LoadHome(), new LoadPlayers()])
  );


  @Effect()
  $loadHome = this.actions$.pipe(
    ofType<LoadHome>(MyTeamActionTypes.LoadHome),
    withLatestFrom(this.store.pipe(select(selectMyTeam))),
    exhaustMap(([, myTeam]) => this.teamService.getHome(myTeam.id).pipe(
      map(home => new LoadHomeSuccess(home)),
      catchError(err => of(new LoadHomeFailure(err)))
    ))
  );


  @Effect()
  $loadPlayers = this.actions$.pipe(
    ofType<LoadPlayers>(MyTeamActionTypes.LoadPlayers),
    withLatestFrom(this.store.pipe(select(selectMyTeam))),
    exhaustMap(([, myTeam]) => this.teamService.getPlayers(myTeam.id).pipe(
      map(players => new LoadPlayersSuccess(players)),
      catchError(err => of(new LoadPlayersFailure(err)))
    ))
  );

  // @Effect({dispatch: false})
  // $redirectToTeamViewAfterCreation = this.actions$.pipe(
  //   ofType<CreateTeamSuccess>(MyTeamActionTypes.CreateTeamSuccess),
  //   switchMap(() => {
  //     return this.actions$.pipe(
  //       ofType<LoadCurrentSuccess>(MyTeamActionTypes.LoadCurrentSuccess),
  //       take(1),
  //       tap(() => {
  //         this.router.navigate(['/team']);
  //       })
  //     );
  //   })
  // );


  constructor(
    private actions$: Actions,
    private teamService: TeamService,
    private store: Store<State>,
    private router: Router,
    private message: NzMessageService
  ) {}
}

