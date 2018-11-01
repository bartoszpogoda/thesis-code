import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {catchError, exhaustMap, map, switchMap, take, tap, withLatestFrom} from 'rxjs/operators';
import {of, timer} from 'rxjs';
import {select, Store} from '@ngrx/store';
import {State} from '../../core/reducers/index';
import {TeamService} from '../../core/service/team.service';
import {Router} from '@angular/router';
import {NzMessageService} from 'ng-zorro-antd';
import {
  Close,
  CreateTeam,
  CreateTeamFailure,
  CreateTeamSuccess,
  SetHome, SetHomeFailure,
  SetHomeSuccess,
  TeamCreatorActionTypes
} from './team-creator.actions';
import {LoadCurrent} from '../../core/actions/my-team.actions';
import {toPayload} from '../../core/util/functions';
import {selectTeam} from './team-creator.selectors';

@Injectable()
export class TeamCreatorEffects {

  @Effect()
  $createTeam = this.actions$.pipe(
    ofType<CreateTeam>(TeamCreatorActionTypes.CreateTeam),
    map(toPayload),
    switchMap((creationForm) => {
      return this.teamService.createTeam(creationForm).pipe(
        map(createdTeam => new CreateTeamSuccess(createdTeam)),
        catchError(err => of(new CreateTeamFailure(err)))
      );
    })
  );

  @Effect()
  $loadCurrentTeamAfterCreation = this.actions$.pipe(
    ofType<CreateTeamSuccess>(TeamCreatorActionTypes.CreateTeamSuccess),
    map(toPayload),
    map((team) => new LoadCurrent(team.id))
  );

  @Effect({dispatch: false})
  $createTeamSuccessMessage = this.actions$.pipe(
    ofType<CreateTeamSuccess>(TeamCreatorActionTypes.CreateTeamSuccess),
    tap(() => {
      this.message.success('Drużyna została utworzona. Możesz teraz uzupełnić pozostałe dane korzystając z kreatora.');
    })
  );

  @Effect()
  $setHome = this.actions$.pipe(
    ofType<SetHome>(TeamCreatorActionTypes.SetHome),
    map(toPayload),
    withLatestFrom(this.store.pipe(select(selectTeam))),
    switchMap(([pos, team]) => {
      return this.teamService.setHome(team.id, pos).pipe(
        map(home => new SetHomeSuccess(home)),
        catchError(err => of(new SetHomeFailure(err)))
      );
    })
  );

  @Effect({dispatch: false})
  $setHomeSuccessMessage = this.actions$.pipe(
    ofType<SetHomeSuccess>(TeamCreatorActionTypes.SetHomeSuccess),
    tap(() => {
      this.message.success('Punkt macierzysty został ustawiony.');
    })
  );


  @Effect({dispatch: false})
  $closeCreator = this.actions$.pipe(
    ofType<Close>(TeamCreatorActionTypes.Close),
    tap(() => {
      this.router.navigate(['/team']);
    })
  );

  constructor(
    private actions$: Actions,
    private teamService: TeamService,
    private store: Store<State>,
    private router: Router,
    private message: NzMessageService
  ) {}
}

