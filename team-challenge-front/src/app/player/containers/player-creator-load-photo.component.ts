import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {PlayerRegistrationForm} from '../../core/models/player';
import {select, Store} from '@ngrx/store';
import * as fromRoot from '../../reducers';
import {
  selectPlayerCreatorAvatarUploaded,
  selectPlayerCreatorAvatarUploading,
  selectPlayerCreatorButtonText,
  selectPlayerProfileNotExisting
} from '../../reducers';
import {selectPlayerJustRegistered} from '../../reducers';
import {selectPlayerProfile} from '../../reducers';
import {selectPlayerCreatorStep} from '../../reducers';
import {Observable} from 'rxjs';
import {UploadAvatar, UploadAvatarSuccess} from '../../core/actions/player.actions';


@Component({
  selector: 'app-player-creator-load-photo',
  template: `
    <div nz-row nzGutter="16">
      <div nz-col class="gutter-row" nzXs="0" nzSm="5"></div>
      <div nz-col class="gutter-row" nzXs="24" nzSm="14">

        <h2>Dodaj zdjęcie</h2>
        <p>Aby inni mogli Cię rozpoznać.</p>

        <app-image-loader uploadUrl="api/images/users" (startedUpload)="onStartedUpload()"
                          (uploaded)="onUploaded($event)"></app-image-loader>

        <button routerLink="/player" nz-button [nzType]="(avatarUploaded$ | async) ? 'primary' : 'default'"
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
export class PlayerCreatorLoadPhotoComponent  {

  avatarUploading$: Observable<boolean>;
  avatarUploaded$: Observable<boolean>;
  buttonText$: Observable<string>;

  onUploaded(id: string) {
    this.store.dispatch(new UploadAvatarSuccess(id));
  }

  onStartedUpload() {
    this.store.dispatch(new UploadAvatar());
  }

  constructor(private store: Store<fromRoot.State>) {
    this.avatarUploading$ = this.store.pipe(select(selectPlayerCreatorAvatarUploading));
    this.avatarUploaded$ = this.store.pipe(select(selectPlayerCreatorAvatarUploaded));
    this.buttonText$ = this.store.pipe(select(selectPlayerCreatorButtonText));
  }

}
