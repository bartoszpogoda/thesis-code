import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient, HttpParams} from '@angular/common/http';

@Injectable()
export class ChallengeService {

  constructor(private http: HttpClient) {}

}
