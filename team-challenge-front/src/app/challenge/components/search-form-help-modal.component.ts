import {ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {PlaceTimeOffer, Result} from '../models/challenge';
import {Position} from '../../core/models/position';
import {Facility} from '../../core/models/facility';

import {LocalDate, LocalDateTime, nativeJs, ZonedDateTime, ZoneId, ZoneOffset} from 'js-joda';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {PlayerRegistrationForm} from '../../core/models/player';
import {Region} from '../../core/models/region';
import {Team} from '../../core/models/team';


@Component({
  selector: 'app-search-form-help-modal',
  template: `

    <div (click)="showModal()" style="display: inline-block; text-align: center; float: right; margin-right: 20px; cursor: pointer;">
      <i class="anticon anticon-question-circle-o"></i> Jak rozdać punkty preferencji?
    </div>
    <nz-modal [(nzVisible)]="isVisible" nzTitle="Jak rozdać punkty preferencji" [nzFooter]="modalFooter"
              (nzOnOk)="quit()" (nzOnCancel)="quit()" nzWidth="1000px">

      <div nz-row>
        <div nz-col nzSm="24">
          <p>Rozkład punktów preferencji wpływa na kolejność drużyn w wynikach wyszukiwania. 
            Punkty preferencji zawsze sumują się do wartości 100PP. 
          </p>
          <p>Poniżej przedstawiono przykładowe rozdania punktów preferencji. </p>
          <nz-tabset>
            <nz-tab nzTitle="Przykład A">
              <p>Drużynie A jednakowo zależy na podobieństwie wieku, doświadczenia oraz odległości. Dlatego punkty preferencji zostały 
              rozdane tak aby zachować równowagę.</p>
              <img src="/assets/images/search/help-equal.PNG">
            </nz-tab>
            <nz-tab nzTitle="Przykład B">
              <p>Drużyna B trenuje do turnieju szkolnego. Z tego powodu zależy im na grze z osobami w podobnym wieku oraz o podobnym 
                doświadczeniu. Jeden z zawodników dysponuje samochodem, dlatego odległość nie gra żadnej roli.</p>
              <img src="/assets/images/search/help-skill-age.PNG">
            </nz-tab>
            <nz-tab nzTitle="Przykład C">
              <p>Drużyna C chce poznać drużyny w swojej okolicy. Wiek ani doświadczenie nie gra żadnej roli.</p>
              <img src="/assets/images/search/help-distance.PNG">
            </nz-tab>
            <nz-tab nzTitle="Czy wiesz że?">
              <p>Aby zablokować suwak na wybranej wartości użyj kłódki.</p>
              <img src="/assets/images/search/help-lock.PNG">
            </nz-tab>
          </nz-tabset>
          
        </div>
      </div>
      
      <ng-template #modalFooter>
        <button nz-button nzType="primary" (click)="quit()">Ok</button>
      </ng-template>
    </nz-modal>
  `, styles: [`
    img {
      width: 100%;
    }
  `]
})
export class SearchFormHelpModalComponent {

  isVisible = false;

  showModal(): void {
    this.isVisible = true;
  }

  quit(): void {
    this.isVisible = false;
  }

}

