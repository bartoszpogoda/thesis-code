import {Component, Input, OnChanges, SimpleChange, SimpleChanges} from '@angular/core';
import {NgProgress} from '@ngx-progressbar/core';

@Component({
  selector: 'app-progress',
  template: `
    <ng-progress></ng-progress>
  `
})
export class ProgressComponent implements OnChanges {

  @Input() inProgress: boolean;

  constructor(public progress: NgProgress) { }

  ngOnChanges(changes: SimpleChanges): void {
    const inProgress: SimpleChange = changes.inProgress;
    if (inProgress.currentValue) {
      this.progress.start();
    } else {
      this.progress.complete();
    }
  }
}
