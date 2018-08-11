import { NgModule, ModuleWithProviders } from '@angular/core';
import {HomePageComponent} from './containers/home-page.component';
import {HomeRoutingModule} from './home-routing.module';

export const COMPONENTS = [HomePageComponent];

@NgModule({
  imports: [HomeRoutingModule],
  declarations: COMPONENTS,
  exports: COMPONENTS,
})
export class HomeModule { }
