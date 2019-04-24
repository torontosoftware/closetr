import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController
 } from '@angular/common/http/testing';
import { AuthenticationService } from './authentication.service';
import {
   mockUserOne
 } from '../../test/objects';

describe('AuthenticationService', () => {
  let httpTestingController: HttpTestingController;
  let authenticationService: AuthenticationService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ],
      providers: [ AuthenticationService ]
    });
    httpTestingController = TestBed.get(HttpTestingController);
    authenticationService = TestBed.get(AuthenticationService);
  });

  afterEach(() => {
    localStorage.setItem('currentUser', JSON.stringify(mockUserOne));
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
      currentUserValueTest(mockUserOne);
    });
    it(`should return null if there is no currentUser object
      in localStorage.`, () => {
      currentUserValueTest(null);
    });
  });
});
