import { Action } from '@ngrx/store';
import {Authenticate} from '../models/authenticate';
import {DecodedToken, Token} from '../models/token';
import {RegisterForm} from '../models/register';
import {ApiError} from '../../core/models/error';

export enum AuthActionTypes {
  Login = '[Auth] Login',
  LoginSuccess = '[Auth] Login Success',
  LoginFailure = '[Auth] Login Failure',
  Register = '[Auth] Register',
  RegisterSuccess = '[Auth] Register Success',
  RegisterFailure = '[Auth] Register Failure',
  GenerateTokenSuccess = '[Auth] Generate Token Success',
  DecodeToken = '[Auth] Decode Token',
  DecodeTokenSuccess = '[Auth] Decode Token Success',
  DecodeTokenFailureExpired = '[Auth] Decode Token Failure - Expired',
  Logout = '[Auth] Logout',
}

export class Login implements Action {
  readonly type = AuthActionTypes.Login;

  constructor(public payload: Authenticate) {}
}

export class LoginSuccess implements Action {
  readonly type = AuthActionTypes.LoginSuccess;
}

export class LoginFailure implements Action {
  readonly type = AuthActionTypes.LoginFailure;

  constructor(public payload: ApiError) {}
}

export class Register implements  Action {
  readonly type = AuthActionTypes.Register;

  constructor(public payload: RegisterForm) {}
}

export class RegisterSuccess implements Action {
  readonly type = AuthActionTypes.RegisterSuccess;
}

export class RegisterFailure implements Action {
  readonly type = AuthActionTypes.RegisterFailure;

  constructor(public payload: ApiError) {}
}

export class GenerateTokenSuccess implements Action {
  readonly type = AuthActionTypes.GenerateTokenSuccess;

  constructor(public payload: Token) {}
}

export class DecodeToken implements Action {
  readonly type = AuthActionTypes.DecodeToken;

  constructor(public payload: Token) {}
}

export class DecodeTokenSuccess implements Action {
  readonly type = AuthActionTypes.DecodeTokenSuccess;

  constructor(public payload: DecodedToken) {}
}

export class DecodeTokenFailureExpired implements Action {
  readonly type = AuthActionTypes.DecodeTokenFailureExpired;
}

export class Logout implements Action {
  readonly type = AuthActionTypes.Logout;
}

export type AuthActionsUnion = Login | LoginSuccess | LoginFailure
  | Register | RegisterSuccess | RegisterFailure | DecodeToken | DecodeTokenSuccess
  | GenerateTokenSuccess | DecodeTokenFailureExpired | Logout;
