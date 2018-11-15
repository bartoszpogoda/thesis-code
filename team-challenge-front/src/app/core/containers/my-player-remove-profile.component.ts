import {Component} from '@angular/core';

@Component({
  selector: 'app-my-player-remove-profile',
  template: `
      <h2>Usunięcie profilu</h2>
      <app-prototype-notification [unavailable]="true" [inline]="true"></app-prototype-notification>
  `
})
export class MyPlayerRemoveProfileComponent {

}
