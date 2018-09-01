import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NgProgressModule} from '@ngx-progressbar/core';
import {en_US, NgZorroAntdModule, NZ_I18N} from 'ng-zorro-antd';

import {reducers} from './reducers';
import {StoreModule} from '@ngrx/store';
import {EffectsModule} from '@ngrx/effects';
import {AuthEffects} from './effects/auth.effects';
import {TokenService} from './service/token.service';
import {HttpClientModule} from '@angular/common/http';
import {RegisterFormComponent} from './components/register-form.component';
import {UsersService} from './service/users.service';
import {LoginFormHorizontalComponent} from './components/login-form-horizontal.component';

export const COMPONENTS = [
  LoginFormHorizontalComponent,
  RegisterFormComponent
];

@NgModule({
  imports: [CommonModule, RouterModule, NgZorroAntdModule, FormsModule, ReactiveFormsModule,
    HttpClientModule,
    StoreModule.forFeature('auth', reducers),
    EffectsModule.forFeature([AuthEffects]),
    NgProgressModule.forRoot()],
  declarations: COMPONENTS,
  exports: COMPONENTS,
  providers: [TokenService, UsersService, { provide: NZ_I18N, useValue: en_US }]
})
export class AuthModule {
  static forRoot() {
    return {
      ngModule: AuthModule,
      providers: [],
    };
  }
}
