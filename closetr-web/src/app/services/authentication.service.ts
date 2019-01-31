import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  baseUrl: string;

  constructor(private http: HttpClient) {
    this.baseUrl = 'http://localhost:8080/';
  }

  login(loginData: any) {
    var params = {
      user: loginData
    };
    return this.http.post(this.baseUrl + 'api/users/login', params);
  }
}
