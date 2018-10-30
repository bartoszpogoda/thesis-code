import {Injectable} from '@angular/core';
import {RegisterForm} from '../../auth/models/register';
import {Observable} from 'rxjs';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Team} from '../../core/models/team';
import {Page} from '../../core/models/page';

@Injectable()
export class CommunityService {

  constructor(private http: HttpClient) {}

  getTeamsPage(regionId: string, page: number = 0, size: number = 10): Observable<Page<Team>> {
    const params = new HttpParams()
      .set('page', '' + page)
      .set('size', '' + size)
      .set('disciplineId', '3x3basket')
      .set('regionId', regionId);
    return this.http.get<Page<Team>>('/api/teams', {params: params});
  }

}
