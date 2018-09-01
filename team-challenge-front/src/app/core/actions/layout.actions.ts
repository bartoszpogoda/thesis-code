import { Action } from '@ngrx/store';

export enum LayoutActionTypes {
  OpenNotifications = '[Layout] Open Notifications',
  CloseNotifications = '[Layout] Close Notifications',
  ToggleNotifications = '[Layout] Toggle Notifications',
}

export class OpenNotifications implements Action {
  readonly type = LayoutActionTypes.OpenNotifications;
}

export class CloseNotifications implements Action {
  readonly type = LayoutActionTypes.CloseNotifications;
}

export class ToggleNotifications implements Action {
  readonly type = LayoutActionTypes.ToggleNotifications;
}

export type LayoutActionsUnion = OpenNotifications | CloseNotifications
  | ToggleNotifications;
