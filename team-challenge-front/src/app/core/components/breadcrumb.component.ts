import {Component, Input} from '@angular/core';
import {BreadcrumbItem} from '../models/breadcrumb';

@Component({
  selector: 'app-breadcrumb',
  // changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <nz-affix *ngIf="!empty" [nzOffsetTop]="64">
      <nz-breadcrumb>
        <nz-breadcrumb-item *ngFor="let item of items">
          <a *ngIf="item.link" [routerLink]="[item.link]">{{item.title}}</a>
          <span *ngIf="!item.link">{{item.title}}</span>
        </nz-breadcrumb-item>
      </nz-breadcrumb>
    </nz-affix>
    <div *ngIf="empty" style="height: 25px;"></div>

  `,
  styles: [`
    nz-breadcrumb {
      padding: 16px 0;
      background-color: #f0f2f5;
    }
  `]
})
export class BreadcrumbComponent {
  @Input() items: BreadcrumbItem[];

  @Input() empty: boolean;
}
