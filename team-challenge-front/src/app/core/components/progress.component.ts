import {Component, Input, OnChanges, SimpleChange, SimpleChanges} from '@angular/core';
import {NgProgress} from '@ngx-progressbar/core';

@Component({
  selector: 'app-progress',
  template: `
    <ng-progress [id]="id"></ng-progress>
  `
})
export class ProgressComponent implements OnChanges {

  @Input() inProgress: boolean;
  @Input() id: string;

  constructor(public progress: NgProgress) { }

  ngOnChanges(changes: SimpleChanges): void {
    const inProgress: SimpleChange = changes.inProgress;
    if (inProgress.currentValue && !this.progress.isStarted(this.id)) {
      console.log('start ' + this.id);
      this.progress.start(this.id);
    } else {
      console.log('end ' + this.id);
      this.progress.complete(this.id);
    }
  }
}
