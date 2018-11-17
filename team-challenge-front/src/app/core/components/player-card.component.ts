import {ChangeDetectionStrategy, Component, EventEmitter, Input, Output} from '@angular/core';
import {Player} from '../models/player';

@Component({
  selector: 'app-player-card',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <nz-card (click)="onCardClicked()" nzHoverable [nzCover]="coverTemplate">
      <nz-card-meta [nzTitle]="player.fullName" [nzDescription]="'Wiek: ' + player.age + ' Umiejętności: ' + player.skill"></nz-card-meta>
    </nz-card>
    <ng-template #coverTemplate>
      <img alt="example" [src]="getAvatarUrl()"/>
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

  getAvatarUrl() {
    if (this.player.hasImage) {
      return '/api/players/' + this.player.id + '/image';
    } else {
      return '/assets/images/home/avatar.png';
    }
  }



}

