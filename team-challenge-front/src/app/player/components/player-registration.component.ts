import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {PlayerRegistrationForm} from '../../core/models/player';


@Component({
  selector: 'app-player-registration',
  template: `
    <form nz-form [formGroup]="validateForm" (ngSubmit)="submitForm()">
      <nz-form-item>
        <nz-form-label [nzSm]="6" [nzXs]="24" nzRequired nzFor="email">Wzrost (cm)</nz-form-label>
        <nz-form-control [nzSm]="14" [nzXs]="24">
          <input nz-input formControlName="height" id="height">
          <nz-form-explain *ngIf="validateForm.get('height').dirty && validateForm.get('height').errors">
            Wprowadź swój prawdziwy wzrost!
          </nz-form-explain>
        </nz-form-control>
      </nz-form-item>
      <nz-form-item>
        <nz-form-label [nzSm]="6" [nzXs]="24" nzFor="nickname" nzRequired>
        <span>
          Staż gry (lata)
          <nz-tooltip nzTitle="Ile lat spędziłeś aktywnie grając w koszykówkę?">
            <i nz-tooltip class="anticon anticon-question-circle-o"></i>
          </nz-tooltip>
        </span>
        </nz-form-label>
        <nz-form-control [nzSm]="14" [nzXs]="24">
          <input nz-input id="yearsOfExperience" formControlName="yearsOfExperience">
          <nz-form-explain *ngIf="validateForm.get('yearsOfExperience').dirty && validateForm.get('yearsOfExperience').errors">
            <ng-container *ngIf="validateForm.get('yearsOfExperience').hasError('required')">
              Określ swój staż gry w koszykówkę
            </ng-container>
            <ng-container *ngIf="validateForm.get('yearsOfExperience').hasError('min')">
              Jeśli nie masz żadnego doświadczenia wprowadź liczbę 0
            </ng-container>
            <ng-container *ngIf="validateForm.get('yearsOfExperience').hasError('max')">
              Wprowadź rzeczywiste doświadczenie
            </ng-container>
            <ng-container *ngIf="validateForm.get('yearsOfExperience').hasError('pattern')">
              Wprowadź liczbę określającą twój staż gry w latach
            </ng-container>
          </nz-form-explain>
        </nz-form-control>
      </nz-form-item>
      <nz-form-item nz-row style="margin-bottom:8px;">
        <nz-form-control [nzSpan]="14" [nzOffset]="6">
          <button nz-button nzType="primary">Utwórz profil</button>
        </nz-form-control>
      </nz-form-item>
    </form>
  `
})
export class PlayerRegistrationComponent implements OnInit {
  validateForm: FormGroup;

  @Output() submitted = new EventEmitter<PlayerRegistrationForm>();

  submitForm(): void {
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[ i ].markAsDirty();
      this.validateForm.controls[ i ].updateValueAndValidity();
    }

    if (this.validateForm.valid) {
      this.submitted.emit(this.validateForm.value);
    }
  }

  constructor(private fb: FormBuilder) {
  }

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      height            : [ null, [ Validators.required, Validators.pattern('[0-9]*'), Validators.min(100), Validators.max(230)] ],
      yearsOfExperience : [ null, [ Validators.required, Validators.pattern('[0-9]*'), Validators.min(0), Validators.max(100)] ]
    });
  }
}
