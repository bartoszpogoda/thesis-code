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
          <h2>Dostosuj wagi poszczególnych kryteriów</h2>
          <p>Dostosuj wartościowanie poszczególnych kryteriów z uwzględnieniem preferencji Twojej drużyny.</p>

          <nz-form-item>
            <nz-form-label [nzSm]="6" [nzXs]="24" nzFor="description">Różnica wieku</nz-form-label>
            <nz-form-control [nzSm]="14" [nzXs]="24">
              <div nz-row [nzGutter]="8">
                <div nz-col [nzSm]="1" style="cursor:pointer;" (click)="onLockClicked(validateForm.get('weightAgeDiff'))">
                  <i *ngIf="lockedSlider === validateForm.get('weightAgeDiff') || validateForm.get('weightAgeDiff').value === 0"
                     class="anticon anticon-lock"></i>
                  <i *ngIf="!(lockedSlider === validateForm.get('weightAgeDiff') || validateForm.get('weightAgeDiff').value === 0)"
                     class="anticon anticon-unlock"></i>
                </div>
                <div nz-col [nzSm]="22">
                  <nz-slider [nzDisabled]="lockedSlider === validateForm.get('weightAgeDiff')"
                             [nzTipFormatter]="formatter" [nzStep]="10" [nzMin]="0" [nzMax]="1000" formControlName="weightAgeDiff">
                  </nz-slider>
                </div>
                <div nz-col [nzSm]="1">
                  {{ Math.round(validateForm.get('weightAgeDiff').value / 10) }}%
                </div>
              </div>
              <nz-form-extra>Jeśli zależy Ci na grze z rówieśnikami</nz-form-extra>
            </nz-form-control>
          </nz-form-item>

          <nz-form-item>
            <nz-form-label [nzSm]="6" [nzXs]="24" nzFor="description">Różnica poziomu umiejętności</nz-form-label>
            <nz-form-control [nzSm]="14" [nzXs]="24">
              <div nz-row [nzGutter]="8">
                <div nz-col [nzSm]="1" style="cursor:pointer;" (click)="onLockClicked(validateForm.get('weightSkillDiff'))">
                  <i *ngIf="lockedSlider === validateForm.get('weightSkillDiff') || validateForm.get('weightSkillDiff').value === 0"
                     class="anticon anticon-lock"></i>
                  <i *ngIf="!(lockedSlider === validateForm.get('weightSkillDiff') || validateForm.get('weightSkillDiff').value === 0)"
                     class="anticon anticon-unlock"></i>
                </div>
                <div nz-col [nzSm]="22">
                  <nz-slider [nzDisabled]="lockedSlider === validateForm.get('weightSkillDiff')"  [nzTipFormatter]="formatter"
                             [nzStep]="10" [nzMin]="0" [nzMax]="1000" formControlName="weightSkillDiff"></nz-slider>
                </div>
                <div nz-col [nzSm]="1">
                  {{ Math.round(validateForm.get('weightSkillDiff').value / 10) }}%
                </div>
              </div>
              <nz-form-extra>Jeśli zależy Ci na grze z osobami o podobnym doświadczeniu</nz-form-extra>
            </nz-form-control>
          </nz-form-item>

          <nz-form-item>
            <nz-form-label [nzSm]="6" [nzXs]="24" nzFor="description">Odległość</nz-form-label>
            <nz-form-control [nzSm]="14" [nzXs]="24">
              <div nz-row [nzGutter]="8">
                <div nz-col [nzSm]="1" style="cursor:pointer;" (click)="onLockClicked(validateForm.get('weightDistance'))">
                  <i *ngIf="lockedSlider === validateForm.get('weightDistance') || validateForm.get('weightDistance').value === 0"
                     class="anticon anticon-lock"></i>
                  <i *ngIf="!(lockedSlider === validateForm.get('weightDistance') || validateForm.get('weightDistance').value === 0)"
                     class="anticon anticon-unlock"></i>
                </div>
                <div nz-col [nzSm]="22">
                  <nz-slider [nzDisabled]="lockedSlider === validateForm.get('weightDistance')" [nzTipFormatter]="formatter"
                             [nzStep]="10" [nzMin]="0" [nzMax]="1000" formControlName="weightDistance"></nz-slider>
                </div>
                <div nz-col [nzSm]="1">
                  {{ Math.round(validateForm.get('weightDistance').value / 10) }}%
                </div>
              </div>
              <nz-form-extra>Jeśli szukasz przeciwników w swojej okolicy</nz-form-extra>
            </nz-form-control>
          </nz-form-item>


        </div>
        <div nz-col nzXs="0" nzSm="6">
          <h2>Dodatkowe preferencje</h2>
          <p>Drużyny posiadające daną cechę (lub spełniające warunek) znajdą się wyżej w wynikach wyszukiwania.</p>

          <nz-form-item>
            <nz-form-label [nzSm]="12" [nzXs]="24" nzFor="friendly">
              <span>
            Przyjaźni
            <i class="anticon anticon-question-circle-o" nz-tooltip nzPlacement="bottom"
               nzTitle="Promowanie drużyn często ocenianych jako przyjazne"></i>
          </span>
            </nz-form-label>
            <nz-form-control [nzSm]="6" [nzXs]="24" style="text-align: left;">
              <nz-switch formControlName="friendly"></nz-switch>
            </nz-form-control>
          </nz-form-item>

          <nz-form-item>
            <nz-form-label [nzSm]="12" [nzXs]="24" nzFor="playAgain">
              <span>
            Rewanż
            <i class="anticon anticon-question-circle-o" nz-tooltip nzPlacement="bottom"
               nzTitle="Promowanie starych przeciwników, dla których została zadeklarowana chęć ponownej gry"></i>
          </span>
            </nz-form-label>
            <nz-form-control [nzSm]="6" [nzXs]="24" style="text-align: left;">
              <nz-switch formControlName="playAgain"></nz-switch>
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
  `
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
    return Math.round(value / 10) + `%`;
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
          friendly: this.validateForm.controls.friendly.value
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
      friendly: [this.builder.preferences.friendly],
      playAgain: [false]
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

      if (sliderA.value === 0  && this.lockedSlider !== sliderB || this.lockedSlider === sliderA) {
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
          let a = (proportion * left) / ( 1 + proportion);
          a = Math.round(a);

          sliderA.setValue(a, {emitEvent: false});
          sliderB.setValue(left - a, {emitEvent: false});
        } else {
          let b = (left) / ( 1 + proportion);
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

