import {Action} from '@ngrx/store';
import {Effect, ofType} from '@ngrx/effects';
import {SetHomeSuccess, TeamCreatorActionTypes} from '../../team-creator/store/team-creator.actions';
import {tap} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {Type} from '@angular/core';
import {NzMessageService, NzModalService} from 'ng-zorro-antd';
import {ApiError} from '../models/error';

/**
 * Util function to reduce boilerplate code in effects. Maps action to payload.
 * Should be used with caution, only on actions that have payload.
 */
export const toPayload = (action: any) => action.payload;

/**
 * Util function to reduce boilerplate code in effects. Shows success message.
 */
export function successMessageEffect<A extends Action>(
  actions: Observable<Action>,
  msgService: NzMessageService,
  type: any,
  message: string
) {
  return actions.pipe(
    ofType<A>(type),
    tap(() => {
      msgService.success(message);
    })
  );
}
/**
 * Util function to reduce boilerplate code in effects. Shows error message.
 */
export function failureMessageEffect<A extends Action>(
  actions: Observable<Action>,
  modalService: NzModalService,
  type: any,
  error: ApiError
) {
  return actions.pipe(
    ofType<A>(type),
    tap(() => {
      modalService.error({
        nzTitle: error.message,
        nzContent: error.details
      });
    })
  );
}


