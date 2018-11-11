import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import {AppComponent} from './core/containers/app.component';
import {CoreModule} from './core/core.module';
import {CommonModule} from '@angular/common';
import {StoreModule} from '@ngrx/store';
import {metaReducers, reducers} from './core/reducers/index';
import {StoreRouterConnectingModule} from '@ngrx/router-store';
import {environment} from '../environments/environment';
import {StoreDevtoolsModule} from '@ngrx/store-devtools';
import {EffectsModule} from '@ngrx/effects';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NgProgressModule} from '@ngx-progressbar/core';
import {PlayerEffects} from './core/effects/player.effects';
import {PlayerService} from './core/service/player.service';
import {LoggedInAuthGuard} from './core/service/auth-guard.service';
import {NguiMapModule} from '@ngui/map';
import {CommunityModule} from './community/community.module';
import {ChallengeModule} from './challenge/challenge.module';

import { registerLocaleData } from '@angular/common';
import pl from '@angular/common/locales/pl';
registerLocaleData(pl);

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

    CommunityModule, ChallengeModule,

    NguiMapModule.forRoot({apiUrl: 'https://maps.google.com/maps/api/js?key=AIzaSyCyK7i7jhCaOVD9iA8D_bxDAy1-NoumZ1c'}),

    NgProgressModule.forRoot({
      spinner: false,
      thick: true
    })
  ],
  providers: [PlayerService, LoggedInAuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
