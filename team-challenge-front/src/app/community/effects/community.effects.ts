import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {Router} from '@angular/router';
import {select, Store} from '@ngrx/store';
import {CommunityState, selectTeamsCurrentPage, selectTeamsPage} from '../reducers';
import {catchError, filter, map, switchMap, tap, withLatestFrom} from 'rxjs/operators';
import {GenerateTokenSuccess} from '../../auth/actions/auth.actions';
import {
  CommunityTeamsActionsUnion,
  CommunityTeamsActionTypes,
  EnterPage,
  LoadPage, LoadPageFailure,
  LoadPageSuccess
} from '../actions/community-teams.actions';
import {CommunityService} from '../service/community.service';
import {of} from 'rxjs';

@Injectable()
export class CommunityEffects {

  @Effect()
  $loadTeamsIfPageNotLoaded = this.actions$.pipe(
    ofType<EnterPage>(CommunityTeamsActionTypes.EnterPage),
    withLatestFrom(this.store.pipe(select(selectTeamsPage)), this.store.pipe(select(selectTeamsCurrentPage))),
    filter(([, page, ]) => page == null),
    // @ts-ignore
    map(([, , current]) => new LoadPage(current))
  );

  @Effect()
  $loadPage = this.actions$.pipe(
    ofType<LoadPage>(CommunityTeamsActionTypes.LoadPage),
    withLatestFrom(this.store.pipe(select(selectTeamsCurrentPage))),
    switchMap(([, current]) => {
      // @ts-ignore
      return this.communityService.getTeamsPage(current, 6).pipe(
        // @ts-ignore
        map(page => new LoadPageSuccess(page)),
        catchError(err => of(new LoadPageFailure(err)))
      );
    })
  );

  constructor(
    private actions$: Actions,
    private router: Router,
    private store: Store<CommunityState>,
    private communityService: CommunityService
  ) {}
}
