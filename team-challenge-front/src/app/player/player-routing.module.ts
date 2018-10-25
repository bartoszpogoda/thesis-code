import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {PlayerProfilePageComponent} from './containers/player-profile-page.component';
import {PlayerCreatorGuard} from './service/player-creator-guard.service';
import {PlayerProfileCreatorPageComponent} from './containers/player-profile-creator-page.component';

const routes: Routes = [
  {
    path: '',
    component: PlayerProfilePageComponent,
    canActivate: [PlayerCreatorGuard]
  },
  {
    path: 'new',
    component: PlayerProfileCreatorPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PlayerRoutingModule { }
