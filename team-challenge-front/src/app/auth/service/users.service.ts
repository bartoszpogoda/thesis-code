import {Injectable} from '@angular/core';
import {RegisterForm} from '../models/register';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';


@Injectable()
export class UsersService {
 register(form: RegisterForm): Observable<any> { // TODO user model
    return this.http.post<RegisterForm>('/api/users', form);
 }

 constructor(private http: HttpClient) {}
}
