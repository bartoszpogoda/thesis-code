import {Component, EventEmitter, Input, Output} from '@angular/core';
@Component({
  selector: 'app-notification-bell',
  // changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <nz-badge (click)="bellClicked.emit()" [nzCount]="badgeCount" [nzStyle]="{ boxShadow: '0 0 0 0px' }">
      <i class="anticon anticon-bell"></i>
    </nz-badge>
  `
})
export class NotificationBellComponent {
  @Input() badgeCount = 0;
  @Output() bellClicked = new EventEmitter();
}

