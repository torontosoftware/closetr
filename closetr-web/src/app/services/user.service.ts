import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  baseUrl: string;
  constructor(private http: HttpClient) {
    this.baseUrl = 'http://localhost:8080/';
  }

  register(user: any) {
    var params = {
      user: user
    };
    console.log(params);
    return this.http.post(this.baseUrl + 'api/users/register', params);
  }

}
