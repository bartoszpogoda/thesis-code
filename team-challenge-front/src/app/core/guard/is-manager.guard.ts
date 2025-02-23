import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {Injectable} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {from} from 'rxjs';

import * as fromRoot from '../reducers/index';
import {map, take, withLatestFrom} from 'rxjs/operators';
import {selectIsManager} from '../selectors/my-team.selectors';

@Injectable()
export class IsManagerGuard implements CanActivate {

  canActivate(): boolean {
    let can = false;

    this.store.pipe(select(selectIsManager), take(1)).subscribe(isManager => can = isManager);

    if (!can) {
      this.router.navigate(['/team']);
      return true;
    }
    return can;
  }

  constructor(private store: Store<fromRoot.State>, private router: Router) {}
}
