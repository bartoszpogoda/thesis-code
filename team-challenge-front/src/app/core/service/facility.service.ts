import {Injectable} from '@angular/core';
import {RegisterForm} from '../../auth/models/register';
import {Observable} from 'rxjs';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Player, PlayerRegistrationForm} from '../models/player';
import {TeamInvitation} from '../models/team-invitation';
import {Page} from '../models/page';
import {map} from 'rxjs/operators';
import {Facility, FacilityCreationForm} from '../models/facility';

@Injectable()
export class FacilityService {

  constructor(private http: HttpClient) {}

  create(builder: FacilityCreationForm): Observable<Facility> {
    return this.http.post<Facility>('/api/facilities', builder);
  }

  getForRegion(regionId): Observable<Facility[]> {
    const params = new HttpParams().set('disciplineId', '3x3basket').set('regionId', regionId).set('regionId', regionId)
      .set('size', '1000');

    return this.http.get<Page<Facility>>('/api/facilities', {params: params})
      .pipe(map(page => page.content));
  }

  get(id: string): Observable<Facility> {
    return this.http.get<Facility>('/api/facilities/' + id);
  }

}
