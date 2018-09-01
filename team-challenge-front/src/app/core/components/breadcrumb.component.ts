import {Component, Input} from '@angular/core';
import {BreadcrumbItem} from '../models/breadcrumb';

@Component({
  selector: 'app-breadcrumb',
  // changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <nz-breadcrumb>
      <nz-breadcrumb-item *ngFor="let item of items">
        <a *ngIf="item.link" [routerLink]="[item.link]">{{item.title}}</a>
        <span *ngIf="!item.link">{{item.title}}</span>
      </nz-breadcrumb-item>
    </nz-breadcrumb>
  `,
  styles: [`
    nz-breadcrumb {
      margin: 16px 0;
    }
  `]
})
export class BreadcrumbComponent {
  @Input() items: BreadcrumbItem[];
}
