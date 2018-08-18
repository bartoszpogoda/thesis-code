import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-breadcrumb',
  // changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <nz-breadcrumb>
      <nz-breadcrumb-item *ngFor="let item of items">{{item}}</nz-breadcrumb-item>
    </nz-breadcrumb>
  `,
  styles: [`
    nz-breadcrumb {
      margin: 16px 0;
    }
  `]
})
export class BreadcrumbComponent {
  @Input() items: string[];
}
