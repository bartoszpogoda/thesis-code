import {Component, EventEmitter, Input, Output} from '@angular/core';
@Component({
  selector: 'app-nav-item',
  // changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
      <i *ngIf="icon !== ''" class="anticon anticon-{{icon}}"></i>
      {{title}} <nz-badge [nzCount]="badgeCount" [nzStyle]="{ boxShadow: '0 0 0 0px' }"></nz-badge>
  `
})
export class NavItemComponent {
  @Input() badgeCount = 0;
  @Input() title: string;
  @Input() icon = '';
}

