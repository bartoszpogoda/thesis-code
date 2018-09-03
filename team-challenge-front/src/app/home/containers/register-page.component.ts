import {Component, OnDestroy} from '@angular/core';

import * as fromAuth from './../../auth/reducers';
import * as authActions from './../../auth/actions/auth.actions';
import {select, Store} from '@ngrx/store';
import {from, Observable} from 'rxjs';
import {BreadcrumbItem} from '../../core/models/breadcrumb';
import {RegisterForm} from '../../auth/models/register';
import {Register} from '../../auth/actions/auth.actions';
import {NgProgress} from '@ngx-progressbar/core';
import {ApiError} from '../../core/models/error';

@Component({
  selector: 'app-register-page',
  template: `
    <app-progress [inProgress]="registerPending$ | async"></app-progress>
    <app-parallax-content imageUrl="/assets/images/home/basketball-background.jpg">
      <app-success-alert [display]="justRegistered$ | async" [message]="registerSuccessMessage"
      [details]="registerSuccessDetails"></app-success-alert>
      <app-api-error-alert [error]="registerError$ | async"></app-api-error-alert>
      <app-api-error-alert [error]="loginError$ | async" [extraText]="loginErrorExtraText"></app-api-error-alert>
      <app-breadcrumb [items]="breadcrumbItems"></app-breadcrumb>
      <h1>Join us today!</h1>
      <p>Are you ready to accept the challenge? Register using form below.</p>
      <app-register-form (submitted)="onRegister($event)"></app-register-form>
    </app-parallax-content>
  `, styles: [`
    img {
      max-width: 100%;
    }
    div [nz-col] {
      padding: 5px;
    }
  `]
})
export class RegisterPageComponent {
  registerSuccessMessage = 'Registration successful!';
  registerSuccessDetails = 'You can now log in onto your newly created account and team up with your friends.';
  loginErrorExtraText = ' If you don\'t have an account yet you can register using form presented below';
  breadcrumbItems: BreadcrumbItem[] = [
    {link: '/home', title: 'Home'},
    {title: 'Register'}
  ];
  loginError$: Observable<ApiError>;
  registerPending$: Observable<boolean>;
  justRegistered$: Observable<boolean>;
  registerError$: Observable<ApiError>;

  constructor(private store: Store<fromAuth.State>, public progress: NgProgress) {
    this.loginError$ = this.store.pipe(select(fromAuth.selectLoginError));
    this.registerPending$ = this.store.pipe(select(fromAuth.selectRegisterPending));
    this.justRegistered$ = this.store.pipe(select(fromAuth.selectJustRegistered));
    this.registerError$ = this.store.pipe(select(fromAuth.selectRegisterError));
    //
    // this.registerPending$.subscribe(pending => {
    //   if (pending) {
    //     this.progress.start();
    //   } else {
    //     this.progress.complete();
    //   }
    // }); // TODO unsubscribe on destruct
  }

  onRegister($event: RegisterForm) {
    this.store.dispatch(new authActions.Register($event));
  }

}
