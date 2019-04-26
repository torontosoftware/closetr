import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user.model';
import { environment } from '../../environments/environment';
import {
  httpPostHandlerDefault
} from './utils/utils';

/*
Service for handling user creation, modification and related functions.

baseUrl: base route for apis that handle user modification requests.
*/
@Injectable({
  providedIn: 'root'
})
export class UserService {
  baseUrl: string = `${environment.baseUrl}/users`;

  constructor(private http: HttpClient) { }

  /*
  Helper function for creating http POST requests for both register and
  update request types. Util function httpPostHandlerDefault is reponsible
  for sending http POST request with given parameters, handling callback
  data, and processing observable data.

  @param user: User object that is to be modified/created by the request.

  @param type: the request type, either 'register' or 'update'.
  */
  private helper = (user: User, type: string): Observable<any> =>
    httpPostHandlerDefault(this, `${this.baseUrl}/${type}`, {user: user});

  /*
  Takes User object, and uses helper function to register a new user with
  the provided credentials.

  @param user: User object specifying credentials for user to be created.
  */
  register = (user: User): Observable<any> => this.helper(user, 'register');

  /*
  Takes User object, and uses helper function to update an existing user
  with the provided credentials.

  @param user: User object specifying updated details about a user that is
  to be updated.
  */
  update = (user: User): Observable<any> => this.helper(user, 'update');

}
