import {Component, EventEmitter, Input, Output} from '@angular/core';
@Component({
  selector: 'app-notification-panel',
  // changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <nz-drawer [nzClosable]="false" [nzVisible]="isVisible" nzPlacement="right" nzTitle="Notifications">
      <!-- TODO to be extracted to dumb component, make discardable?-->
      <nz-card>
        <p>Your team "DreamTeam" was challenged!</p>
        <button nz-button nzType="primary">Details</button>
      </nz-card>
      <nz-card>
        <p>You've been invited to the team "DreamTeam"</p>
        <button nz-button nzType="primary">Details</button>
      </nz-card>
    </nz-drawer>
  `, styles: [`
    nz-card {
      margin-bottom: 5px;
    }
  `]
})
export class NotificationPanelComponent {
  @Input() isVisible = false;
}

