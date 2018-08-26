import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { AppComponent } from './containers/app.component';
import {NotFoundPageComponent} from './containers/not-found-page.component';
import {en_US, NgZorroAntdModule, NZ_I18N} from 'ng-zorro-antd';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {BreadcrumbComponent} from './components/breadcrumb.component';
import {FooterComponent} from './components/footer.component';
import {NavItemComponent} from './components/nav-item.component';
import {NotificationBellComponent} from './components/notification-bell.component';
import {NotificationPanelComponent} from './containers/notification-panel.component';
import {LoginComponent} from './containers/login.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

export const COMPONENTS = [
  AppComponent,
  NotFoundPageComponent,
  BreadcrumbComponent,
  FooterComponent,
  NavItemComponent,
  NotificationBellComponent,
  NotificationPanelComponent,
  LoginComponent
];

@NgModule({
  imports: [CommonModule, RouterModule, NgZorroAntdModule, BrowserAnimationsModule, FormsModule, ReactiveFormsModule],
  declarations: COMPONENTS,
  exports: COMPONENTS,
  providers: [{ provide: NZ_I18N, useValue: en_US }]
})
export class CoreModule {
  static forRoot() {
    return {
      ngModule: CoreModule,
      providers: [],
    };
  }
}
