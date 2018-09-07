import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {PlayerProfilePageComponent} from './containers/player-profile-page.component';

const routes: Routes = [
  {
    path: '',
    component: PlayerProfilePageComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PlayerRoutingModule { }
