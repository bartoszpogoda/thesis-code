import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {select, Store} from '@ngrx/store';
import {Observable} from 'rxjs';
import {
  selectStageAvatarBtnText,
  selectStageAvatarUploaded,
  selectStageAvatarUploading, selectTeam
} from '../store/team-creator.selectors';
import {ProgressStage, UploadAvatar, UploadAvatarSuccess} from '../store/team-creator.actions';

import * as fromRoot from '../../core/reducers/index';
import {Team} from '../../core/models/team';


@Component({
  selector: 'app-team-creator-load-photo',
  template: `
    <div nz-row nzGutter="16">
      <div nz-col class="gutter-row" nzXs="0" nzSm="5"></div>
      <div nz-col class="gutter-row" nzXs="24" nzSm="14">
        <h2>Dodaj zdjęcie</h2>
        <p>Spraw aby Twoja drużyna wyróżniała się spośród innych.</p>

        <app-image-loader [uploadUrl]="'api/teams/' + (team$ | async).id + '/image'" (startedUpload)="onStartedUpload()"
                          (uploaded)="onUploaded($event)"></app-image-loader>

        <button (click)="onButtonClicked()" nz-button [nzType]="(avatarUploaded$ | async) ? 'primary' : 'default'"
                [nzLoading]="avatarUploading$ | async">
          <i *ngIf="avatarUploaded$ | async" class="anticon anticon-check"></i>{{buttonText$ | async}}
        </button>
      </div>
    </div>
  `, styles: [`
    [nz-button] {
      margin: 10px;
    }
  `]
})
export class TeamCreatorLoadPhotoComponent  {

  avatarUploading$: Observable<boolean>;
  avatarUploaded$: Observable<boolean>;
  buttonText$: Observable<string>;
  team$: Observable<Team>;

  onUploaded() {
    this.store.dispatch(new UploadAvatarSuccess());
  }

  onStartedUpload() {
    this.store.dispatch(new UploadAvatar());
  }

  constructor(private store: Store<fromRoot.State>) {
    this.avatarUploading$ = this.store.pipe(select(selectStageAvatarUploading));
    this.avatarUploaded$ = this.store.pipe(select(selectStageAvatarUploaded));
    this.buttonText$ = this.store.pipe(select(selectStageAvatarBtnText));
    this.team$ = this.store.pipe(select(selectTeam));
  }

  onButtonClicked() {
    this.store.dispatch(new ProgressStage());
  }
}
