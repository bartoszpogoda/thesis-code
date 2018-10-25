import {Injectable} from '@angular/core';
import {DecodedToken, Token} from '../models/token';
import {Authenticate} from '../models/authenticate';
import {interval, Observable, Subscription} from 'rxjs';
import {HttpClient} from '@angular/common/http';

import * as JWT from 'jwt-decode';
import {select, Store} from '@ngrx/store';
import {AuthState, selectLoggedIn} from '../reducers';
import {filter, withLatestFrom} from 'rxjs/operators';
import {RenewToken} from '../actions/auth.actions';

const TOKEN_RENEWAL_INTERVAL = 2 * 60 * 1000;

@Injectable()
export class TokenService {

  create(auth: Authenticate): Observable<Token> {
    return this.http.post<Token>('/api/token', auth);
  }

  renew(): Observable<Token> {
    return this.http.post<Token>('/api/token/renewal', {});
  }

  decode(token: Token): DecodedToken {
    const decoded = JWT(token.token);
    return {
      email: decoded['sub'],
      fullName: decoded['fullname'],
      roles: decoded['roles'],
      expires: decoded['exp'],
      id: decoded['id'],
    };
  }

  /**
   * Saves token to the local storage.
   * @param token
   */
  save(token: Token) {
    localStorage.setItem('token', token.token);
  }

  clear() {
    localStorage.removeItem('token');
  }

  load(): Token {
    const tokenValue = localStorage.getItem('token');

    if (tokenValue !== null && tokenValue !== 'null') {
      return {token: tokenValue};
    } else {
      return null;
    }
  }

  isExpired(decoded: DecodedToken): boolean {
     return Date.now() > decoded.expires * 1000;
  }

  startPeriodicRenewal(): Subscription {
    const loggedIn$ = this.store.pipe(select(selectLoggedIn));

    return interval(TOKEN_RENEWAL_INTERVAL).pipe(
        withLatestFrom(loggedIn$),
        filter(([, loggedIn]) => loggedIn === true)
    ).subscribe(() => {
        this.store.dispatch(new RenewToken());
    });
  }

  constructor(private http: HttpClient, private store: Store<AuthState>) {

  }
}
