import {Component} from '@angular/core';

@Component({
  selector: 'app-my-team-manager-remove',
  template: `
      <h2>Usunięcie drużyny</h2>
      <app-prototype-notification [unavailable]="true" [inline]="true"></app-prototype-notification>
  `
})
export class MyTeamManagerRemoveComponent {

}
