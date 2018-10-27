import {Component, EventEmitter, Input, Output} from '@angular/core';
import {TeamInvitation} from '../../core/models/team-invitation';
import {OutputEmitter} from '@angular/compiler/src/output/abstract_emitter';
import {Player} from '../../core/models/player';
import {NzMessageService, UploadFile} from 'ng-zorro-antd';
import {Team} from '../models/team';

@Component({
  selector: 'app-team-card',
  template: `
    <nz-card (click)="onCardClicked()" nzHoverable [nzCover]="coverTemplate">
      <nz-card-meta [nzTitle]="team.name" [nzDescription]="team.managerName"></nz-card-meta>
    </nz-card>
    <ng-template #coverTemplate>
      <img alt="example" [src]="getSrc()"/>
    </ng-template>
  `
})
export class TeamCardComponent {

  @Input()
  team: Team;

  @Output()
  viewProfile = new EventEmitter();


  onCardClicked() {
    this.viewProfile.emit();
  }

  getSrc() {
    if (this.team.hasImage) {
      return '/api/3x3basket/wro/teams/' + this.team.id + '/avatar';
    } else {
      return '/assets/images/home/avatar.png';
    }
  }


}

