import {Action} from '@ngrx/store';

export enum CoreActionTypes {
  NoAction = '[Core] No action',
  EnterApplication = '[Core] Enter application'
}

export class NoAction implements Action {
  readonly type = CoreActionTypes.NoAction;
}

export class EnterApplication implements Action {
  readonly type = CoreActionTypes.EnterApplication;
}

export type CoreActionUnion = EnterApplication | NoAction;
