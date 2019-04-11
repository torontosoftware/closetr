import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user.model';
import { environment } from '../../environments/environment';
import {
  httpPostHandlerDefault
} from './utils/utils';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  baseUrl: string;
  constructor(private http: HttpClient) {
    this.baseUrl = `${environment.baseUrl}/users`;
  }

  helper = (user: User, type: string): Observable<any> =>
    httpPostHandlerDefault(this, `${this.baseUrl}/${type}`, {user: user});

  register = (user: User): Observable<any> => this.helper(user, 'register');

  update = (user: User): Observable<any> => this.helper(user, 'update');

}
