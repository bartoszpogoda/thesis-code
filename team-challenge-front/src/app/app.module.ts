import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import {AppComponent} from './core/containers/app.component';
import {CoreModule} from './core/core.module';
import {CommonModule} from '@angular/common';
import {StoreModule} from '@ngrx/store';
import {metaReducers, reducers} from './reducers';
import {StoreRouterConnectingModule} from '@ngrx/router-store';
import {environment} from '../environments/environment';
import {StoreDevtoolsModule} from '@ngrx/store-devtools';
import {EffectsModule} from '@ngrx/effects';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NgProgressModule} from '@ngx-progressbar/core';
import {PlayerEffects} from './core/effects/player.effects';
import {PlayerService} from './core/services/player.service';
import {LoggedInAuthGuard} from './core/services/auth-guard.service';

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,

    StoreModule.forRoot(reducers, { metaReducers}),

    StoreRouterConnectingModule.forRoot({
      stateKey: 'router'
    }),


    StoreDevtoolsModule.instrument({
      name: 'NgRx Book Store DevTools',
      logOnly: environment.production,
    }),

    EffectsModule.forRoot([PlayerEffects]),

    CoreModule.forRoot(),

    NgProgressModule.forRoot({
      spinner: false,
      thick: true
    })
  ],
  providers: [PlayerService, LoggedInAuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
