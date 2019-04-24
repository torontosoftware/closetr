import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { User } from '../models/user.model';

/*
Service for handling user authentication functions, including logging in,
and logging out. Allows components to get access to current user that is
logged in, if any.

baseUrl: route for api that handles user login requests.
*/
@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  baseUrl: string = `${environment.baseUrl}/users/login`;

  constructor(private http: HttpClient) { }

  /*
  Retrieves the currently logged user from localStorage, if such a user exists,
  and returns it as a User object. If there is not user logged in, returns
  null.
  */
  public get currentUserValue(): User {
    let currentUser = localStorage.getItem('currentUser');
    if (currentUser) {
      return new User(JSON.parse(currentUser));
    }
    return null;
  };

  /*
  Takes login data as input (which contains user id, and password), and makes
  a POST request to the login API. If login data was valid, then a token is
  recieved, and the user requested for log in is returned. If login data was
  invalid, then logs an error.

  @param loginData: object that has userID and userPassword, which will be
  validated against login API.
  */
  login = (loginData: any) => {
    let params = {
      user: loginData
    };
    let currUser;
    return this.http.post<any>(this.baseUrl, params)
      .pipe(map(user => {
          if (user && user.token) {
            currUser = new User(user.data);
            localStorage.setItem('currentUser', JSON.stringify(currUser));
            return currUser;
          } else {
            console.log('error on login', user);
          }
      }));
  }

  /*
  Removes current user object from localStorage, effectively logging out
  the user.
  */
  logout() {
    localStorage.removeItem('currentUser');
  }

}
