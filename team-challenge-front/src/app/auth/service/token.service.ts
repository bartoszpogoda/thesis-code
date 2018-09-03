import {Injectable} from '@angular/core';
import {DecodedToken, Token} from '../models/token';
import {Authenticate} from '../models/authenticate';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';

import * as JWT from 'jwt-decode';


@Injectable()
export class TokenService {

  create(auth: Authenticate): Observable<Token> {
    return this.http.post<Token>('/api/token', auth);
  }

  decode(token: Token): DecodedToken {
    const decoded = JWT(token.token);
    return {
      email: decoded['sub'],
      fullName: decoded['fullname'],
      roles: decoded['roles']
    };
  }

  constructor(private http: HttpClient) {}

}
