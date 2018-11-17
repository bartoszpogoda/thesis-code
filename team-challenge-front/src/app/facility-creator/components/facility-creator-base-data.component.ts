import {Component, EventEmitter, Input, OnChanges, OnInit, Output} from '@angular/core';
import {TeamInvitation} from '../../core/models/team-invitation';
import {OutputEmitter} from '@angular/compiler/src/output/abstract_emitter';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {TeamCreationForm} from '../../core/models/team';
import {Region} from '../../core/models/region';
import {FacilityCreationForm} from '../../core/models/facility';

@Component({
  selector: 'app-facility-creator-base-data',
  template: `
    <form nz-form [formGroup]="validateForm" (ngSubmit)="submitForm()">
      <nz-form-item>
        <nz-form-label [nzSm]="6" [nzXs]="24" nzRequired nzFor="regionId">Region</nz-form-label>
        <nz-form-control [nzSm]="14" [nzXs]="24">
          <nz-select formControlName="regionId" id="regionId" [nzDisabled]="true">
            <nz-option *ngFor="let region of regions" [nzValue]="region.id" [nzLabel]="region.name"></nz-option>
          </nz-select>
        </nz-form-control>
      </nz-form-item>
      <nz-form-item>
        <nz-form-label [nzSm]="6" [nzXs]="24" nzRequired nzFor="name">Nazwa obiektu</nz-form-label>
        <nz-form-control [nzSm]="14" [nzXs]="24">
          <input nz-input formControlName="name" id="name">
          <nz-form-explain *ngIf="validateForm.get('name').dirty && validateForm.get('name').errors">
            Wprowadź nazwę obiektu sportowego (3-30 znaków)
          </nz-form-explain>
          <!--<nz-form-extra>Wprowadź nazwę, która pozwoli rozpoznać innym ten obiekt.</nz-form-extra>-->
        </nz-form-control>
      </nz-form-item>
      
      <nz-form-item>
        <nz-form-label [nzSm]="6" [nzXs]="24" nzRequired nzFor="name">Lokalny adres</nz-form-label>
        <nz-form-control [nzSm]="14" [nzXs]="24">
          <input nz-input formControlName="address" id="address">
          <nz-form-extra>Wprowadź ulicę oraz w miarę możliwości numer budynku.</nz-form-extra>
        </nz-form-control>
      </nz-form-item>


      <nz-form-item>
        <nz-form-label [nzSm]="6" [nzXs]="24" nzRequired nzFor="description">Ilość koszy</nz-form-label>
        <nz-form-control [nzSm]="14" [nzXs]="24">
          <div nz-row [nzGutter]="8">
            <div nz-col [nzSm]="23">
              <nz-slider [nzMin]="1" [nzMax]="10" formControlName="playingSpots"></nz-slider>
            </div>
            <div nz-col [nzSm]="1">
              {{validateForm.get('playingSpots').value}}
            </div>
          </div>
          <nz-form-extra>Wprowadź ilość miejsc do gry na tym obiekcie sportowym</nz-form-extra>
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
export class FacilityCreatorBaseDataComponent implements OnInit {

  validateForm: FormGroup;

  @Input()
  fixedRegionId: string;

  @Input()
  builder: FacilityCreationForm;

  @Input()
  regions: Region[];

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

      const newBuilder = {
        ...this.builder,
        name: this.validateForm.value.name,
        address: this.validateForm.value.address,
        regionId: this.validateForm.value.regionId,
        playingSpots: this.validateForm.value.playingSpots
      };

      this.submitted.emit(newBuilder);
    }
  }

  onGoBack() {
    this.back.emit();
  }

  constructor(private fb: FormBuilder) {
  }

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      name            : [ this.builder.name, [ Validators.required, Validators.minLength(3), Validators.maxLength(30)] ],
      address: [this.builder.address, [ Validators.required, Validators.minLength(2), Validators.maxLength(32)]],
      regionId: [this.fixedRegionId],
      playingSpots: [this.builder.playingSpots]
    });

  }

}

