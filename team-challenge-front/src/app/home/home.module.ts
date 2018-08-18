import { NgModule, ModuleWithProviders } from '@angular/core';
import {HomePageComponent} from './containers/home-page.component';
import {HomeRoutingModule} from './home-routing.module';
import {NgZorroAntdModule} from 'ng-zorro-antd';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

export const COMPONENTS = [HomePageComponent];

@NgModule({
  imports: [HomeRoutingModule, NgZorroAntdModule],
  declarations: COMPONENTS,
  exports: COMPONENTS,
})
export class HomeModule { }
