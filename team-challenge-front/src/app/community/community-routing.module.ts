import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {CommunityPageComponent} from './containers/community-page.component';

const routes: Routes = [
  {
    path: '',
    component: CommunityPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CommunityRoutingModule { }
