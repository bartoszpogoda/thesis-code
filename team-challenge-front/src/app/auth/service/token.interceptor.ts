import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {TokenService} from './token.service';
import {Observable} from 'rxjs';
import {select, Store} from '@ngrx/store';
import * as fromRoot from '../../reducers';
import * as fromAuth from '../reducers';
import {Token} from '../models/token';
import {flatMap, map, take} from 'rxjs/operators';


@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  token$: Observable<Token>;

  constructor(private store: Store<fromRoot.State>) {
    this.token$ = this.store.pipe(select(fromAuth.selectToken));

  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return this.token$.pipe(
      take(1),
      flatMap((token: Token) => {
        if (token != null) {
          req = req.clone({
            setHeaders: {
              Authorization: `Bearer ${token}`
            }
          });
        }
        return next.handle(req);
      })
    );

  }

}
