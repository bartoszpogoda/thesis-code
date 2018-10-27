import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {PlayerProfileCreatorPageComponent} from './containers/player-profile-creator-page.component';

const routes: Routes = [
  {
    path: '',
    component: PlayerProfileCreatorPageComponent,
    canActivate: []
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PlayerCreatorRoutingModule { }
