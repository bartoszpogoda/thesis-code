import { NgModule, ModuleWithProviders } from '@angular/core';
import {HomePageComponent} from './containers/home-page.component';
import {HomeRoutingModule} from './home-routing.module';
import {NgZorroAntdModule} from 'ng-zorro-antd';
import {ParallaxImageComponent} from './components/parallax-image.component';
import {NgProgressModule} from '@ngx-progressbar/core';
import {CoreModule} from '../core/core.module';
import {AuthModule} from '../auth/auth.module';
import {RegisterPageComponent} from './containers/register-page.component';
import {CommonModule} from '@angular/common';
import {ParallaxContentComponent} from './components/parallax-content.component';
import {LoginFailedAlertComponent} from './components/login-failed-alert.component';
import {IntroductionComponent} from './components/introduction.component';
import {ParallaxImageVhComponent} from './components/parallax-image-vh.component';
import {IntroductionHeaderComponent} from './components/introduction-header.component';
import {StatsComponent} from './components/stats.component';
import {StatsService} from './service/stats.service';

export const COMPONENTS = [HomePageComponent, ParallaxImageComponent, ParallaxContentComponent, RegisterPageComponent,
LoginFailedAlertComponent, IntroductionComponent, ParallaxImageVhComponent, IntroductionHeaderComponent, StatsComponent];

@NgModule({
  imports: [CommonModule, HomeRoutingModule, NgZorroAntdModule, CoreModule, AuthModule,
    NgProgressModule.forRoot({
      spinner: false,
      thick: true
    })],
  declarations: COMPONENTS,
  exports: COMPONENTS,
  providers: [StatsService]
})
export class HomeModule { }
