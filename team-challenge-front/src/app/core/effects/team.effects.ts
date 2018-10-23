import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {AuthActionTypes, LoginSuccess} from '../../auth/actions/auth.actions';
import {catchError, exhaustMap, map, switchMap, take, withLatestFrom} from 'rxjs/operators';
import {of, timer} from 'rxjs';
import {select, Store} from '@ngrx/store';
import {State} from '../../reducers';
import {PlayerService} from '../service/player.service';
import {TeamService} from '../service/team.service';
import {
  HideJustJoined,
  LoadCurrent,
  LoadCurrentFailure,
  LoadCurrentSuccess,
  ShowJustJoined,
  TeamActionTypes, UpdateIsManager
} from '../actions/team.actions';
import {
  AcceptTeamInvitationSuccess,
  HideJustRegistered, LoadCurrentSuccess as LoadCurrentPlayerSuccess,
  PlayerActionTypes,
  RegisterSuccess,
  ShowJustRegistered
} from '../actions/player.actions';
import {selectPlayerProfile} from '../../reducers';

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
  $justJoined = this.actions$.pipe(
    ofType<AcceptTeamInvitationSuccess>(PlayerActionTypes.AcceptTeamInvitationSuccess),
    map(() => new ShowJustJoined())
  );

  @Effect()
  $hideJustJoined = this.actions$.pipe(
    ofType<ShowJustJoined>(TeamActionTypes.ShowJustJoined),
    switchMap(() => {
      return timer(5000, 100).pipe(
        map(() => new HideJustJoined()),
        take(1)
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


  constructor(
    private actions$: Actions,
    private teamService: TeamService,
    private store: Store<State>
  ) {}
}

