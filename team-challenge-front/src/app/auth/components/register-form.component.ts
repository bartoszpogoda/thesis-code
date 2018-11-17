import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {RegisterForm} from '../models/register';
import * as AuthActions from '../actions/auth.actions';
import {convert, LocalDateTime, nativeJs} from 'js-joda';


@Component({
  selector: 'app-register-form',
  template: `
    <form nz-form [formGroup]="validateForm" (ngSubmit)="submitForm()">
      <nz-form-item>
        <nz-form-label [nzSm]="6" [nzXs]="24" nzRequired nzFor="email">Adres email</nz-form-label>
        <nz-form-control [nzSm]="14" [nzXs]="24">
          <input nz-input formControlName="email" id="email">
          <nz-form-explain *ngIf="validateForm.get('email').dirty && validateForm.get('email').errors">
            Wprowadź prawidłowy adres email!
          </nz-form-explain>
        </nz-form-control>
      </nz-form-item>
      <nz-form-item>
        <nz-form-label [nzSm]="6" [nzXs]="24" nzFor="password" nzRequired>Hasło</nz-form-label>
        <nz-form-control [nzSm]="14" [nzXs]="24">
          <input nz-input type="password" id="password" formControlName="password" (ngModelChange)="updateConfirmValidator()">
          <nz-form-explain *ngIf="validateForm.get('password').dirty && validateForm.get('password').errors">
            Wprowadź hasło!
          </nz-form-explain>
        </nz-form-control>
      </nz-form-item>
      <nz-form-item>
        <nz-form-label [nzSm]="6" [nzXs]="24" nzFor="checkPassword" nzRequired>Potwierdź hasło</nz-form-label>
        <nz-form-control [nzSm]="14" [nzXs]="24">
          <input nz-input type="password" formControlName="checkPassword" id="checkPassword">
          <nz-form-explain *ngIf="validateForm.get('checkPassword').dirty && validateForm.get('checkPassword').errors">
            <ng-container *ngIf="validateForm.get('checkPassword').hasError('required')">
              Proszę potwierdź swoje hasło!
            </ng-container>
            <ng-container *ngIf="validateForm.get('checkPassword').hasError('confirm')">
              Hasła nie są zgodne!
            </ng-container>
          </nz-form-explain>
        </nz-form-control>
      </nz-form-item>
      <nz-form-item>
        <nz-form-label [nzSm]="6" [nzXs]="24" nzFor="nickname" nzRequired>
        <span>
          Imię i nazwisko
          <nz-tooltip nzTitle="Wprowadź swoje imię i nazwisko">
            <i nz-tooltip class="anticon anticon-question-circle-o"></i>
          </nz-tooltip>
        </span>
        </nz-form-label>
        <nz-form-control [nzSm]="14" [nzXs]="24">
          <input nz-input id="fullName" formControlName="fullName">
          <nz-form-explain *ngIf="validateForm.get('fullName').dirty && validateForm.get('fullName').errors">
            Proszę wprowadź swoje imię i nazwisko
          </nz-form-explain>
        </nz-form-control>
      </nz-form-item>
      <nz-form-item>
        <nz-form-label [nzSm]="6" [nzXs]="24" nzRequired>Data urodzenia</nz-form-label>
        <nz-form-control [nzSm]="14" [nzXs]="24">
          <nz-date-picker [nzDisabledDate]="disabledDate" (ngModelChange)="onBirthdayDateChange($event)" nzFormat="yyyy/MM/dd"
                          formControlName="birthdayDate" [nzShowToday]="false"></nz-date-picker>
        </nz-form-control>
      </nz-form-item>
      <!--<nz-form-item nz-row style="margin-bottom:8px;">-->
        <!--<nz-form-control [nzSpan]="14" [nzOffset]="6">-->
          <!--<label nz-checkbox formControlName="agree">-->
            <!--<span>I have read the <a>agreement</a></span>-->
          <!--</label>-->
        <!--</nz-form-control>-->
      <!--</nz-form-item>-->
      <nz-form-item nz-row style="margin-bottom:8px;">
        <nz-form-control [nzSpan]="14" [nzOffset]="6">
          <button nz-button nzType="primary">Zarejestruj się</button>
        </nz-form-control>
      </nz-form-item>
    </form>
  `
})
export class RegisterFormComponent implements OnInit {
  validateForm: FormGroup;

  @Output() submitted = new EventEmitter<RegisterForm>();

  submitForm(): void {
    for (const i of Object.keys(this.validateForm.controls)) {
      this.validateForm.controls[ i ].markAsDirty();
      this.validateForm.controls[ i ].updateValueAndValidity();
    }

    if (this.validateForm.valid) {
      const result = this.validateForm.value;
      result.birthdayDate = this.validateForm.value.birthdayDate.toISOString().slice(0, 10);

      this.submitted.emit(result);
    }
  }

  updateConfirmValidator(): void {
    /** wait for refresh value */
    Promise.resolve().then(() => this.validateForm.controls.checkPassword.updateValueAndValidity());
  }

  confirmationValidator = (control: FormControl): { [s: string]: boolean } => {
    if (!control.value) {
      return { required: true };
    } else if (control.value !== this.validateForm.controls.password.value) {
      return { confirm: true, error: true };
    }
  }

  constructor(private fb: FormBuilder) {
  }

  ngOnInit(): void {

    const initialDate = convert(LocalDateTime.now().minusYears(20)).toDate();


    this.validateForm = this.fb.group({
      email            : [ null, [ Validators.email ] ],
      password         : [ null, [ Validators.required ] ],
      checkPassword    : [ null, [ Validators.required, this.confirmationValidator ] ],
      fullName         : [ null, [ Validators.required ] ],
      birthdayDate     : [ initialDate],
      // agree            : [ false ]
    });
  }

  onBirthdayDateChange($event) {
    console.log($event);
    console.log(this.validateForm.value);
  }


  disabledDate = (current: Date) => {
    const nowMinusTenYears = LocalDateTime.now().minusYears(10);

    return LocalDateTime.from(nativeJs(current)).isAfter(nowMinusTenYears);
  }
}
