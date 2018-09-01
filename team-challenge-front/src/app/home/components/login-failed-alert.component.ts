import {Component} from '@angular/core';

@Component({
  selector: 'app-login-failed-alert',
  template: `
    <div nz-row>
      <div nz-col nzXs="0" nzSm="4"></div>
      <div nz-col nzXs="24" nzSm="16">
        <nz-alert nzType="error" nzMessage="Login failed" [nzDescription]="desc" nzShowIcon>
        </nz-alert>
      </div>
    </div>
  `
})
export class LoginFailedAlertComponent {
  desc = 'Email or password was incorrect. Please try again. ' +
    'If you don\'t have an account yet you can register using form presented below';
}
