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

      <nz-form-item nz-row style="margin-bottom:8px;">
        <nz-form-control [nzSpan]="14" [nzOffset]="6">
          <button nz-button nzType="primary">Dalej</button>
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
      regionId: [ null, [ Validators.required] ],
    });
  }
}
