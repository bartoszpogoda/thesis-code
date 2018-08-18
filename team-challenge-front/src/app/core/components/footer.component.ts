import {Component} from '@angular/core';

@Component({
  selector: 'app-footer',
  // changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    Copyright ©{{currentYear}} Bartosz Pogoda
  `
})
export class FooterComponent {
  currentYear = 2017;

  constructor() {
    const currentDate = new Date();
    this.currentYear = currentDate.getFullYear();
  }
}
