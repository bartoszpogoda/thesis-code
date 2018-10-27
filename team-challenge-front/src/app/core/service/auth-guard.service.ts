import {CanActivate} from '@angular/router';
import {Injectable} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {from} from 'rxjs';

import * as fromRoot from '../reducers/index';
import {map, take, withLatestFrom} from 'rxjs/operators';
import {selectLoggedIn} from '../../auth/reducers';

@Injectable()
export class LoggedInAuthGuard implements CanActivate {

  canActivate(): boolean {
    let can = false;

    this.store.pipe(
      select(selectLoggedIn),
      take(1)
    ).subscribe(loggedIn => can = loggedIn);

    console.log('Can' + (can ? ' ' : ' not ') + 'activate');

    return can;
  }

  constructor(private store: Store<fromRoot.State>) {}
}
