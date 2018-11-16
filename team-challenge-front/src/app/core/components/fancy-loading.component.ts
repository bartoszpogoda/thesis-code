import {ChangeDetectionStrategy, Component} from '@angular/core';

@Component({
  selector: 'app-fancy-loading',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="app-bootstrap-container">

      <!--<img class="player-image" src="/assets/images/loading/player.png" />-->
      <div class="spinner">
        <div class="double-bounce1"></div>
        <div class="double-bounce2"></div>
      </div>

    </div>
  `, styles: [`
    .app-bootstrap-container {
      position: relative;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      height: 250px;
      padding: 20px;
    }

    .app-bootstrap-container img {
      z-index: 1000;
      max-height: 100%;
    }

    .app-bootstrap-container .spinner {
      height: 200px;
      width: 200px;
      /*animation: rotate 2s linear infinite;*/
      transform-origin: center center;
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      margin: auto;
      z-index: 500;
    }

    .double-bounce1, .double-bounce2 {
      width: 100%;
      height: 100%;
      border-radius: 50%;
      background-color: #1890ff;
      opacity: 0.6;
      position: absolute;
      top: 0;
      left: 0;

      -webkit-animation: sk-bounce 2.0s infinite ease-in-out;
      animation: sk-bounce 2.0s infinite ease-in-out;
    }

    .double-bounce2 {
      -webkit-animation-delay: -1.0s;
      animation-delay: -1.0s;
    }

    @-webkit-keyframes sk-bounce {
      0%, 100% { -webkit-transform: scale(0.0) }
      50% { -webkit-transform: scale(1.0) }
    }

    @keyframes sk-bounce {
      0%, 100% {
        transform: scale(0.0);
        -webkit-transform: scale(0.0);
      } 50% {
          transform: scale(1.0);
          -webkit-transform: scale(1.0);
        }
    }
  `]
})
export class FancyLoadingComponent {
  currentYear = 2017;

  constructor() {
    const currentDate = new Date();
    this.currentYear = currentDate.getFullYear();
  }
}
