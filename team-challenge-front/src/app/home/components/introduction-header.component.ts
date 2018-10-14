import {Component} from '@angular/core';

@Component({
  selector: 'app-introduction-header',
  template: `
    <div nz-row nzGutter="16" class="introcution-header-container">
      <div nz-col class="gutter-row" nzXs="0" nzSm="6"></div>
      <div nz-col class="gutter-row" nzXs="24" nzSm="12">
        <h1>{{introductionTitle}}</h1>
        <p>{{introductionContent}}</p>
        <button nz-button nzSize="large" nzType="default" class="register-button">Zarejestruj się</button>
        <p class="gap-top">albo przewiń stronę aby dowiedzieć się więcej...</p>
      </div>
    </div>
  `
})
export class IntroductionHeaderComponent {
  introductionTitle = '3x3 Basket Team Challenge';
  introductionContent = 'Serwis przeznaczony dla amatorskich drużyn koszykarskich chcących się sprawdzić oraz' +
    ' rozwijać swoje umiejętności poprzez rywalizację z lokalnymi przeciwnikami w podobnym wieku' +
    ' oraz o zbliżonym poziomie umiejętności.';
}
