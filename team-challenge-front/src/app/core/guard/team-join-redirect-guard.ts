import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {Injectable} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {from} from 'rxjs';

import * as fromRoot from '../reducers/index';
import {take} from 'rxjs/operators';
import {selectHasTeam} from '../reducers/index';

@Injectable()
export class TeamJoinRedirectGuard implements CanActivate {

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    let can = false;

    this.store.pipe(select(selectHasTeam), take(1)).subscribe(hasTeam => can = hasTeam);

    console.log('Can' + (can ? ' ' : ' not ') + 'activate ' + route);

    if (!can) {
      this.router.navigate(['/team/join']);
      return true;
    }
    return can;
  }

  constructor(private store: Store<fromRoot.State>, private router: Router) {}
}
