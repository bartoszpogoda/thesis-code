import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {PlayerRegistrationForm} from '../../core/models/player';
import {Region} from '../../core/models/region';

/* TODO ADD REGION PICKER */

@Component({
  selector: 'app-player-registration',
  template: `
    <form nz-form [formGroup]="validateForm" (ngSubmit)="submitForm()">
      <nz-form-item>
        <nz-form-label [nzOffset]="4" [nzSm]="6" [nzXs]="24" nzRequired nzFor="regionId">Region</nz-form-label>
        <nz-form-control [nzSm]="6" [nzXs]="24">
          <nz-select formControlName="regionId" id="regionId">
            <nz-option *ngFor="let region of regions" [nzValue]="region.id" [nzLabel]="region.name"></nz-option>
          </nz-select>
          <nz-form-explain *ngIf="validateForm.get('regionId').dirty && validateForm.get('regionId').errors">
            Wybierz swój region
          </nz-form-explain>
        </nz-form-control>
      </nz-form-item>
      <nz-form-item>
        <nz-form-label [nzOffset]="4" [nzSm]="6" [nzXs]="24" nzRequired nzFor="email">Wzrost (cm)</nz-form-label>
        <nz-form-control [nzSm]="6" [nzXs]="24">
          <input nz-input formControlName="height" id="height">
          <nz-form-explain *ngIf="validateForm.get('height').dirty && validateForm.get('height').errors">
            Wprowadź swój prawdziwy wzrost!
          </nz-form-explain>
        </nz-form-control>
      </nz-form-item>

      <nz-form-item>
        <nz-form-label [nzOffset]="4"  [nzSm]="6" [nzXs]="24" nzRequired nzFor="description">
          <span>
            Poziom umiejętności
          <nz-tooltip nzTitle="Postaraj się obiektywnie ocenić swoje umiejętności w skali 0-10">
            <i nz-tooltip class="anticon anticon-question-circle-o"></i>
          </nz-tooltip>
          </span></nz-form-label>
        <nz-form-control [nzSm]="6" [nzXs]="24">
          <div nz-row [nzGutter]="8">
            <div nz-col [nzSm]="23">
              <!--[nzTipFormatter]="formatter"-->
              <nz-slider  [nzMin]="0" [nzMax]="10" [nzMarks]="marks" formControlName="skill"></nz-slider>
            </div>
            <div nz-col [nzSm]="1">
              {{validateForm.get('skill').value}}
            </div>
          </div>
          <!--<nz-form-extra>Oceń swój poziom umiejętności</nz-form-extra>-->
        </nz-form-control>
      </nz-form-item>
      
      <nz-form-item nz-row style="margin-bottom:8px;">
        <nz-form-control [nzSpan]="14" [nzOffset]="6">
          <button nz-button nzType="primary">Utwórz profil</button>
        </nz-form-control>
      </nz-form-item>
    </form>
  `, styles: [`
      p {
        margin-bottom: 0 !important;
      }
  `]
})
export class PlayerRegistrationComponent implements OnInit {
  validateForm: FormGroup;

  marks: any = {
    2: {
      style: {
        left: '22%'
      },
      label: '<strong>Niedzielny gracz</strong><p>Grasz od czasu do czasu</p>',
    },
  8: {
    style: {
      left: '79%',
    },
    label: '<strong>Klubowicz</strong><p>Grasz regularnie w klubie</p>',
  }
  };



  formatter(value) {

    const messages = {
      1: 'Dopiero zaczynam',
      2: 'Znam zasady',
      3: 'Znam zasady',
      4: 'Gram od czasu do czasu',
      5: 'Gram regularnie',
      6: 'Znam zasady',
      7: 'Gram regularnie w klubie',
      8: 'Znam zasady',
      9: 'Znam zasady',
      10: 'Znam zasady'
    };

    return messages[value] ? `${messages[value]}` : '';
  }

  @Input()
  regions: Region[];

  @Output() submitted = new EventEmitter<PlayerRegistrationForm>();

  submitForm(): void {
    for (const i of Object.keys(this.validateForm.controls)) {
      this.validateForm.controls[ i ].markAsDirty();
      this.validateForm.controls[ i ].updateValueAndValidity();
    }

    if (this.validateForm.valid) {
      this.submitted.emit({
        height: this.validateForm.value.height,
        skill: this.validateForm.value.skill,
        disciplineId: '3x3basket',
        regionId: this.validateForm.value.regionId
      });
    }
  }

  constructor(private fb: FormBuilder) {
  }

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      height            : [ null, [ Validators.required, Validators.pattern('[0-9]*'), Validators.min(100), Validators.max(230)] ],
      skill: [0],
      regionId: [ null, [ Validators.required] ],
    });
  }
}
