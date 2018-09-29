import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {RegisterForm} from '../models/register';
import * as AuthActions from '../actions/auth.actions';
import {Authenticate} from '../models/authenticate';
import {Observable} from 'rxjs';
import {ApiError} from '../../core/models/error';
import {select, Store} from '@ngrx/store';
import * as fromAuth from '../reducers';
import {NgProgress} from '@ngx-progressbar/core';
import {NzMessageService} from 'ng-zorro-antd';

@Component({
  selector: 'app-login-form-horizontal',
  template: `
    <ng-progress></ng-progress>
    <form nz-form [nzLayout]="'inline'" [formGroup]="validateForm" (ngSubmit)="submitForm()">
      <nz-form-item>
        <nz-form-control [class.has-error]="error">
          <nz-input-group nzPrefixIcon="anticon anticon-user">
            <input formControlName="email" nz-input placeholder="Adres email">
          </nz-input-group>
        </nz-form-control>
      </nz-form-item>
      <nz-form-item>
        <nz-form-control [class.has-error]="error">
          <nz-input-group nzPrefixIcon="anticon anticon-lock">
            <input formControlName="password" nz-input type="password" placeholder="Hasło">
          </nz-input-group>
        </nz-form-control>
      </nz-form-item>
      <nz-form-item>
        <nz-form-control>
          <button nz-button nzType="primary">Zaloguj się</button>
        </nz-form-control>
      </nz-form-item>
    </form>
  `,
  styles: [`
    form[nz-form] {
      margin-top: 12px; /* it is workaround for register form navbar alignment */
    }
  `]
})
export class LoginFormHorizontalComponent implements OnInit {
  @Input() error: boolean;
  @Output() submitted = new EventEmitter<Authenticate>();

  validateForm: FormGroup;

  submitForm(): void {
    for (const i of Object.keys(this.validateForm.controls)) {
      this.validateForm.controls[ i ].markAsDirty();
      this.validateForm.controls[ i ].updateValueAndValidity();
    }

    if (this.validateForm.valid) {
      this.submitted.emit(this.validateForm.value);
    }
  }

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      email: [ null, [ Validators.required ] ],
      password: [ null, [ Validators.required ] ],
      remember: [ true ]
    });
  }
}
