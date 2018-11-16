import * as fromMyChallenges from '../reducers/my-challenges.reducer';
import {createSelector} from '@ngrx/store';
import {selectMyChallengesState} from '../reducers';
import {selectMyTeam, selectMyTeamPlayers} from '../../core/selectors/my-team.selectors';
import {ChallengeStatus, PlaceTimeOfferStatus} from '../models/challenge';
import {ZonedDateTime} from 'js-joda';
import {months} from '../components/my-place-time-offer.component';

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

export const selectTheirPlayers = createSelector(
  selectMyChallengesState,
  fromMyChallenges.getTheirPlayers
);

export const selectChallengingTeamPlayers = createSelector(
  selectChallenge,
  selectMyTeam,
  selectMyTeamPlayers,
  selectTheirPlayers,
  (challenge, myTeam, myTeamPlayers, theirPlayers) => {
    if (!challenge || !myTeam || !myTeamPlayers || !theirPlayers) {
      return null;
    }

    return challenge.challengingTeamId === myTeam.id ? myTeamPlayers : theirPlayers;
  }
);

export const selectChallengedTeamPlayers = createSelector(
  selectChallenge,
  selectMyTeam,
  selectMyTeamPlayers,
  selectTheirPlayers,
  (challenge, myTeam, myTeamPlayers, theirPlayers) => {
    if (!challenge || !myTeam || !myTeamPlayers || !theirPlayers) {
      return null;
    }

    return challenge.challengedTeamId === myTeam.id ? myTeamPlayers : theirPlayers;
  }
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
  (challenge) => challenge ? challenge.status : null
);

export const selectIsChallengeCancellable = createSelector(
  selectChallengeStatus,
  selectIsMyTeamHost,
  (status, isMyTeamHost) => {

    if (status === ChallengeStatus.Pending) {
      return isMyTeamHost;
    } else {
      return status === ChallengeStatus.Accepted;
    }
  }
);

export const selectIsChallengeRejectable = createSelector(
  selectChallengeStatus,
  selectIsMyTeamHost,
  (status, isMyTeamHost) => {

    if (status === ChallengeStatus.Pending) {
      return !isMyTeamHost;
    } else {
      return false;
    }
  }
);

export const selectIsChallengeReadyForResults = createSelector(
  selectChallengeStatus,
  (status) => {
    // TODO implement
    return false;
  }
);

export const selectChallengeHasResultToConfirm = createSelector(
  selectChallengeStatus,
  (status) => {
    // TODO implement
    return false;
  }
);

export const selectAcceptedOffer = createSelector(
  selectPlaceTimeOffers,
  (placeTimeOffers) => {
    const filtered = placeTimeOffers.filter(offer => offer.status === PlaceTimeOfferStatus.Accepted);
    return filtered.length > 0 ? filtered[0] : null;
  }
)

export const selectChallengePlaceName = createSelector(
  selectAcceptedOffer,
  acceptedOffer => {

    console.log(acceptedOffer);
    return acceptedOffer ? acceptedOffer.offeredFacility.name : null;
  }
);

function getDate(zdt: ZonedDateTime) {
  return '' + zdt.dayOfMonth() + ' ' + months[zdt.month().value()] + ' ' + zdt.year();
}

function getTime(zdt: ZonedDateTime) {
  return '' + zdt.hour() + ':' + (zdt.minute() >= 10 ? zdt.minute() : '0' + zdt.minute());
}

export const selectChallengeTime = createSelector(
  selectAcceptedOffer,
  acceptedOffer => {
    if (acceptedOffer) {
      const zdt = ZonedDateTime.parse(acceptedOffer.offeredDate);
      return getDate(zdt) + ' ' + getTime(zdt);
    } else {
      return null;
    }
  }
);






