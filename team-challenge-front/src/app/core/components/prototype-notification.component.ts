import {Component, Input, OnChanges, SimpleChange, SimpleChanges} from '@angular/core';
import {NgProgress} from '@ngx-progressbar/core';

@Component({
  selector: 'app-prototype-notification',
  template: `
    <nz-alert [class.absolute]="!inline"
      nzType="warning"
      nzMessage="Wersja prototypowa"
      [nzDescription]="description"
      nzShowIcon>
    </nz-alert>
  `,
  styles: [`

    nz-alert.absolute {
      position: absolute;
      right: 20px;
      top: 83px;
    }

  `]
})
export class PrototypeNotificationComponent {

  @Input()
  set unavailable(unavailable: boolean) {
    this.description = unavailable ?
      'Funkcjonalność nie jest dostępna w wersji prototypowej' :
      'Funkcjonalność może nie być w pełni użyteczna';
  }

  @Input()
  inline: boolean;

  description = 'Funkcjonalność może nie być w pełni użyteczna';



}
