import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController
 } from '@angular/common/http/testing';
import { HttpClient, HttpParams } from '@angular/common/http';
import { AuthenticationService } from './authentication.service';
import { environment } from '../../environments/environment';
import {
   mockUserTwo,
   mockUserCallbackWithToken,
   mockLoginData
 } from '../../test/objects';
 import {
   httpTestHelper
 } from '../../test/utils';

describe('AuthenticationService', () => {
  let httpTestingController: HttpTestingController;
  let authenticationService: AuthenticationService;

  const baseUrl = `${environment.baseUrl}/users/login`;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ],
      providers: [ AuthenticationService ]
    });
    httpTestingController = TestBed.get(HttpTestingController);
    authenticationService = TestBed.get(AuthenticationService);
  });

  afterEach(() => {
    localStorage.setItem('currentUser', JSON.stringify(mockUserTwo));
  });

  it(`should be created`, () => {
    expect(authenticationService).toBeTruthy();
  });

  describe(`getting currentUserValue,`, () => {
    const currentUserValueTest = (mockUser) => {
      if (mockUser) {
        localStorage.setItem('currentUser', JSON.stringify(mockUser));
      } else {
        localStorage.removeItem('currentUser');
      }
      const currentUserValue = authenticationService.currentUserValue;
      expect(currentUserValue).toEqual(mockUser);
    };
    it(`should return new User cast object from localStorage
      using 'currentUser' key, if the a user exists.`, () => {
      currentUserValueTest(mockUserTwo);
    });
    it(`should return null if there is no currentUser object
      in localStorage.`, () => {
      currentUserValueTest(null);
    });
  });

  describe(`calling login() should make a POST request,`, () => {
    let httpTestHelperController = (subject, subjectFlush) =>
      httpTestHelper(httpTestingController)(
        authenticationService.login,
        subject,
        baseUrl,
        'POST',
        mockLoginData,
        subjectFlush
      );
    it(`and should return a user if callback data is valid.`, () => {
      httpTestHelperController(mockUserTwo, mockUserCallbackWithToken);
    });

    it(`and should return undefined if callback data is invalid.`, () => {
      httpTestHelperController(undefined, null);
    });
  });
});
