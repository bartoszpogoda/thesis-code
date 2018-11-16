import {createSelector} from '@ngrx/store';
import * as fromPastChallenges from './../reducers/past-challenges.reducer';
import {selectTeamsState} from '../../community/reducers';
import {selectPastChallengesState} from '../reducers';

export const selectCurrentPage = createSelector(
  selectPastChallengesState,
  fromPastChallenges.getCurrentPage
);

export const selectPageSize = createSelector(
  selectPastChallengesState,
  fromPastChallenges.getPageSize
);

export const selectTotal = createSelector(
  selectPastChallengesState,
  fromPastChallenges.getTotal
);

export const selectChallenges = createSelector(
  selectPastChallengesState,
  fromPastChallenges.getChallenges
);

export const selectPlaceTimeOffers = createSelector(
  selectPastChallengesState,
  fromPastChallenges.getPlaceTimeOffers
);

