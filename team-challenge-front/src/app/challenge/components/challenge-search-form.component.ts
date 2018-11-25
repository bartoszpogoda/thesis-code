import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {FacilityCreationForm} from '../../core/models/facility';
import {SearchForm} from '../models/search-form';
import {AbstractControl} from '@angular/forms/src/model';
import {s} from '@angular/core/src/render3';

@Component({
  selector: 'app-challenge-search-form',
  template: `
    <form nz-form [formGroup]="validateForm" (ngSubmit)="submitForm()">

      <div nz-row nzGutter="16">
        <div nz-col nzXs="0" nzSm="18">
          <h2 style="display: inline-block;">Rozdysponuj punkty preferencji pomiędzy poszczególne cechy</h2><app-search-form-help-modal></app-search-form-help-modal>
          <p>Do dyspozycji masz 100 PP. </p>

          <div nz-row nzGutter="16" style="text-align: center;" >
            <h3>Rówieśnicy</h3>
          </div>
          <nz-form-item>
            <nz-form-label [nzSm]="3" [nzXs]="24" nzFor="description"><img src="/assets/images/icon_age_no.png"></nz-form-label>
            <nz-form-control [nzSm]="18" [nzXs]="24">
              <div nz-row [nzGutter]="8">
                <div nz-col [nzSm]="1" style="cursor:pointer;" (click)="onLockClicked(validateForm.get('weightAgeDiff'))">
                  <i *ngIf="lockedSlider === validateForm.get('weightAgeDiff') || validateForm.get('weightAgeDiff').value === 0"
                     class="anticon anticon-lock"></i>
                  <i *ngIf="!(lockedSlider === validateForm.get('weightAgeDiff') || validateForm.get('weightAgeDiff').value === 0)"
                     class="anticon anticon-unlock"></i>
                </div>
                <div nz-col [nzSm]="21">
                  <nz-slider [nzDisabled]="lockedSlider === validateForm.get('weightAgeDiff')"
                             [nzTipFormatter]="formatter" [nzStep]="10" [nzMin]="0" [nzMax]="1000" formControlName="weightAgeDiff">
                  </nz-slider>
                </div>
                <div nz-col [nzSm]="2">
                  {{ Math.round(validateForm.get('weightAgeDiff').value / 10) }} PP
                </div>
              </div>
              <nz-form-extra>Przydziel więcej punktów jeżeli zależy Wam na grze z rówieśnikami</nz-form-extra>
            </nz-form-control>
            <div nz-col [nzSm]="3" [nzXs]="24"><img src="/assets/images/icon_age.png"></div>
          </nz-form-item>

          <div nz-row nzGutter="16" style="text-align: center;" >
            <h3>Podobni doświadczeniem</h3>
          </div>
          <nz-form-item>
            <nz-form-label [nzSm]="3" [nzXs]="24" nzFor="description"><img src="/assets/images/icon_skill_no.png"></nz-form-label>
            <nz-form-control [nzSm]="18" [nzXs]="24">
              <div nz-row [nzGutter]="8">
                <div nz-col [nzSm]="1" style="cursor:pointer;" (click)="onLockClicked(validateForm.get('weightSkillDiff'))">
                  <i *ngIf="lockedSlider === validateForm.get('weightSkillDiff') || validateForm.get('weightSkillDiff').value === 0"
                     class="anticon anticon-lock"></i>
                  <i *ngIf="!(lockedSlider === validateForm.get('weightSkillDiff') || validateForm.get('weightSkillDiff').value === 0)"
                     class="anticon anticon-unlock"></i>
                </div>
                <div nz-col [nzSm]="21">
                  <nz-slider [nzDisabled]="lockedSlider === validateForm.get('weightSkillDiff')" [nzTipFormatter]="formatter"
                             [nzStep]="10" [nzMin]="0" [nzMax]="1000" formControlName="weightSkillDiff"></nz-slider>
                </div>
                <div nz-col [nzSm]="2">
                  {{ Math.round(validateForm.get('weightSkillDiff').value / 10) }} PP
                </div>
              </div>
              <nz-form-extra>Przydziel więcej punktów jeżeli zależy Wam na grze z osobami o podobnym doświadczeniu</nz-form-extra>
            </nz-form-control>
            <div nz-col [nzSm]="3" [nzXs]="24"><img src="/assets/images/icon_skill.png"></div>
          </nz-form-item>


          <div nz-row nzGutter="16" style="text-align: center;" >
            <h3>Sąsiedzi</h3>
          </div>
          <nz-form-item>
            <nz-form-label [nzSm]="3" [nzXs]="24" nzFor="description"><img src="/assets/images/icon_dist_no.png"></nz-form-label>
            <nz-form-control [nzSm]="18" [nzXs]="24">
              <div nz-row [nzGutter]="8">
                <div nz-col [nzSm]="1" style="cursor:pointer;" (click)="onLockClicked(validateForm.get('weightDistance'))">
                  <i *ngIf="lockedSlider === validateForm.get('weightDistance') || validateForm.get('weightDistance').value === 0"
                     class="anticon anticon-lock"></i>
                  <i *ngIf="!(lockedSlider === validateForm.get('weightDistance') || validateForm.get('weightDistance').value === 0)"
                     class="anticon anticon-unlock"></i>
                </div>
                <div nz-col [nzSm]="21">
                  <nz-slider [nzDisabled]="lockedSlider === validateForm.get('weightDistance')" [nzTipFormatter]="formatter"
                             [nzStep]="10" [nzMin]="0" [nzMax]="1000" formControlName="weightDistance"></nz-slider>
                </div>
                <div nz-col [nzSm]="2">
                  {{ Math.round(validateForm.get('weightDistance').value / 10) }} PP
                </div>
              </div>
              <nz-form-extra>Przydziel więcej punktów jeżeli zależy Wam na grze z przeciwnikami w okolicy</nz-form-extra>
            </nz-form-control>
            <div nz-col [nzSm]="3" [nzXs]="24"><img src="/assets/images/icon_dist.png"></div>
          </nz-form-item>


        </div>
        <div nz-col nzXs="0" nzSm="6">
          <h2>Dodatkowe preferencje</h2>
          <p>Drużyny oznaczone wybranymi tagami będą dodatkowo promowane w wynikach wyszukiwania.</p>

          <nz-form-item>
            <nz-form-label [nzSm]="12" [nzXs]="24" nzFor="fairPlay">
              <span>
            <nz-tag [nzColor]="'green'">Fair play </nz-tag>
            <i class="anticon anticon-question-circle-o" nz-tooltip nzPlacement="bottom"
               nzTitle="Dodatkowe promowanie drużyn wysoko ocenianych pod względem poziomu Fair-Play"></i>
          </span>
            </nz-form-label>
            <nz-form-control [nzSm]="6" [nzXs]="12" style="text-align: left;">
              <nz-switch formControlName="fairPlay"></nz-switch>
            </nz-form-control>
          </nz-form-item>

          <nz-form-item>
            <nz-form-label [nzSm]="12" [nzXs]="24" nzFor="playAgain">
              <span>
            <nz-tag [nzColor]="'geekblue'">Zagraj ponownie </nz-tag>
            <i class="anticon anticon-question-circle-o" nz-tooltip nzPlacement="bottom"
               nzTitle="Dodatkowe promowanie drużyn, dla których zadeklarowałeś chęć ponownego spotkania po ostatnim meczu."></i>
          </span>
            </nz-form-label>
            <nz-form-control [nzSm]="6" [nzXs]="24" style="text-align: left;">
              <nz-switch formControlName="playAgain"></nz-switch>
            </nz-form-control>
          </nz-form-item>

          <nz-form-item>
            <nz-form-label [nzSm]="12" [nzXs]="24" nzFor="bigActivity">
              <span>
            <nz-tag [nzColor]="'cyan'">Duża aktywność </nz-tag>
            <i class="anticon anticon-question-circle-o" nz-tooltip nzPlacement="bottom"
               nzTitle="Dodatkowe promowanie drużyn, które w ciągu ostatniego miesiąca rozegrały co najmniej 3 spotkania."></i>
          </span>
            </nz-form-label>
            <nz-form-control [nzSm]="6" [nzXs]="24" style="text-align: left;">
              <nz-switch formControlName="bigActivity"></nz-switch>
            </nz-form-control>
          </nz-form-item>

        </div>
      </div>

      <div style="text-align: center;">
        <nz-form-item nz-row style="margin-bottom:8px;">
          <nz-form-control [nzSpan]="16" [nzOffset]="4">
            <button style="margin: 10px 4px;" nz-button nzType="primary">Szukaj</button>
          </nz-form-control>
        </nz-form-item>
      </div>

    </form>
  `, styles: [`

    i {
      font-size: 1.3em;
    }

  `]
})
export class ChallengeSearchFormComponent implements OnInit {

