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
  LoadCurrentSuccess, LoadHome, LoadHomeFailure, LoadHomeSuccess,
  MyTeamActionTypes, UpdateIsManager
} from '../actions/my-team.actions';
import {
  AcceptTeamInvitationSuccess,
  LoadCurrentSuccess as LoadCurrentPlayerSuccess, LoadTeamInvitations, LoadTeamInvitationsFailure, LoadTeamInvitationsSuccess,
  PlayerActionTypes,
} from '../actions/player.actions';
import {Router} from '@angular/router';
import {NzMessageService} from 'ng-zorro-antd';
import {selectPlayerProfile} from '../selectors/my-player.selectors';
import {NoAction} from '../actions/core.actions';
import {toPayload} from '../util/functions';
import {selectMyTeam} from '../selectors/my-team.selectors';
import {Search, SearchActionTypes, SearchFailure, SearchSuccess} from '../actions/search.actions';
import {selectCurrentTeam} from '../../community/reducers';
import {SearchService} from '../service/search.service';

@Injectable()
export class SearchEffects {

  @Effect()
  $search = this.actions$.pipe(
    ofType<Search>(SearchActionTypes.Search),
    map(toPayload),
    exhaustMap((searchForm) =>
      this.searchService.search(searchForm).pipe(
        map(searchResult => new SearchSuccess(searchResult)),
        catchError(err => of(new SearchFailure(err)))
      )
    )
  );

  @Effect({dispatch: false})
  $redirectToResults = this.actions$.pipe(
    ofType<Search>(SearchActionTypes.Search),
    tap(() => {
      this.router.navigate(['/challenges/search/result']);
    })
  );

  constructor(
    private actions$: Actions,
    private store: Store<State>,
    private searchService: SearchService,
    private router: Router,
    private message: NzMessageService
  ) {}
}

