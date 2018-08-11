import { Component } from '@angular/core';

@Component({
  selector: 'app-app',
  // changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    Apply layout components here. <br/> <router-outlet></router-outlet>
  `,
})
export class AppComponent {

  constructor() {
  }

}
