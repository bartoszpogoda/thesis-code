import { Action } from '@ngrx/store';
import {Authenticate} from '../models/authenticate';
import {Token} from '../models/token';
import {RegisterForm} from '../models/register';
import {ApiError} from '../../core/models/error';

export enum AuthActionTypes {
  Login = '[Auth] Login',
  LoginSuccess = '[Auth] Login Success',
  LoginFailure = '[Auth] Login Failure',
  Register = '[Auth] Register',
  RegisterSuccess = '[Auth] Register Success',
  RegisterFailure = '[Auth] Register Failure',
}

export class Login implements Action {
  readonly type = AuthActionTypes.Login;

  constructor(public payload: Authenticate) {}
}

export class LoginSuccess implements Action {
  readonly type = AuthActionTypes.LoginSuccess;

  constructor(public payload: Token) {}
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

export type AuthActionsUnion = Login | LoginSuccess
      | LoginFailure | Register | RegisterSuccess | RegisterFailure;
