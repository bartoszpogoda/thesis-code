import {AfterViewInit, Component, OnInit} from '@angular/core';
import {NgProgress} from '@ngx-progressbar/core';

@Component({
  selector: 'app-home-page',
  template: `
    <app-parallax-image [height]="400" imageUrl="/assets/images/home/basketball-background.jpg">
      <div nz-row nzGutter="16">
        <div nz-col nzXs="0" nzSm="6"></div>
        <div nz-col nzXs="0" nzSm="6"></div>
        <div nz-col  nzXs="24" nzSm="6">
          <h3>“Talent wins games, but teamwork and intelligence win championships.”</h3>
          <p class="pull-right">Michael Jordan</p>
        </div>
      </div>
    </app-parallax-image>
    <div class="content-container">
      <div nz-row nzGutter="16">
        <div nz-col class="gutter-row" nzXs="24" nzSm="12">
          <div class="box">
            <h2>About ...</h2>
            <p>
              Welcome to the system...
            </p>
          </div>
        </div>
        <div nz-col class="gutter-row" nzXs="24" nzSm="12">
        <div class="box">
          Link to register
        </div>
        </div>
      </div>
      <div class="temp-content"></div>
    </div>
    <app-parallax-image [height]="200" imageUrl="/assets/images/home/basketball-background.jpg"></app-parallax-image>
    `,
  styles: [
    `
      .box {
        text-align: center;
        /*background: #00A0E9;*/
        padding: 5px 5px;
        /*height: 100px;*/
      }
      .temp-content {
        height: 150vh;
      }
    `
  ],
})
export class HomePageComponent  {

}
