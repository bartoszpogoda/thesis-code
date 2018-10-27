import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {NotFoundPageComponent} from './core/containers/not-found-page.component';
import {LoggedInAuthGuard} from './core/service/auth-guard.service';

const routes: Routes = [
  {
    path: '',
    loadChildren: './core/core.module#CoreModule',
    canActivate: [LoggedInAuthGuard]
  },
  {
    path: 'home',
    loadChildren: './home/home.module#HomeModule'
  },
  {
    path: 'community',
    loadChildren: './community/community.module#CommunityModule',
    canActivate: [LoggedInAuthGuard]
  },
  {
    path: '**',
    component: NotFoundPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
