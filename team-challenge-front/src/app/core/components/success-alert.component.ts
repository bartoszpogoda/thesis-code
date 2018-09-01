import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {ApiError} from '../models/error';

/**
 * Displays success alert.
 */
@Component({
  selector: 'app-success-alert',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <nz-alert *ngIf="display" nzType="success" [nzMessage]="message" [nzDescription]="details " nzShowIcon>
    </nz-alert>
  `
})
export class SuccessAlertComponent {
  @Input() display: boolean;
  @Input() message = '';
  @Input() details = '';
}
