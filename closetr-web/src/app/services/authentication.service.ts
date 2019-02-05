import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user.model';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  baseUrl: string;
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;

  constructor(private http: HttpClient) {
    this.baseUrl = 'http://localhost:8080/';
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  login(loginData: any) {
    var params = {
      user: loginData
    };
    var currUser;

    return this.http.post<any>(this.baseUrl + 'api/users/login', params)
      .pipe(map(user => {
          var currUser = new User(user.data);
          if (currUser && currUser.token) {
            localStorage.setItem('currentUser', JSON.stringify(currUser));
            this.currentUserSubject.next(currUser);
          }
          return currUser;
      }));
  }

  logout() {
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }

}
