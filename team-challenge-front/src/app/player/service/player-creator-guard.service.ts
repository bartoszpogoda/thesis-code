import {CanActivate, Router} from '@angular/router';
import {Injectable} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {from} from 'rxjs';

import * as fromRoot from '../../core/reducers/index';
import {map, take, withLatestFrom} from 'rxjs/operators';
import {selectLoggedIn} from '../../auth/reducers';
import {selectPlayerProfileNotExisting} from '../../core/reducers/index';

@Injectable()
export class PlayerCreatorGuard implements CanActivate {

  canActivate(): boolean {
    let can = false;

    this.store.pipe(
      select(selectPlayerProfileNotExisting),
      take(1)
    ).subscribe(notExisting => can = !notExisting);

    console.log('Can' + (can ? ' ' : ' not ') + 'activate');

    if (!can) {
      this.router.navigate(['/player/new']);
      return true;
    }
    return can;
  }

  constructor(private store: Store<fromRoot.State>, private router: Router) {}
}