  validateForm: FormGroup;

  @Output()
  submitted = new EventEmitter<SearchForm>();

  @Input()
  builder: SearchForm;

  Math = Math;

  lockedSlider: AbstractControl;

  formatter(value) {
    return Math.round(value / 10) + ` PP`;
  }

  submitForm(): void {
    for (const i of Object.keys(this.validateForm.controls)) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }

    if (this.validateForm.valid) {
      const newBuilder = {
        ...this.builder,
        preferences: {
          ...this.builder.preferences,
          weightAgeDiff: this.validateForm.controls.weightAgeDiff.value / 1000,
          weightSkillDiff: this.validateForm.controls.weightSkillDiff.value / 1000,
          weightDistance: this.validateForm.controls.weightDistance.value / 1000,
          fairPlay: this.validateForm.controls.fairPlay.value,
          playAgain: this.validateForm.controls.playAgain.value,
          bigActivity: this.validateForm.controls.bigActivity.value,
        }
      };

      this.submitted.emit(newBuilder);
    }
  }

  constructor(private fb: FormBuilder) {
  }

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      weightAgeDiff: [this.builder.preferences.weightAgeDiff * 1000],
      weightDistance: [this.builder.preferences.weightDistance * 1000],
      weightSkillDiff: [this.builder.preferences.weightSkillDiff * 1000],
      fairPlay: [this.builder.preferences.fairPlay],
      playAgain: [this.builder.preferences.playAgain],
      bigActivity: [this.builder.preferences.bigActivity],
    });

    const slider1 = this.validateForm.controls.weightAgeDiff;
    const slider2 = this.validateForm.controls.weightSkillDiff;
    const slider3 = this.validateForm.controls.weightDistance;

    this.validateForm.get('weightAgeDiff').valueChanges.subscribe(this.provideSliderOnChangeCallback(slider1, slider2, slider3));
    this.validateForm.get('weightSkillDiff').valueChanges.subscribe(this.provideSliderOnChangeCallback(slider2, slider1, slider3));
    this.validateForm.get('weightDistance').valueChanges.subscribe(this.provideSliderOnChangeCallback(slider3, slider1, slider2));
  }

  onLockClicked(slider: AbstractControl) {
    this.lockedSlider = this.lockedSlider === slider ? null : slider;
  }

  provideSliderOnChangeCallback(currentSlider, sliderA, sliderB) {
    let signal = false;

    return val => {
      signal = !signal;

      if (sliderA.value === 0 && this.lockedSlider !== sliderB || this.lockedSlider === sliderA) {
        sliderB.setValue(1000 - val - sliderA.value, {emitEvent: false});
      } else if (sliderA.value === 0 && this.lockedSlider === sliderB) {
        if (1000 - val - sliderB.value < 0) {
          currentSlider.setValue(1000 - sliderA.value - sliderB.value, {emitEvent: false});
        } else {
          sliderA.setValue(1000 - val - sliderB.value, {emitEvent: false});
        }
      } else if (sliderB.value === 0 && this.lockedSlider !== sliderA || this.lockedSlider === sliderB) {
        sliderA.setValue(1000 - val - sliderB.value, {emitEvent: false});
      } else if (sliderB.value === 0 && this.lockedSlider === sliderA) {
        if (1000 - val - sliderA.value < 0) {
          currentSlider.setValue(1000 - sliderA.value - sliderB.value, {emitEvent: false});
        } else {
          sliderB.setValue(1000 - val - sliderA.value, {emitEvent: false});
        }
      } else {
        const proportion = sliderA.value / sliderB.value;
        const left = 1000 - val;

        if (signal) {
          let a = (proportion * left) / (1 + proportion);
          a = Math.round(a);

          sliderA.setValue(a, {emitEvent: false});
          sliderB.setValue(left - a, {emitEvent: false});
        } else {
          let b = (left) / (1 + proportion);
          b = Math.round(b);

          sliderB.setValue(b, {emitEvent: false});
          sliderA.setValue(left - b, {emitEvent: false});
        }
      }

      if (sliderA.value < 0) {
        currentSlider.setValue(val + sliderA.value, {emitEvent: false});
        sliderA.setValue(0, {emitEvent: false});
      } else if (sliderB.value < 0) {
        currentSlider.setValue(val + sliderB.value, {emitEvent: false});
        sliderB.setValue(0, {emitEvent: false});
      }

    };
  }

}

