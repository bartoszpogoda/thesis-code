import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient, HttpParams} from '@angular/common/http';;
import {Region} from '../models/region';
import {SearchForm} from '../models/search-form';
import {SearchResult} from '../models/search-result';

@Injectable()
export class SearchService {

  constructor(private http: HttpClient) {}

  search(form: SearchForm): Observable<SearchResult> {
    return this.http.post<SearchResult>('/api/matchmaking/search', form);
  }


}
