import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {FacilityCreationForm} from '../../core/models/facility';
import {SearchForm} from '../models/search-form';

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
                <div nz-col [nzSm]="23">
                  <nz-slider [nzTipFormatter]="formatter" [nzMin]="0" [nzMax]="100" formControlName="weightAgeDiff"></nz-slider>
                </div>
                <div nz-col [nzSm]="1">
                  {{validateForm.get('weightAgeDiff').value}}%
                </div>
              </div>
              <nz-form-extra>Jeśli zależy Ci na grze z rówieśnikami</nz-form-extra>
            </nz-form-control>
          </nz-form-item>

          <nz-form-item>
            <nz-form-label [nzSm]="6" [nzXs]="24" nzFor="description">Różnica poziomu umiejętności</nz-form-label>
            <nz-form-control [nzSm]="14" [nzXs]="24">
              <div nz-row [nzGutter]="8">
                <div nz-col [nzSm]="23">
                  <nz-slider [nzTipFormatter]="formatter" [nzMin]="0" [nzMax]="100" formControlName="weightSkillDiff"></nz-slider>
                </div>
                <div nz-col [nzSm]="1">
                  {{validateForm.get('weightSkillDiff').value}}%
                </div>
              </div>
              <nz-form-extra>Jeśli zależy Ci na grze z osobami o podobnym doświadczeniu</nz-form-extra>
            </nz-form-control>
          </nz-form-item>

          <nz-form-item>
            <nz-form-label [nzSm]="6" [nzXs]="24" nzFor="description">Odległość</nz-form-label>
            <nz-form-control [nzSm]="14" [nzXs]="24">
              <div nz-row [nzGutter]="8">
                <div nz-col [nzSm]="23">
                  <nz-slider [nzTipFormatter]="formatter" [nzMin]="0" [nzMax]="100" formControlName="weightDistance"></nz-slider>
                </div>
                <div nz-col [nzSm]="1">
                  {{validateForm.get('weightDistance').value}}%
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

  formatter(value) {
    return `${value}%`;
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
          weightAgeDiff: this.validateForm.controls.weightAgeDiff.value / 100,
          weightSkillDiff: this.validateForm.controls.weightSkillDiff.value / 100,
          weightDistance: this.validateForm.controls.weightDistance.value / 100,
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
      weightAgeDiff: [this.builder.preferences.weightAgeDiff * 100],
      weightDistance: [this.builder.preferences.weightDistance * 100],
      weightSkillDiff: [this.builder.preferences.weightSkillDiff * 100],
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

  provideSliderOnChangeCallback(currentSlider, sliderA, sliderB) {
    let signal = false;

    return val => {
      signal = !signal;

      const prev = 100 - sliderA.value - sliderB.value;
      let leftToSpread = val - prev; // diff

      if (Math.abs(leftToSpread) % 2 === 1) {
        const unit = leftToSpread > 0 ? 1 : -1;

        if (signal) {
          // favor changing slider a
          if (leftToSpread > 0 && sliderA.value > 0 || leftToSpread < 0 && sliderA.value < 100) {
            sliderA.setValue(sliderA.value - unit, {emitEvent: false});
          } else {
            sliderB.setValue(sliderB.value - unit, {emitEvent: false});
          }
        } else {
          // favor changing slider b
          if (leftToSpread > 0 && sliderB.value > 0 || leftToSpread < 0 && sliderB.value < 100) {
            sliderB.setValue(sliderB.value - unit, {emitEvent: false});
          } else {
            sliderA.setValue(sliderA.value - unit, {emitEvent: false});
          }
        }

        leftToSpread = leftToSpread - unit;
      }

      // diff is positive when values need to go lower

      if (leftToSpread % 2 === 0) {
        const spreadEach = leftToSpread / 2;

        if (spreadEach > 0) {
          // other sliders go towards 0

          if (spreadEach > sliderA.value) {
            // a will be 0 case
            leftToSpread = leftToSpread - sliderA.value;
            sliderA.setValue(0, {emitEvent: false});
            sliderB.setValue(sliderB.value - leftToSpread, {emitEvent: false});
          } else if (spreadEach > sliderB.value) {
            // b will be 0 case
            leftToSpread = leftToSpread - sliderB.value;
            sliderB.setValue(0, {emitEvent: false});
            sliderA.setValue(sliderA.value - leftToSpread, {emitEvent: false});
          } else {
            // default case
            sliderA.setValue(sliderA.value - spreadEach, {emitEvent: false});
            sliderB.setValue(sliderB.value - spreadEach, {emitEvent: false});
          }
        } else if (spreadEach < 0) {
          // other sliders go towards 100

          if (sliderA.value - 100 > spreadEach) {
            // a will be 100 case
            leftToSpread = leftToSpread + (100 - sliderA.value);
            sliderA.setValue(100, {emitEvent: false});
            sliderB.setValue(sliderB.value - leftToSpread, {emitEvent: false});
          } else if (sliderB.value - 100 > spreadEach) {
            // b will be 100 case
            leftToSpread = leftToSpread + (100 - sliderB.value);
            sliderB.setValue(100, {emitEvent: false});
            sliderA.setValue(sliderA.value - leftToSpread, {emitEvent: false});
          } else {
            // default case
            sliderA.setValue(sliderA.value - spreadEach, {emitEvent: false});
            sliderB.setValue(sliderB.value - spreadEach, {emitEvent: false});

          }
        }

      }
    };
  }

}

