import {Page} from '../../core/models/page';
import {Challenge, PlaceTimeOffer} from '../models/challenge';
import {PastChallengesActionsUnion, PastChallengesActionTypes} from '../actions/past-challenges.actions';
import {MyChallengesActionTypes} from '../actions/my-challenges.actions';


export interface State {
  page: Page<Challenge> | null;
  currentPage: number;
  total: number;
  pageSize: number;
  loading: boolean;
  placeTimeOffers: PlaceTimeOffer[][];
}

const initialState: State = {
  page: null,
  currentPage: 0,
  total: 0,
  pageSize: 0,
  loading: false,
  placeTimeOffers: []
};

export function reducer(
  state: State = initialState,
  action: PastChallengesActionsUnion
): State {
  switch (action.type) {

    case PastChallengesActionTypes.LoadPage:
      return {
        ...state,
        currentPage: action.payload
      };

    case PastChallengesActionTypes.LoadPageSuccess:
      return {
        ...state,
        page: action.payload,
        currentPage: action.payload.number,
        total: action.payload.totalElements,
        pageSize: action.payload.size
      };

    case PastChallengesActionTypes.LoadPlaceTimeOffersForPastChallengesSuccess:
      return {
        ...state,
        placeTimeOffers: action.payload
      };

    default:
      return state;
  }
}

export const getPage = (state: State) => state.page;
export const getCurrentPage = (state: State) => state.currentPage;
export const getPageSize = (state: State) => state.pageSize;
export const getChallenges = (state: State) => state.page ? state.page.content : [];
export const getTotal = (state: State) => state.total;
export const getPlaceTimeOffers = (state: State) => state.placeTimeOffers;
