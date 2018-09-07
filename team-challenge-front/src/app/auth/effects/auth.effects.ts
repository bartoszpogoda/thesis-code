///<reference path="../actions/auth.actions.ts"/>
import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {
  AuthActionTypes,
  DecodeToken, DecodeTokenFailureExpired, DecodeTokenSuccess, GenerateTokenSuccess,
  Login,
  LoginFailure,
  LoginSuccess, Logout,
  Register,
  RegisterFailure,
  RegisterSuccess
} from '../actions/auth.actions';
import {catchError, exhaustMap, map, switchMap, tap} from 'rxjs/operators';
import {Authenticate} from '../models/authenticate';
import {TokenService} from '../service/token.service';
import {of} from 'rxjs';
import {DecodedToken, Token} from '../models/token';
import {Router} from '@angular/router';
import {NzMessageService} from 'ng-zorro-antd';
import {RegisterForm} from '../models/register';
@Injectable()
export class AuthEffects {

  @Effect()
  $enterApplication = this.actions$.pipe(
    ofType<EnterApplication>(CoreActionTypes.EnterApplication),
    map(() => {
      // TODO check tokenService.valid if not expired token
      const savedToken = this.tokenService.load();
      return savedToken !== null ? new GenerateTokenSuccess(savedToken) : new NoAction();
    })
  )

  @Effect()
  $login = this.actions$.pipe(
    ofType<Login>(AuthActionTypes.Login),
    map(action => action.payload),
    exhaustMap((auth: Authenticate) =>
      this.tokenService.create(auth).pipe(
        map(token => new GenerateTokenSuccess(token)),
        catchError(error => of(new LoginFailure(error)))
      )
    )
  );

  @Effect()
  $generateTokenSuccess = this.actions$.pipe(
    ofType<GenerateTokenSuccess>(AuthActionTypes.GenerateTokenSuccess),
    map(action => action.payload),
    tap((token: Token) => {
      this.tokenService.save(token);
    }),
    map((token: Token) => new DecodeToken(token))
  );

  @Effect()
  $decodeToken = this.actions$.pipe(
    ofType<DecodeToken>(AuthActionTypes.DecodeToken),
    map(action => action.payload),
    map((token: Token) => this.tokenService.decode(token)),
    map((decoded: DecodedToken) => {
      return this.tokenService.isExpired(decoded) ? new DecodeTokenFailureExpired() :
        new DecodeTokenSuccess(decoded);
    })
  );

  @Effect({dispatch: false})
  $decodeTokenFailureExpired = this.actions$.pipe(
    ofType<DecodeTokenFailureExpired>(AuthActionTypes.DecodeTokenFailureExpired),
    tap(() => {
      this.tokenService.clear();
    })
  );

  @Effect()
  $decodeTokenSuccess = this.actions$.pipe(
    ofType<DecodeTokenSuccess>(AuthActionTypes.DecodeTokenSuccess),
    map(() => new LoginSuccess())
  )

  @Effect({dispatch: false})
  $loginSuccess = this.actions$.pipe(
    ofType<LoginSuccess>(AuthActionTypes.LoginSuccess),
    tap(() => {
      // this.router.navigate(['/']);
      this.router.navigate(['/community']); // temp
    })
  );

  @Effect({dispatch: false})
  $loginFailed = this.actions$.pipe(
    ofType<LoginFailure>(AuthActionTypes.LoginFailure),
    tap(() => {
      // this.message.error('Login failed');
      this.router.navigate(['/home/register']);
    })
  );

  @Effect()
  $register = this.actions$.pipe(
    ofType<Register>(AuthActionTypes.Register),
    map(action => action.payload),
    exhaustMap((form: RegisterForm) => {
      return this.usersService.register(form).pipe(
        map(user => new RegisterSuccess()),
        catchError(error => of(new RegisterFailure(error)))
      );
    })
  );

  @Effect({dispatch: false})
  $logout = this.actions$.pipe(
    ofType<Logout>(AuthActionTypes.Logout),
    tap(() => {
      this.tokenService.clear();
    })
  );

  constructor(
    private actions$: Actions,
    private tokenService: TokenService,
    private usersService: UsersService,
    private router: Router,
    private message: NzMessageService
  ) {}
}
import {UsersService} from '../service/users.service';
import {ApiError} from '../../core/models/error';

import {CoreActionTypes, EnterApplication, NoAction} from '../../core/actions/core.actions';
