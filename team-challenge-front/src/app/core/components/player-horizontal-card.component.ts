import {ChangeDetectionStrategy, Component, EventEmitter, Input, Output} from '@angular/core';
import {getFrequencyDescription, getSkillDescription, Player} from '../models/player';
import {Team} from '../models/team';

@Component({
  selector: 'app-player-horizontal-card',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="app-card" (click)="onCardClicked()" style="margin: 5px;">
      
      <div *ngIf="!alignRight"nz-row nzGutter="16">
        <div nz-col nzSm="4"><img alt="example" style="max-width: 100%; max-height: 100%" [src]="getAvatarUrl()"/></div>
        <div nz-col nzSm="20" style="text-align: left;">
          <div class="place">
            <strong>{{player.fullName}} </strong> <nz-tag *ngIf="isManager()" [nzColor]="'cyan'" style="margin-left: 5px;">Manager</nz-tag>
          </div>
          <p style="margin-top: 5px;">
            {{player.age}} lat | {{getSkillDescription(player.skill)}} | {{getFrequencyDescription(player.skill)}}
          </p>
        </div>
      </div>

      <div *ngIf="alignRight"nz-row nzGutter="16">
        <div nz-col nzSm="20" style="text-align: right;">
          <div class="place">
            <nz-tag *ngIf="isManager()" [nzColor]="'cyan'">Manager </nz-tag> <strong>{{player.fullName}}</strong>
          </div>
          <p style="margin-top: 5px;">
            {{getFrequencyDescription(player.skill)}} | {{getSkillDescription(player.skill)}} | {{player.age}} lat
          </p>
        </div>
        <div nz-col nzSm="4"><img alt="example" style="max-width: 100%; max-height: 100%" [src]="getAvatarUrl()"/></div>
      </div>
      
    </div>
  `
})
export class PlayerHorizontalCardComponent {

  @Input()
  player: Player;

  @Input()
  alignRight: boolean;

  @Input()
  team: Team;

  @Output()
  viewProfile = new EventEmitter();

  getSkillDescription = getSkillDescription;

  getFrequencyDescription = getFrequencyDescription;


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

  isManager() {
    if (this.team) {
      return this.team.managerId === this.player.id;
    } else {
      return false;
    }
  }

}

