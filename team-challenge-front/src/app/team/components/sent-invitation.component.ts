import {Component, EventEmitter, Input, Output} from '@angular/core';
import {TeamInvitation} from '../../core/models/team-invitation';
import {OutputEmitter} from '@angular/compiler/src/output/abstract_emitter';

@Component({
  selector: 'app-sent-invitation',
  template: `
    <nz-card class="invitation-card">
        (Todo: styling) <strong (click)="onClickedPlayer()">{{teamInvitation.playerName}}</strong>
        <nz-button-group style="margin-left: 10px; float: right;">
          <button (click)="onCanceled()" nz-button nzType="danger"><i nz-icon  class="anticon anticon-close"></i> Anuluj</button>
        </nz-button-group>
    </nz-card>

  `
})
export class SentInvitationComponent {

  @Input()
  teamInvitation: TeamInvitation;

  @Output()
  canceled = new EventEmitter<any>();

  @Output()
  clickedPlayer = new EventEmitter<any>();

  onCanceled() {
    this.canceled.emit();
  }

  onClickedPlayer() {
    this.clickedPlayer.emit();
  }

}

