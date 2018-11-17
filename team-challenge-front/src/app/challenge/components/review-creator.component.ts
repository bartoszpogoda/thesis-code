import {ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Challenge, PlaceTimeOffer, Result} from '../models/challenge';
import {Position} from '../../core/models/position';
import {Facility} from '../../core/models/facility';

import {LocalDate, LocalDateTime, nativeJs, ZonedDateTime, ZoneId, ZoneOffset} from 'js-joda';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {PlayerRegistrationForm} from '../../core/models/player';
import {Region} from '../../core/models/region';
import {Team} from '../../core/models/team';
import {TeamReview} from '../models/review';


@Component({
  selector: 'app-review-creator',
  template: `
      <div nz-row>
        <div nz-col nzSm="24">
          <form nz-form [formGroup]="validateForm" (ngSubmit)="submitForm()" style="text-align: center">

            <nz-form-item>
              <nz-form-control [nzOffset]="4" [nzSm]="16" [nzXs]="24">
                <p>Oceń poziom fair play swoich przeciwników. 
                  <i class="anticon anticon-question-circle-o" nz-tooltip nzPlacement="bottom"
                     nzTitle="Drużyny mające wysoką średnią ocen poziomu Fair-Play są promowane w wynikach wyszukiwania">
                  </i>
                </p>
                <nz-rate formControlName="fairPlay"></nz-rate>
              </nz-form-control>
            </nz-form-item>

            <nz-form-item>
              <nz-form-control [nzOffset]="4" [nzSm]="16" [nzXs]="24">
                <p>Czy chcesz dodatkowo promować drużynę w swoich wynikach wyszukiwania w przyszłości?
                  <i class="anticon anticon-question-circle-o" nz-tooltip nzPlacement="bottom"
                     nzTitle="Wyrażenie chęci ponownego spotkania z drużyną 
      podnosi jej pozycję w wynikach wyszukiwania. Drużyna będzie oznaczona tagiem 'Zagraj ponownie'">
                  </i>
                </p>
                <label nz-checkbox formControlName="playAgain">{{validateForm.get('playAgain').value ? 'Tak' : 'Nie'}}</label>
              </nz-form-control>
            </nz-form-item>

            <nz-form-item nz-row style="margin-bottom:8px;">
              <nz-form-control [nzSpan]="24">
                <button nz-button nzType="primary">Zapisz</button>
              </nz-form-control>
            </nz-form-item>
            

          </form>
        </div>
      </div>
  `
})
export class ReviewCreatorComponent implements OnInit {

  value: any;
  checked: boolean;

  validateForm: FormGroup;

  @Input()
  challenge: Challenge;

  @Output()
  submitted = new EventEmitter<TeamReview>();

  constructor(private fb: FormBuilder) {
  }

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      fairPlay: [3],
      playAgain: [0],
    });
  }

  submitForm(): void {
    for (const i of Object.keys(this.validateForm.controls)) {
      this.validateForm.controls[ i ].markAsDirty();
      this.validateForm.controls[ i ].updateValueAndValidity();
    }

    if (this.validateForm.valid) {
      this.submitted.emit({
        challengeId: this.challenge.id,
        fairPlayLevel: this.validateForm.controls.fairPlay.value,
        playAgain: this.validateForm.controls.playAgain.value
      });
    }
  }


}

