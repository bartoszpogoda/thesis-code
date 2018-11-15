import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {Injectable} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {from, merge, Observable, of, race} from 'rxjs';

import * as fromRoot from '../reducers/index';
import {switchMap, take, takeLast, tap} from 'rxjs/operators';
import {selectHasTeam} from '../selectors/my-team.selectors';
import {Actions, ofType} from '@ngrx/effects';
import {LoadCurrentFailure, LoadCurrentSuccess, MyTeamActionTypes} from '../actions/my-team.actions';

@Injectable()
export class TeamJoinRedirectGuard implements CanActivate {

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean { // Observable<boolean>
    let can = false;

    // return merge(
    //   this.actions$.pipe(ofType<LoadCurrentSuccess>(MyTeamActionTypes.LoadCurrentSuccess)),
    //   this.actions$.pipe(ofType<LoadCurrentFailure>(MyTeamActionTypes.LoadCurrentFailure))
    // ).pipe(
    //   takeLast(1),
    //   switchMap(() => of(true))
    // );

    this.store.pipe(select(selectHasTeam), take(1)).subscribe(hasTeam => can = hasTeam);

    console.log('Can' + (can ? ' ' : ' not ') + 'activate ' + route);

    if (!can) {
      this.router.navigate(['/team/join']);
      return true;
    }
    return can;
  }

  constructor(private store: Store<fromRoot.State>, private router: Router,
              private actions$: Actions) {}
}
