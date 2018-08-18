import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home-page',
  template: `
    <div nz-row nzGutter="16">
      <div nz-col class="gutter-row" nzXs="24" nzSm="8">
        <div class="box">
          Col
        </div>
      </div>
      <div nz-col class="gutter-row" nzXs="24" nzSm="8">
        <div class="box">
          Col
        </div>
      </div>
      <div nz-col class="gutter-row" nzXs="24" nzSm="8">
        <div class="box">
          Col
        </div>
      </div>
    </div>
    <div class="temp-content"></div>
    `,
  styles: [
    `
      .box {
        text-align: center;
        background: #00A0E9;
        padding: 5px 5px;
        height: 100px;
      }
      .temp-content {
        height: 300vh;
      }
    `
  ],
})
export class HomePageComponent implements OnInit {

  ngOnInit() {}

}
