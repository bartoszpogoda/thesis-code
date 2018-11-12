import * as fromMyChallenges from '../reducers/my-challenges.reducer';
import {createSelector} from '@ngrx/store';
import {selectChallengeCreatorState, selectMyChallengesState} from '../reducers';
import {selectMyTeam} from '../../core/selectors/my-team.selectors';

export const selectMyActiveChallenges = createSelector(
  selectMyChallengesState,
  fromMyChallenges.getActiveChallenges
);

export const selectMyActivePlaceTimeOffers = createSelector(
  selectMyChallengesState,
  fromMyChallenges.getActivePlaceTimeOffers
);

export const selectChallenge = createSelector(
  selectMyChallengesState,
  fromMyChallenges.getChallenge
);

export const selectPlaceTimeOffers = createSelector(
  selectMyChallengesState,
  fromMyChallenges.getPlaceTimeOffers
);

export const selectTheirHome = createSelector(
  selectMyChallengesState,
  fromMyChallenges.getTheirHome
);

export const selectMyTeamOffers = createSelector(
  selectMyTeam,
  selectPlaceTimeOffers,
  (myTeam, placeTimeOffers) => {
    if (!myTeam || !placeTimeOffers) {
      return null;
    }

    return placeTimeOffers.filter(offer => offer.offeringTeamId === myTeam.id);
  }
);

export const selectTheirTeamOffers = createSelector(
  selectMyTeam,
  selectPlaceTimeOffers,
  (myTeam, placeTimeOffers) => {
    if (!myTeam || !placeTimeOffers) {
      return null;
    }

    return placeTimeOffers.filter(offer => offer.offeringTeamId !== myTeam.id);
  });


export const selectIsMyTeamHost = createSelector(
  selectChallenge,
  selectMyTeam,
  (challenge, myTeam) => {
    if (!myTeam || !challenge) {
      return null;
    }

    return challenge.challengingTeamId === myTeam.id;
  }
);

export const selectChallengeStatus = createSelector(
  selectChallenge,
  (challenge) => challenge ? challenge.status : null;
);






