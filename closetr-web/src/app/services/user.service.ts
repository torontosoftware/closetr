import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  baseUrl: string;
  constructor(private http: HttpClient) {
    this.baseUrl = `${environment.baseUrl}/users`;
  }

  register = (user: User): Observable<any> => this.http.post(`${this.baseUrl}/register`, {user: user});

  update = (user: User): Observable<any> => this.http.post(`${this.baseUrl}/update`, {user: user});

}
