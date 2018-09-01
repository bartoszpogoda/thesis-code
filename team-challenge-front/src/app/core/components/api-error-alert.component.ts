import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {ApiError} from '../models/error';

/**
 * Displays API error on NZ alert.
 */
@Component({
  selector: 'app-api-error-alert',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <nz-alert *ngIf="error" nzType="error" [nzMessage]="error.message" [nzDescription]="error.details + extraText" nzShowIcon>
    </nz-alert>
  `
})
export class ApiErrorAlertComponent {
  @Input() error: ApiError|null;
  @Input() extraText = '';
}
