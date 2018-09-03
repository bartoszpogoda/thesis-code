///<reference path="../actions/auth.actions.ts"/>
import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {
  AuthActionTypes,
  DecodeToken, DecodeTokenSuccess,
  Login,
  LoginFailure,
  LoginSuccess,
  Register,
  RegisterFailure,
  RegisterSuccess
} from '../actions/auth.actions';
import {catchError, exhaustMap, map, switchMap, tap} from 'rxjs/operators';
import {Authenticate} from '../models/authenticate';
import {TokenService} from '../service/token.service';
import {of} from 'rxjs';
import {Token} from '../models/token';
import {Router} from '@angular/router';
import {NzMessageService} from 'ng-zorro-antd';
import {RegisterFormComponent} from '../components/register-form.component';
import {RegisterForm} from '../models/register';
import {UsersService} from '../service/users.service';
import {ApiError} from '../../core/models/error';

@Injectable()
export class AuthEffects {
  @Effect()
  $login = this.actions$.pipe(
    ofType<Login>(AuthActionTypes.Login),
    map(action => action.payload),
    exhaustMap((auth: Authenticate) =>
      this.tokenService.create(auth).pipe(
        map(token => new DecodeToken(token)),
        catchError(error => of(new LoginFailure(error)))
      )
    )
  );

  @Effect()
  $decodeToken = this.actions$.pipe(
    ofType<Login>(AuthActionTypes.DecodeToken),
    map(action => action.payload),
    map((token: Token) =>
      new DecodeTokenSuccess(this.tokenService.decode(token))
    )
  );

  @Effect()
  $decodeTokenSuccess = this.actions$.pipe(
    ofType<Login>(AuthActionTypes.DecodeTokenSuccess),
    map(() => new LoginSuccess())
  )

  @Effect({dispatch: false})
  $loginSuccess = this.actions$.pipe(
    ofType<Login>(AuthActionTypes.LoginSuccess),
    tap(() => {
      this.router.navigate(['/']);
    })
  );

  @Effect({dispatch: false})
  $loginFailed = this.actions$.pipe(
    ofType<Login>(AuthActionTypes.LoginFailure),
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
  )

  constructor(
    private actions$: Actions,
    private tokenService: TokenService,
    private usersService: UsersService,
    private router: Router,
    private message: NzMessageService
  ) {}
}
