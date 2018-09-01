import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-parallax-image',
  template: `
    <div class="parallax-image" [style.backgroundImage]="'url('+ imageUrl +')'" [style.height.px]="height">
      <div class="on-image-caption">{{text}}</div>
      <div class="on-image-content">
        <ng-content></ng-content>
      </div>
    </div>
    `,
  styles: [
    `
      .parallax-image {
        position: relative;
        opacity: 0.75;
        background: no-repeat fixed center;
        background-size: cover;
      }

      .on-image-content {
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
      }

      .on-image-caption {
        position: absolute;
        left: 0;
        top: 50%;
        width: 100%;
        text-align: center;
        background-color: transparent;
        font-size: 1.7em;
        color: #f7f7f7;
      }
    `
  ],
})
export class ParallaxImageComponent {

  @Input() imageUrl: string;
  @Input() text: string;
  @Input() height: number;

}
