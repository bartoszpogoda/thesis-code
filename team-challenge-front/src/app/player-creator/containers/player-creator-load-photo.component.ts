import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Player, PlayerRegistrationForm} from '../../core/models/player';
import {select, Store} from '@ngrx/store';
import * as fromRoot from '../../core/reducers/index';
import {Observable} from 'rxjs';
import {UploadAvatar, UploadAvatarSuccess} from '../store/player-creator.actions';
import {selectAvatarUploaded, selectAvatarUploading, selectButtonText} from '../store/player-creator.selectors';
import {selectPlayerProfile} from '../../core/selectors/my-player.selectors';


@Component({
  selector: 'app-player-creator-load-photo',
  template: `
    <div nz-row nzGutter="16">
      <div nz-col class="gutter-row" nzXs="0" nzSm="5"></div>
      <div nz-col class="gutter-row" nzXs="24" nzSm="14">

        <h2>Dodaj zdjęcie</h2>
        <p>Aby inni mogli Cię rozpoznać.</p>

        <app-image-loader [uploadUrl]="'api/3x3basket/players/' + (player$ | async).id + '/avatar'" (startedUpload)="onStartedUpload()"
                          (uploaded)="onUploaded()"></app-image-loader>

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
  player$: Observable<Player>;

  onUploaded() {
    this.store.dispatch(new UploadAvatarSuccess());
  }

  onStartedUpload() {
    this.store.dispatch(new UploadAvatar());
  }

  constructor(private store: Store<fromRoot.State>) {
    this.avatarUploading$ = this.store.pipe(select(selectAvatarUploading));
    this.avatarUploaded$ = this.store.pipe(select(selectAvatarUploaded));
    this.buttonText$ = this.store.pipe(select(selectButtonText));
    this.player$ = this.store.pipe(select(selectPlayerProfile));
  }

}
