import {Component, EventEmitter, Input, Output} from '@angular/core';
@Component({
  selector: 'app-nav-item',
  // changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
      <nz-badge [nzDot]="notify" [nzStyle]="{ boxShadow: '0 0 0 0px' }">
        <i *ngIf="icon !== ''" class="anticon anticon-{{icon}}"></i> {{title}}
      </nz-badge>
  `,
  styles: [`
    nz-badge {
      color: inherit;
      padding: 3px;
    }
  `]
})
export class NavItemComponent {
  @Input() notify = false;
  @Input() title: string;
  @Input() icon = '';
}

