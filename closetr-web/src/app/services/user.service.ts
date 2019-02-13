import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  baseUrl: string;
  constructor(private http: HttpClient) {
    this.baseUrl = 'http://localhost:8080/';
  }

  register(user: User) {
    var params = {
      user: user
    };
    return this.http.post(this.baseUrl + 'api/users/register', params);
  }

  update(user: User) {
    var params = {
      user: user
    };
    return this.http.post(this.baseUrl + 'api/users/update', params);
  }

}
