import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {TeamReview} from '../models/review';


@Component({
  selector: 'app-review',
  // changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div nz-row>
      <div nz-col nzSm="24" style="text-align: center">

          <div nz-row>
            <div nz-col [nzOffset]="4" [nzSm]="16" [nzXs]="24">
              <p>Oceń poziom fair play swoich przeciwników.
                <i class="anticon anticon-question-circle-o" nz-tooltip nzPlacement="bottom"
                   nzTitle="Drużyny mające wysoką średnią ocen poziomu Fair-Play są promowane w wynikach wyszukiwania">
                </i>
              </p>
              <nz-rate nzDisabled [ngModel]="review.fairPlayLevel"></nz-rate>
            </div>
          </div>

        <div nz-row>
          <div nz-col [nzOffset]="4" [nzSm]="16" [nzXs]="24">
              <p>Czy chcesz dodatkowo promować drużynę w swoich wynikach wyszukiwania w przyszłości?
                <i class="anticon anticon-question-circle-o" nz-tooltip nzPlacement="bottom"
                   nzTitle="Wyrażenie chęci ponownego spotkania z drużyną 
      podnosi jej pozycję w wynikach wyszukiwania. Drużyna będzie oznaczona tagiem 'Zagraj ponownie'">
                </i>
              </p>
              <label nz-checkbox nzDisabled [ngModel]="review.playAgain">{{review.playAgain ? 'Tak' : 'Nie'}}</label>
            </div>
          </div>

      </div>
    </div>
  `
})
export class ReviewComponent {

  @Input()
  review: TeamReview;


}

