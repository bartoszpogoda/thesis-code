import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import {AppComponent} from './core/containers/app.component';
import {CoreModule} from './core/core.module';
import {CommonModule} from '@angular/common';

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,

    CoreModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
