import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  baseUrl: string;
  private currentUserSubject: User = new User();

  constructor(private http: HttpClient) {
    this.baseUrl = `${environment.baseUrl}/users/login`;
  }

  public get currentUserValue(): User {
    let currentUser;
    if (currentUser = JSON.parse(localStorage.getItem('currentUser'))) {
      return new User(currentUser.value);
    }
    return null;
  };

  login(loginData: any) {
    let params = {
      user: loginData
    };
    let currUser;
    return this.http.post<any>(this.baseUrl, params)
      .pipe(map(user => {
          if (user && user.token) {
            currUser = new User(user.data);
            localStorage.setItem('currentUser', currUser);
            return currUser;
          } else {
            console.log('error on login', user);
          }
      }));
  }

  logout() {
    localStorage.removeItem('currentUser');
    this.currentUserSubject = null;
  }

}
