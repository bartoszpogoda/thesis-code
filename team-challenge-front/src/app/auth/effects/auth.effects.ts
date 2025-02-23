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
  RegisterSuccess, RenewToken, RenewTokenFailure, RenewTokenReceived, RenewTokenSuccess
} from '../actions/auth.actions';
import {catchError, exhaustMap, map, switchMap, tap, withLatestFrom} from 'rxjs/operators';
import {Authenticate} from '../models/authenticate';
import {TokenService} from '../service/token.service';
import {of} from 'rxjs';
import {DecodedToken, Token} from '../models/token';
import {Router} from '@angular/router';
import {NzMessageService} from 'ng-zorro-antd';
import {RegisterForm} from '../models/register';
import {AuthState, selectTokenRenewalPending} from '../reducers';
import {CoreActionTypes, EnterApplication, NoAction} from '../../core/actions/core.actions';
import {select, Store} from '@ngrx/store';
import {UsersService} from '../service/users.service';
import {successMessageEffect} from '../../core/util/functions';
import {PlayerCreatorActionTypes, UploadAvatarSuccess} from '../../player-creator/store/player-creator.actions';
import {selectRouterPath} from '../../core/reducers';

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
    withLatestFrom(this.store.pipe(select(selectTokenRenewalPending))),
    map(([, tokenRenewalPending]) => tokenRenewalPending ? new RenewTokenSuccess() : new LoginSuccess())
  );

  @Effect({dispatch: false})
  $loginSuccess = this.actions$.pipe(
    ofType<LoginSuccess>(AuthActionTypes.LoginSuccess),
    withLatestFrom(this.store.pipe(select(selectRouterPath))),
    tap(() => {
      if (this.router.url.startsWith('/home')) { // refactor
        console.log(this.router.url);
        this.router.navigate(['/community']);
      }
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

  @Effect()
  $renewToken = this.actions$.pipe(
    ofType<RenewToken>(AuthActionTypes.RenewToken),
    exhaustMap(() => {
      return this.tokenService.renew().pipe(
        map(token => new RenewTokenReceived(token)),
        catchError(error => of(new RenewTokenFailure(error)))
      );
    })
  );

  @Effect()
  $renewTokenReceived = this.actions$.pipe(
    ofType<RenewTokenReceived>(AuthActionTypes.RenewTokenReceived),
    map(action => action.payload),
    map(payload => new DecodeToken(payload))
  );

  @Effect()
  $logoutOnRenewTokenFailure = this.actions$.pipe(
    ofType<RenewTokenFailure>(AuthActionTypes.RenewTokenFailure),
    map(() => new Logout())
  );

  @Effect({dispatch: false})
  $logout = this.actions$.pipe(
    ofType<Logout>(AuthActionTypes.Logout),
    tap(() => {
      this.router.navigate(['/home']);
      this.tokenService.clear();
    })
  );

  constructor(
    private actions$: Actions,
    private tokenService: TokenService,
    private usersService: UsersService,
    private router: Router,
    private message: NzMessageService,
    private store: Store<AuthState>
  ) {}
}
