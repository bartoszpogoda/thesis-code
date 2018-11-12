import {Challenge, PlaceTimeOffer} from '../models/challenge';
import {MyTeamActionsUnion} from '../../core/actions/my-team.actions';
import {AuthActionsUnion, AuthActionTypes} from '../../auth/actions/auth.actions';
import {MyChallengesActionsUnion, MyChallengesActionTypes} from '../actions/my-challenges.actions';


export interface State {
  activeChallenges: Challenge[];
  activePlaceTimeOffers: PlaceTimeOffer[][];
  challenge: Challenge;
  placeTimeOffers: PlaceTimeOffer[];
  theirHome: Position;
}

const initialState: State = {
  activeChallenges: [],
  activePlaceTimeOffers: [],
  challenge: null,
  placeTimeOffers: [],
  theirHome: null,
};

export function reducer(
  state: State = initialState,
  action: MyTeamActionsUnion | MyChallengesActionsUnion | AuthActionsUnion
): State {
  switch (action.type) {

    case AuthActionTypes.Logout:
      return {
        ...initialState
      };

    case MyChallengesActionTypes.LoadActiveChallengesSuccess:
      return {
        ...state,
        activeChallenges: action.payload
      };

    case MyChallengesActionTypes.LoadPlaceTimeOffersForActiveChallengesSuccess:
      return {
        ...state,
        activePlaceTimeOffers: action.payload
      };

    case MyChallengesActionTypes.LoadChallenge:
      return {
        ...state,
        challenge: null
      };

    case MyChallengesActionTypes.LoadPlaceTimeOffers:
      return {
        ...state
      };

    case MyChallengesActionTypes.LoadChallengeSuccess:
      return {
        ...state,
        challenge: action.payload
      };

    case MyChallengesActionTypes.LoadPlaceTimeOffersSuccess:
      return {
        ...state,
        placeTimeOffers: action.payload
      };

    case MyChallengesActionTypes.LoadTheirHomeSuccess:
      return {
        ...state,
        theirHome: action.payload
      };

    default:
      return state;
  }
}

export const getActiveChallenges = (state: State) => state.activeChallenges;
export const getActivePlaceTimeOffers = (state: State) => state.activePlaceTimeOffers;
export const getChallenge = (state: State) => state.challenge;
export const getPlaceTimeOffers = (state: State) => state.placeTimeOffers;
export const getTheirHome = (state: State) => state.theirHome;
