import {Component, EventEmitter, Input, Output} from '@angular/core';
import {TeamInvitation} from '../models/team-invitation';
import {OutputEmitter} from '@angular/compiler/src/output/abstract_emitter';

@Component({
  selector: 'app-received-invitation',
  template: `
    <nz-card class="invitation-card">
      <strong (click)="onClickedTeam()">{{teamInvitation.teamName}}</strong>
      <nz-button-group style="float: right;">
        <button (click)="onAccepted()" nz-button nzType="primary">Dołącz</button>
        <button (click)="onDeclined()" nz-button>Odrzuć</button>
      </nz-button-group>
    </nz-card>
  `
})
export class ReceivedInvitationComponent {

  @Input()
  teamInvitation: TeamInvitation;

  @Output()
  accepted = new EventEmitter<any>();

  @Output()
  declined = new EventEmitter<any>();

  @Output()
  clickedTeam = new EventEmitter<any>();

  onAccepted() {
    this.accepted.emit();
  }

  onDeclined() {
    this.declined.emit();
  }

  onClickedTeam() {
    this.clickedTeam.emit();
  }

}

