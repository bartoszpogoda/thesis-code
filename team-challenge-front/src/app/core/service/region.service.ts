import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient, HttpParams} from '@angular/common/http';;
import {Region} from '../models/region';

@Injectable()
export class RegionService {

  constructor(private http: HttpClient) {}

  getAll(): Observable<Region[]> {
    return this.http.get<Region[]>('/api/regions');
  }

}
