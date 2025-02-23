import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {TeamInvitation} from '../../core/models/team-invitation';
import {OutputEmitter} from '@angular/compiler/src/output/abstract_emitter';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {TeamCreationForm} from '../../core/models/team';
import {Region} from '../../core/models/region';

@Component({
  selector: 'app-creator-base-data',
  template: `
    <form nz-form [formGroup]="validateForm" (ngSubmit)="submitForm()">
      <nz-form-item>
        <nz-form-label [nzSm]="6" [nzXs]="24" nzRequired nzFor="regionId">Region</nz-form-label>
        <nz-form-control [nzSm]="14" [nzXs]="24">
          <nz-select formControlName="regionId" id="regionId" [nzDisabled]="true">
            <nz-option *ngFor="let region of regions" [nzValue]="region.id" [nzLabel]="region.name"></nz-option>
          </nz-select>
          <nz-form-explain *ngIf="validateForm.get('regionId').dirty && validateForm.get('regionId').errors">
            Wybierz swój region
          </nz-form-explain>
        </nz-form-control>
      </nz-form-item>
      <nz-form-item>
        <nz-form-label [nzSm]="6" [nzXs]="24" nzRequired nzFor="teamName">Nazwa drużyny</nz-form-label>
        <nz-form-control [nzSm]="14" [nzXs]="24">
          <input nz-input formControlName="teamName" id="teamName">
          <nz-form-explain *ngIf="validateForm.get('teamName').dirty && validateForm.get('teamName').errors">
            Wprowadź nazwę drużyny (5-30 znaków)
          </nz-form-explain>
        </nz-form-control>
      </nz-form-item>
      <nz-form-item nz-row style="margin-bottom:8px;">
        <nz-form-control [nzSpan]="14" [nzOffset]="6">
          <button nz-button nzType="primary">Dalej</button>
        </nz-form-control>
      </nz-form-item>
    </form>
  `
})
export class CreatorBaseDataComponent implements OnInit {

  validateForm: FormGroup;

  @Input()
  fixedRegionId: string;

  @Input()
  regions: Region[];

  @Output()
  submitted = new EventEmitter<TeamCreationForm>();

  submitForm(): void {
    for (const i of Object.keys(this.validateForm.controls)) {
      this.validateForm.controls[ i ].markAsDirty();
      this.validateForm.controls[ i ].updateValueAndValidity();
    }

    if (this.validateForm.valid) {
      this.submitted.emit({
        name: this.validateForm.value.teamName,
        disciplineId: '3x3basket',
        regionId: this.validateForm.value.regionId
      });
    }
  }

  constructor(private fb: FormBuilder) {
  }

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      teamName            : [ null, [ Validators.required, Validators.minLength(5), Validators.maxLength(30)] ],
      regionId: [this.fixedRegionId]
    });
  }

}

