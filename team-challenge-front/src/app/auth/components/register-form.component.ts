import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {RegisterForm} from '../models/register';
import * as AuthActions from '../actions/auth.actions';


@Component({
  selector: 'app-register-form',
  template: `
    <form nz-form [formGroup]="validateForm" (ngSubmit)="submitForm()">
      <nz-form-item>
        <nz-form-label [nzSm]="6" [nzXs]="24" nzRequired nzFor="email">E-mail</nz-form-label>
        <nz-form-control [nzSm]="14" [nzXs]="24">
          <input nz-input formControlName="email" id="email">
          <nz-form-explain *ngIf="validateForm.get('email').dirty && validateForm.get('email').errors">
            The input is not valid E-mail!
          </nz-form-explain>
        </nz-form-control>
      </nz-form-item>
      <nz-form-item>
        <nz-form-label [nzSm]="6" [nzXs]="24" nzFor="password" nzRequired>Password</nz-form-label>
        <nz-form-control [nzSm]="14" [nzXs]="24">
          <input nz-input type="password" id="password" formControlName="password" (ngModelChange)="updateConfirmValidator()">
          <nz-form-explain *ngIf="validateForm.get('password').dirty && validateForm.get('password').errors">
            Please input your password!
          </nz-form-explain>
        </nz-form-control>
      </nz-form-item>
      <nz-form-item>
        <nz-form-label [nzSm]="6" [nzXs]="24" nzFor="checkPassword" nzRequired>Confirm Password</nz-form-label>
        <nz-form-control [nzSm]="14" [nzXs]="24">
          <input nz-input type="password" formControlName="checkPassword" id="checkPassword">
          <nz-form-explain *ngIf="validateForm.get('checkPassword').dirty && validateForm.get('checkPassword').errors">
            <ng-container *ngIf="validateForm.get('checkPassword').hasError('required')">
              Please confirm your password!
            </ng-container>
            <ng-container *ngIf="validateForm.get('checkPassword').hasError('confirm')">
              Two passwords that you enter is inconsistent!
            </ng-container>
          </nz-form-explain>
        </nz-form-control>
      </nz-form-item>
      <nz-form-item>
        <nz-form-label [nzSm]="6" [nzXs]="24" nzFor="nickname" nzRequired>
        <span>
          Full name
          <nz-tooltip nzTitle="What do you want other to call you">
            <i nz-tooltip class="anticon anticon-question-circle-o"></i>
          </nz-tooltip>
        </span>
        </nz-form-label>
        <nz-form-control [nzSm]="14" [nzXs]="24">
          <input nz-input id="fullName" formControlName="fullName">
          <nz-form-explain *ngIf="validateForm.get('fullName').dirty && validateForm.get('fullName').errors">
            Please input your full name
          </nz-form-explain>
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
          <button nz-button nzType="primary">Register</button>
        </nz-form-control>
      </nz-form-item>
    </form>
  `
})
export class RegisterFormComponent implements OnInit {
  validateForm: FormGroup;

  @Output() submitted = new EventEmitter<RegisterForm>();

  submitForm(): void {
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[ i ].markAsDirty();
      this.validateForm.controls[ i ].updateValueAndValidity();
    }

    if (this.validateForm.valid) {
      this.submitted.emit(this.validateForm.value);
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
    this.validateForm = this.fb.group({
      email            : [ null, [ Validators.email ] ],
      password         : [ null, [ Validators.required ] ],
      checkPassword    : [ null, [ Validators.required, this.confirmationValidator ] ],
      fullName         : [ null, [ Validators.required ] ],
      // agree            : [ false ]
    });
  }
}
