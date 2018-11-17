import {ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {PlaceTimeOffer, Result} from '../models/challenge';
import {Position} from '../../core/models/position';
import {Facility} from '../../core/models/facility';

import {LocalDate, LocalDateTime, nativeJs, ZonedDateTime, ZoneId, ZoneOffset} from 'js-joda';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {PlayerRegistrationForm} from '../../core/models/player';
import {Region} from '../../core/models/region';
import {Team} from '../../core/models/team';


@Component({
  selector: 'app-result-modal',
  template: `

    <div style="text-align: center">
      <button nz-button (click)="showModal()">
        Wprowadź wynik
      </button>
    </div>
    <nz-modal [(nzVisible)]="isVisible" nzTitle="Wprowadzenie wyniku" [nzFooter]="modalFooter" (nzOnCancel)="handleCancel()"
              (nzOnOk)="handleOk()" nzWidth="700px">

      <div nz-row>
        <div nz-col nzSm="24">
          <form nz-form [formGroup]="validateForm" style="text-align: center">

            <div nz-row style="margin: 5px 0" [nzGutter]="16">
              <div nz-col [nzOffset]="4" [nzSm]="7">
                <i *ngIf="this.validateForm.get('hostPoints').value > this.validateForm.get('guestPoints').value" style="font-size: 1.5em" class="anticon anticon-trophy"></i>
              </div>
              <div nz-col [nzSm]="2">
                <i *ngIf="this.validateForm.get('hostPoints').value === this.validateForm.get('guestPoints').value" style="font-size: 1.5em" class="anticon anticon-trophy"></i>
              </div>
              <div nz-col [nzSm]="7" >
                <i *ngIf="this.validateForm.get('hostPoints').value < this.validateForm.get('guestPoints').value" style="font-size: 1.5em" class="anticon anticon-trophy"></i>
              </div>
            </div>


            <div nz-row [nzGutter]="16">
              <div nz-col [nzOffset]="4" [nzSm]="7">
                <h2>{{hostTeam.name}}</h2>
              </div>
              <div nz-col [nzOffset]="2" [nzSm]="7" >
                <h2>{{guestTeam.name}}</h2>
              </div>
            </div>
            <div nz-row [nzGutter]="16">
              <div nz-col [nzOffset]="4" [nzSm]="7">
                <nz-input-number formControlName="hostPoints" [nzSize]="'large'" [nzMin]="0" [nzMax]="50" [nzStep]="1"></nz-input-number>
              </div>
              <div nz-col [nzSm]="2">
                <h2>-</h2>
              </div>
              <div nz-col [nzSm]="7" >
                <nz-input-number formControlName="guestPoints" [nzSize]="'large'" [nzMin]="0" [nzMax]="50" [nzStep]="1"></nz-input-number>
              </div>
            </div>

           

          </form>
        </div>
      </div>
      
      <ng-template #modalFooter>
        <button nz-button nzType="default" (click)="handleCancel()">Anuluj</button>
        <button nz-button nzType="primary" (click)="handleOk()" >Wprowadź</button>
      </ng-template>
    </nz-modal>
  `
})
export class ResultModalComponent implements OnInit {

  isVisible = false;

  validateForm: FormGroup;

  @Input()
  hostTeam: Team;

  @Input()
  guestTeam: Team;

  @Output()
  submitted = new EventEmitter<Result>();

  constructor(private fb: FormBuilder) {
  }

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      hostPoints: [0],
      guestPoints: [0],
    });
  }

  showModal(): void {
    this.isVisible = true;
  }

  handleOk(): void {
    const hostPoints = this.validateForm.controls.hostPoints.value;
    const guestPoints = this.validateForm.controls.guestPoints.value;

    let resultForm: Result = {
      winnerPoints: Math.max(hostPoints, guestPoints),
      loserPoints: Math.min(hostPoints, guestPoints)
    };

    if (hostPoints !== guestPoints) {
      const hostWon = hostPoints > guestPoints;
      const winnerTeamId = hostWon ? this.hostTeam.id : this.guestTeam.id;

      resultForm = {
        ...resultForm,
        winnerTeamId: winnerTeamId
      };
    }

    this.submitted.emit(resultForm);
  }

  handleCancel(): void {
    this.isVisible = false;
  }

}

