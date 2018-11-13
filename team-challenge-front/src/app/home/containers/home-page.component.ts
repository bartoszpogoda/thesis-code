import {AfterViewInit, Component, OnInit} from '@angular/core';
import {NgProgress} from '@ngx-progressbar/core';
import {Stats, StatsService} from '../service/stats.service';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-home-page',
  template: `
    <app-parallax-image-vh [height]="60" imageUrl="/assets/images/home/basketball-background.jpg" class="onlyDesktop">>
      <div nz-row nzGutter="16">
        <div nz-col nzXs="0" nzSm="6"></div>
        <div nz-col nzXs="0" nzSm="6"></div>
        <div nz-col  nzXs="24" nzSm="6">
          <h3>“Talent wins games, but teamwork and intelligence win championships.”</h3>
          <p class="pull-right">Michael Jordan</p>
        </div>
      </div>
    </app-parallax-image-vh>
    <app-introduction-header></app-introduction-header>
    <app-stats [stats]="stats$ | async"></app-stats>
      <app-introduction></app-introduction>
    <app-parallax-image [height]="200" imageUrl="/assets/images/home/basketball-background.jpg"></app-parallax-image>`
})
export class HomePageComponent  {

  stats$: Observable<Stats>;

  constructor(private statsService: StatsService) {
    this.stats$ = this.statsService.get();
  }


}
