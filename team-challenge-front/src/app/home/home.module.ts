import { NgModule, ModuleWithProviders } from '@angular/core';
import {HomePageComponent} from './containers/home-page.component';
import {HomeRoutingModule} from './home-routing.module';
import {NgZorroAntdModule} from 'ng-zorro-antd';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ParallaxImageComponent} from './components/parallax-image.component';
import {RegisterComponent} from './containers/register.component';

export const COMPONENTS = [HomePageComponent, ParallaxImageComponent, RegisterComponent];

@NgModule({
  imports: [HomeRoutingModule, NgZorroAntdModule],
  declarations: COMPONENTS,
  exports: COMPONENTS,
})
export class HomeModule { }
