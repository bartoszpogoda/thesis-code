import {Component} from '@angular/core';
import {Observable} from 'rxjs';
import {ApiError} from '../models/error';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import * as AuthActions from '../../auth/actions/auth.actions';
import {select, Store} from '@ngrx/store';
import * as fromAuth from '../../auth/reducers';
import {NgProgress} from '@ngx-progressbar/core';
import {NzMessageService} from 'ng-zorro-antd';
import {Authenticate} from '../../auth/models/authenticate';

@Component({
  selector: 'app-navbar-login',
  template: `
    <app-login-form-horizontal [error]="loginError$ | async" (submitted)="onLogin($event)"></app-login-form-horizontal>
  `
})
export class NavbarLoginComponent {
  loginPending$: Observable<boolean>;
  loginError$: Observable<ApiError>;

  constructor(
    private store: Store<fromAuth.State>
  ) {
    this.loginError$ = this.store.pipe(select(fromAuth.selectLoginError));
  }

  onLogin($event: Authenticate) {
    this.store.dispatch(new AuthActions.Login($event));
  }
}
