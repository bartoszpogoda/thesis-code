import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-parallax-content',
  template: `
    <div class="parallax-image" [style.backgroundImage]="'url('+ imageUrl +')'" style="min-height: 95vh">
      <div nz-row>
        <div nz-col nzXs="0" nzSm="4"></div>
        <div nz-col nzXs="24" nzSm="16">
          <div class="content-container">
            <ng-content></ng-content>
          </div>
        </div>
        <div nz-col nzXs="0" nzSm="4"></div>
      </div>
    </div>
    `,
  styles: [
    `
      .parallax-image {
        padding: 20px;
        position: relative;
        background: no-repeat fixed center;
        background-size: cover;
      }
      ng-content {
        opacity: 1.0;
      }

    `
  ],
})
export class ParallaxContentComponent {

  @Input() imageUrl: string;

}
