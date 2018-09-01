import {Component} from '@angular/core';

@Component({
  selector: 'app-register-success-alert',
  template: `
    <div nz-row>
      <div nz-col nzXs="0" nzSm="4"></div>
      <div nz-col nzXs="24" nzSm="16">
        <nz-alert nzType="success" nzMessage="Registration successful" [nzDescription]="desc" nzShowIcon>
        </nz-alert>
      </div>
    </div>
  `
})
export class RegisterSuccessAlertComponent {
  desc = 'You can now log in.';
}
