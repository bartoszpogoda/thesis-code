import {Component, EventEmitter, Input, OnChanges, OnInit, Output} from '@angular/core';
import {TeamInvitation} from '../../core/models/team-invitation';
import {OutputEmitter} from '@angular/compiler/src/output/abstract_emitter';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {TeamCreationForm} from '../../core/models/team';
import {Region} from '../../core/models/region';
import {FacilityCreationForm} from '../../core/models/facility';

@Component({
  selector: 'app-facility-creator-detailed-data',
  template: `
    <form nz-form [formGroup]="validateForm" (ngSubmit)="submitForm()">
      <nz-form-item>
        <nz-form-label [nzSm]="6" [nzXs]="24" nzRequired nzFor="description">Rodzaj nawierzchni</nz-form-label>
        <nz-form-control [nzSm]="14" [nzXs]="24">
          <nz-select formControlName="surfaceType" nzAllowClear nzPlaceHolder="Wybierz nawierzchnię">
            <nz-option nzValue="Beton" nzLabel="Beton"></nz-option>
            <nz-option nzValue="Asfalt" nzLabel="Asfalt"></nz-option>
            <nz-option nzValue="Kostka brukowa" nzLabel="Kostka brukowa"></nz-option>
            <nz-option nzValue="Tartan" nzLabel="Tartan"></nz-option>
            <nz-option nzValue="Inna" nzLabel="Inna"></nz-option>
          </nz-select>
          <nz-form-explain *ngIf="validateForm.get('surfaceType').dirty && validateForm.get('surfaceType').errors">
            Wybierz rodzaj nawierzchni. Jeśli nie masz pewności wybierz 'Inna'.
          </nz-form-explain>
        </nz-form-control>
      </nz-form-item>

      <nz-form-item>
        <nz-form-label [nzSm]="6" [nzXs]="24" nzRequired nzFor="description">Oświetlenie</nz-form-label>
        <nz-form-control [nzSm]="14" [nzXs]="24" style="text-align: left;">
          <nz-switch formControlName="lighting"></nz-switch>
        </nz-form-control>
      </nz-form-item>

      <nz-form-item>
        <nz-form-label [nzSm]="6" [nzXs]="24" nzFor="description">Opis</nz-form-label>
        <nz-form-control [nzSm]="14" [nzXs]="24">
          <textarea rows="4" nz-input formControlName="description"></textarea>
        </nz-form-control>
      </nz-form-item>

      <nz-form-item nz-row style="margin-bottom:8px;">
        <nz-form-control [nzSpan]="16" [nzOffset]="4">
          <button style="margin: 10px 4px;" nz-button type="button" (click)="onGoBack()">Wróć</button>
          <button style="margin: 10px 4px;" nz-button nzType="primary">Dalej</button>
        </nz-form-control>
      </nz-form-item>
    </form>
  `
})
export class FacilityCreatorDetailedDataComponent implements OnInit {

  validateForm: FormGroup;

  @Input()
  builder: FacilityCreationForm;

  @Output()
  submitted = new EventEmitter<FacilityCreationForm>();

  @Output()
  back = new EventEmitter();

  submitForm(): void {
    for (const i of Object.keys(this.validateForm.controls)) {
      this.validateForm.controls[ i ].markAsDirty();
      this.validateForm.controls[ i ].updateValueAndValidity();
    }

    if (this.validateForm.valid) {
      this.submitted.emit({
        ...this.builder,
        surfaceType: this.validateForm.controls.surfaceType.value,
        description: this.validateForm.controls.description.value,
        lighting: this.validateForm.controls.lighting.value
      });
    }
  }

  onGoBack() {
    this.back.emit();
  }

  constructor(private fb: FormBuilder) {
  }

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      surfaceType: [null],
      description: [null],
      lighting: [false]
    });

  }

}

