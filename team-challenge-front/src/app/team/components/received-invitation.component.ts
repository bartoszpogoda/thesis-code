import {Component, EventEmitter, Input, Output} from '@angular/core';
import {TeamInvitation} from '../../core/models/team-invitation';
import {OutputEmitter} from '@angular/compiler/src/output/abstract_emitter';

@Component({
  selector: 'app-received-invitation',
  template: `
    <p>Zaproszenie do drużyny
      <strong (click)="onClickedTeam()">{{teamInvitation.teamName}}</strong>
      od <strong>{{teamInvitation.teamManagerName}}</strong></p>
    <nz-button-group>
      <button (click)="onAccepted()" nz-button nzType="primary">Dołącz</button>
      <button (click)="onDeclined()" nz-button>Odrzuć</button>
    </nz-button-group>
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

