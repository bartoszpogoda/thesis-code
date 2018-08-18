import {Component, EventEmitter, Input, Output} from '@angular/core';
@Component({
  selector: 'app-notification-panel',
  // changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <nz-drawer [nzClosable]="false" [nzVisible]="isVisible" nzPlacement="right" nzTitle="Notifications">
      <p>Newest action</p>
    </nz-drawer>
  `
})
export class NotificationPanelComponent {
  @Input() isVisible = false;
}

