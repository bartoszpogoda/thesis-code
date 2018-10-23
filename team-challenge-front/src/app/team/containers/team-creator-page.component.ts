import {Component} from '@angular/core';


@Component({
  selector: 'app-team-creator-page',
  template: `
    <div class="spaces-sides">
      <app-breadcrumb [items]="items"></app-breadcrumb>
      <div class="content-container">
        <h1>Kreator drużyny</h1>
        <nz-steps [nzCurrent]="current">
          <nz-step nzTitle="Podstawowe dane"></nz-step>
          <nz-step nzTitle="Punkt 'Home'"></nz-step>
          <nz-step nzTitle="Coś jeszcze?"></nz-step>
        </nz-steps>

        <div class="steps-content">
          <app-creator-base-data *ngIf="current == 0"></app-creator-base-data>
        </div>
        <div class="steps-action">
          <button nz-button nzType="default" (click)="pre()" *ngIf="current > 0">
            <span>Previous</span>
          </button>
          <button nz-button nzType="default" (click)="next()" *ngIf="current < 2">
            <span>Next</span>
          </button>
          <button nz-button nzType="primary" (click)="done()" *ngIf="current === 2">
            <span>Done</span>
          </button>
        </div>
      </div>
    </div>
  `,
  styles  : [
    `
      .steps-content {
        margin-top: 16px;
        border: 1px dashed #e9e9e9;
        border-radius: 6px;
        background-color: #fafafa;
        min-height: 200px;
        text-align: center;
        padding-top: 80px;
      }

      .steps-action {
        margin-top: 24px;
      }

      button {
        margin-right: 8px;
      }
    `
  ]
})
export class TeamCreatorPageComponent {
  items = [
    {title: 'Drużyna', link: '/team'}, {title: 'Kreator'}
  ];

  current = 0;

  pre(): void {
    this.current -= 1;
  }

  next(): void {
    this.current += 1;
  }

  done(): void {
    console.log('done');
  }

  constructor() {
  }
}
