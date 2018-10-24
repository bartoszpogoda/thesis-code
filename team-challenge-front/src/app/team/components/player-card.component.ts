import {Component, EventEmitter, Input, Output} from '@angular/core';
import {TeamInvitation} from '../../core/models/team-invitation';
import {OutputEmitter} from '@angular/compiler/src/output/abstract_emitter';
import {Player} from '../../core/models/player';
import {NzMessageService, UploadFile} from 'ng-zorro-antd';

@Component({
  selector: 'app-player-card',
  template: `
    <nz-card (click)="onCardClicked()" nzHoverable [nzCover]="coverTemplate">
      <nz-card-meta nzTitle="Imię Nazwisko" nzDescription="Coś.."></nz-card-meta>
    </nz-card>
    <ng-template #coverTemplate>
      <img alt="example" src="/assets/images/home/avatar.png"/>
    </ng-template>
  `
})
export class PlayerCardComponent {

  @Input()
  player: Player;

  @Output()
  viewProfile = new EventEmitter();


  onCardClicked() {
    this.viewProfile.emit();
  }



}

