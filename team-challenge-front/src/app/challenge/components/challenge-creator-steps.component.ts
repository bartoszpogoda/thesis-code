import {ChangeDetectionStrategy, Component, Input, OnChanges, SimpleChange, SimpleChanges} from '@angular/core';
import {NgProgress} from '@ngx-progressbar/core';

@Component({
  selector: 'app-challenge-creator-steps',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <nz-steps [nzCurrent]="step" nzSize="small">
      <nz-step nzTitle="Określ preferencje"></nz-step>
      <nz-step nzTitle="Wybierz rywali"></nz-step>
      <nz-step nzTitle="Zaoferuj termin i miejsce"></nz-step>
      <nz-step nzTitle="Podsumowanie"></nz-step>
    </nz-steps>
  `
})
export class ChallengeCreatorStepsComponent {
  @Input() step: number;
}

