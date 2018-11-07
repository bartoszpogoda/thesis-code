import {Action} from '@ngrx/store';
import {ApiError} from '../models/error';
import {SearchForm} from '../models/search-form';
import {SearchResult} from '../models/search-result';

export enum SearchActionTypes {
  Search = '[Search] Search',
  SearchSuccess = '[Search] Search Success',
  SearchFailure = '[Search] Search Failure',
}

export class Search implements Action {
  readonly type = SearchActionTypes.Search;

  constructor(public payload: SearchForm) {}
}

export class SearchSuccess implements Action {
  readonly type = SearchActionTypes.SearchSuccess;

  constructor(public payload: SearchResult) {}
}

export class SearchFailure implements Action {
  readonly type = SearchActionTypes.SearchFailure;

  constructor(public payload: ApiError) {}
}


export type SearchActionsUnion = Search | SearchSuccess | SearchFailure;

