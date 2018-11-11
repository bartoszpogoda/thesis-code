import * as fromChallengeCreator from '../reducers/challenge-creator.reducer';
import {createSelector} from '@ngrx/store';
import {selectChallengeCreatorState} from '../reducers';

export const selectStep = createSelector(
  selectChallengeCreatorState,
  fromChallengeCreator.getStep
);

export const selectSearchForm = createSelector(
  selectChallengeCreatorState,
  fromChallengeCreator.getSearchForm
);

export const selectSearching = createSelector(
  selectChallengeCreatorState,
  fromChallengeCreator.getSearching
);

export const selectComparing = createSelector(
  selectChallengeCreatorState,
  fromChallengeCreator.getComparing
);

export const selectResult = createSelector(
  selectChallengeCreatorState,
  fromChallengeCreator.getResult
);

export const selectSelected = createSelector(
  selectChallengeCreatorState,
  fromChallengeCreator.getSelected
);

export const selectThreeSelected = createSelector(
  selectSelected,
  selected => selected.length >= 3
);

export const selectOneSelected = createSelector(
  selectSelected,
  selected => selected.length === 1
);

export const selectMoreThanOneSelected = createSelector(
  selectSelected,
  selected => selected.length > 1
);

export const selectSelectedHomes = createSelector(
  selectChallengeCreatorState,
  fromChallengeCreator.getHomePoints
);

export const selectSelectedPlayers = createSelector(
  selectChallengeCreatorState,
  fromChallengeCreator.getPlayers
);

export const selectPickedTeam = createSelector(
  selectChallengeCreatorState,
  fromChallengeCreator.getPickedTeam
);

export const selectEntryPlaceTimeOffers = createSelector(
  selectChallengeCreatorState,
  fromChallengeCreator.getEntryPlaceTimeOffers
);

export const selectPickedTeamHome = createSelector(
  selectChallengeCreatorState,
  fromChallengeCreator.getPickedTeamHome
);





