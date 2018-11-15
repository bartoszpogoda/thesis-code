import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {PlayerRegistrationForm} from '../../core/models/player';
import {Region} from '../../core/models/region';

/* TODO ADD REGION PICKER */

@Component({
  selector: 'app-player-skill-form',
  template: `
    <div nz-row>
      <div nz-col nzSm="24">
        <form nz-form [formGroup]="validateForm" (ngSubmit)="submitForm()">

          <nz-form-item style="margin-bottom: 70px;">
            <nz-form-control [nzOffset]="4" [nzSm]="16" [nzXs]="24">
              <!--<h3>Poziom umiejętności</h3>-->
              <p>Zapoznaj się z opisami poszczególnych profili i wybierz ten, do którego najbardziej pasujesz.</p>
              <nz-slider  formControlName="experience" [nzMin]="0" [nzMax]="4" [nzMarks]="marks" [nzTipFormatter]="formatter"></nz-slider>
            </nz-form-control>
          </nz-form-item>

          <nz-form-item>
            <nz-form-label [nzOffset]="4" [nzSm]="6" [nzXs]="24" nzRequired nzFor="regionId">Częstość gry</nz-form-label>
            <nz-form-control [nzSm]="6" [nzXs]="24">
              <nz-select formControlName="frequency" id="frequency" nzPlaceHolder="Określ częstość swojej gry">
                <nz-option nzValue="0" nzLabel="Okazjonalnie"></nz-option>
                <nz-option nzValue="1" nzLabel="Parę razy miesięcznie"></nz-option>
                <nz-option nzValue="2" nzLabel="Parę razy tygodniowo"></nz-option>
              </nz-select>
            </nz-form-control>
          </nz-form-item>

          <nz-form-item nz-row style="margin-bottom:8px;">
            <nz-form-control [nzSpan]="24">
              <button nz-button nzType="primary">Utwórz profil</button>
            </nz-form-control>
          </nz-form-item>
        </form>
      </div>
    </div>

  `, styles: [`
      p {
        margin-bottom: 0 !important;
      }
  `]
})
export class PlayerSkillFormComponent implements OnInit {
  validateForm: FormGroup;

  @Input()
  builder: PlayerRegistrationForm;

  marks: any = {
    0: {
      label: '<strong>Świeżak</strong><p>Dopiero zaczynasz przygodę z koszykówką</p>',
    },
    1: {
      label: '<strong>Początkujący</strong><p>Znasz w podstawowym stopniu technikę gry oraz podstawowe zagrywki.</p>',
    },
    2: {
      label: '<strong>Średnio-zaawansowany</strong><p>aa</p>',
    },
    3: {
      label: '<strong>Zaawansowany</strong><p>bb</p>',
    },
    4: {
      label: '<strong>Ekspert</strong><p>cc</p>',
    }
  };

  formatter(value) {
    return null;
  }


  @Input()
  regions: Region[];

  @Output() submitted = new EventEmitter<PlayerRegistrationForm>();

  submitForm(): void {
    for (const i of Object.keys(this.validateForm.controls)) {
      this.validateForm.controls[ i ].markAsDirty();
      this.validateForm.controls[ i ].updateValueAndValidity();
    }

    const skill = this.calculateSkill();

    if (this.validateForm.valid) {
      this.submitted.emit({
        ...this.builder,
        skill: skill
      });
    }
  }

  calculateSkill() {
    const experience = this.validateForm.controls.experience.value;
    const frequency = parseInt(this.validateForm.controls.frequency.value);

    if (experience === 0) {
      return 0; // newbie
    } else if (experience === 4) {
      return 10; // expert
    } else {
      return ((experience * 3) - 2) + frequency; // other
    }
  }

  constructor(private fb: FormBuilder) {
  }

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      experience: [0],
      frequency: [null, [Validators.required]],
    });
  }
}
