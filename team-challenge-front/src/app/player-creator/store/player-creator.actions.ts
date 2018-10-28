import {Action} from '@ngrx/store';
import {PlayerEffects} from '../../core/effects/player.effects';
import {Player, PlayerRegistrationForm} from '../../core/models/player';
import {ApiError} from '../../core/models/error';

export enum PlayerCreatorActionTypes {
  Register = '[Player Creator] Register',
  RegisterSuccess = '[Player Creator] Register Success',
  RegisterFailure = '[Player Creator] Register Failure',
  UploadAvatar = '[Player Creator] Upload Avatar',
  UploadAvatarSuccess = '[Player Creator] Upload Avatar Success', // TODO what if failure?
}

export class Register implements Action {
  readonly type = PlayerCreatorActionTypes.Register;

  constructor(public payload: PlayerRegistrationForm) {}
}

export class RegisterSuccess implements Action {
  readonly type = PlayerCreatorActionTypes.RegisterSuccess;

  constructor(public payload: Player) {}
}

export class RegisterFailure implements Action {
  readonly type = PlayerCreatorActionTypes.RegisterFailure;

  constructor(public payload: ApiError) {}
}

export class UploadAvatar implements Action {
  readonly type = PlayerCreatorActionTypes.UploadAvatar;

}

export class UploadAvatarSuccess implements Action {
  readonly type = PlayerCreatorActionTypes.UploadAvatarSuccess;
}

export type PlayerCreatorActionsUnion = Register | RegisterSuccess | RegisterFailure
  | UploadAvatar | UploadAvatarSuccess;

