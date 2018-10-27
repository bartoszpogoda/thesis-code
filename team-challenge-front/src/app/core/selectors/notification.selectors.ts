import {createFeatureSelector, createSelector} from '@ngrx/store';
import * as fromPlayerCreator from '../../player-creator/store/player-creator.reducer';
import {selectState} from '../../player-creator/store/player-creator.selectors';
import { State} from '../reducers';
import * as fromNotification from '../reducers/notification.reducer';


export const selectNotificationState = createFeatureSelector<State, fromNotification.State>('notification');

export const selectMyPlayerNotifications = createSelector(
  selectNotificationState,
  fromNotification.getMyPlayerNotifications
);

export const selectMyPlayerNotificationsAny = createSelector(
  selectMyPlayerNotifications,
  notifications => notifications.any()
);

