import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user.model';
import { environment } from '../../environements';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  baseUrl: string;
  constructor(private http: HttpClient) {
    this.baseUrl = `${environment.baseUrl}/users`;
  }

  register(user: User) {
    var params = {
      user: user
    };
    return this.http.post(`${this.baseUrl}/register`, params);
  }

  update(user: User) {
    var params = {
      user: user
    };
    return this.http.post(`${this.baseUrl}/update`, params);
  }

}
