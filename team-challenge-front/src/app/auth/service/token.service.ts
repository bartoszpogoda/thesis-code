import {Injectable} from '@angular/core';
import {Token} from '../models/token';
import {Authenticate} from '../models/authenticate';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';


@Injectable()
export class TokenService {

  create(auth: Authenticate): Observable<Token> {
    return this.http.post<Token>('/api/token', auth);
  }

  constructor(private http: HttpClient) {}

}
