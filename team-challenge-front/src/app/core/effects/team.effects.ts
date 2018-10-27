import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {catchError, exhaustMap, map, switchMap, take, tap, withLatestFrom} from 'rxjs/operators';
import {of, timer} from 'rxjs';
import {select, Store} from '@ngrx/store';
import {State} from '../reducers/index';
import {TeamService} from '../service/team.service';
import {
  LoadCurrent,
  LoadCurrentFailure,
  LoadCurrentSuccess,
  TeamActionTypes, UpdateIsManager
} from '../actions/team.actions';
import {
  AcceptTeamInvitationSuccess,
  LoadCurrentSuccess as LoadCurrentPlayerSuccess,
  PlayerActionTypes,
} from '../actions/player.actions';
import {Router} from '@angular/router';
import {NzMessageService} from 'ng-zorro-antd';
import {selectPlayerProfile} from '../selectors/my-player.selectors';

@Injectable()
export class TeamEffects {

  // @Effect()
  // $loadPlayersTeamOnLoginSuccess = this.actions$.pipe(
  //   ofType<LoginSuccess>(AuthActionTypes.LoginSuccess),
  //   map(() => new LoadCurrent())
  // );

  @Effect()
  $loadPlayersTeamOnPlayerLoaded = this.actions$.pipe(
    ofType<LoadCurrentPlayerSuccess>(PlayerActionTypes.LoadCurrentSuccess),
    map(() => new LoadCurrent())
  );

  @Effect()
  $loadCurrentTeam = this.actions$.pipe(
    ofType<LoadCurrent>(TeamActionTypes.LoadCurrent),
    exhaustMap(() => {
        return this.teamService.getCurrent().pipe(
          map(team => new LoadCurrentSuccess(team)),
          catchError(error => of(new LoadCurrentFailure(error)))
        );
    })
  );

  @Effect()
  $updateIsManagerAfterTeamLoaded = this.actions$.pipe(
    ofType<LoadCurrentSuccess>(TeamActionTypes.LoadCurrentSuccess),
    map(action => action.payload),
    withLatestFrom(this.store.pipe(select(selectPlayerProfile))),
    map(([team, player]) => {
      return new UpdateIsManager(this.teamService.isManager(team, player));
    })
  );

  // @Effect({dispatch: false})
  // $redirectToTeamViewAfterCreation = this.actions$.pipe(
  //   ofType<CreateTeamSuccess>(TeamActionTypes.CreateTeamSuccess),
  //   switchMap(() => {
  //     return this.actions$.pipe(
  //       ofType<LoadCurrentSuccess>(TeamActionTypes.LoadCurrentSuccess),
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

