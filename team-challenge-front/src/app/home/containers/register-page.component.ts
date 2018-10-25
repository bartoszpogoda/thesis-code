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
    <app-parallax-content imageUrl="/assets/images/home/basketball-background.jpg">
      <app-success-alert [display]="justRegistered$ | async" [message]="registerSuccessMessage"
      [details]="registerSuccessDetails"></app-success-alert>
      <app-api-error-alert [error]="registerError$ | async"></app-api-error-alert>
      <app-api-error-alert [error]="loginError$ | async" [extraText]="loginErrorExtraText"></app-api-error-alert>
      <app-breadcrumb [items]="breadcrumbItems"></app-breadcrumb>
      <h1>Dołącz do nas już dzisiaj!</h1>
      <p>Jesteś gotowy podjąć wyzwanie? Zarejestruj się korzystając z poniższego formularza.</p>
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
  registerSuccessMessage = 'Rejestracja zakończona powodzeniem!';
  registerSuccessDetails = 'Możesz teraz zalogować się na swoje konto.';
  loginErrorExtraText = 'Jeśli nie posiadasz konta zarejestruj się korzystając z poniższego formularza.';
  breadcrumbItems: BreadcrumbItem[] = [
    {link: '/home', title: 'Strona główna'},
    {title: 'Rejestracja'}
  ];
  loginError$: Observable<ApiError>;
  registerPending$: Observable<boolean>;
  justRegistered$: Observable<boolean>;
  registerError$: Observable<ApiError>;

  constructor(private store: Store<fromAuth.State>) {
    this.loginError$ = this.store.pipe(select(fromAuth.selectLoginError));
    this.justRegistered$ = this.store.pipe(select(fromAuth.selectJustRegistered));
    this.registerError$ = this.store.pipe(select(fromAuth.selectRegisterError));
  }

  onRegister($event: RegisterForm) {
    this.store.dispatch(new authActions.Register($event));
  }

}
