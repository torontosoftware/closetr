import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';
import { UserService } from './user.service';
import { environment } from '../../environments/environment';
import {
  httpTestHelper
} from '../../test/utils';
import {
  mockUserTwo
} from '../../test/objects';

describe('UserService', () => {
  let httpTestingController: HttpTestingController;
  let userService: UserService;

  const baseUrl = `${environment.baseUrl}/users`;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ],
      providers: [ UserService ]
    });
    httpTestingController = TestBed.get(HttpTestingController);
    userService = TestBed.get(UserService);
  });

  it('should be created', () => {
    expect(userService).toBeTruthy();
  });

  describe(`when creating http requests,`, () => {
    let httpTestHelperController;
    beforeEach(() => {
      httpTestHelperController = httpTestHelper(httpTestingController);
    });
    it(`calling register() should make a POST request.`, () => {
      httpTestHelperController(
        userService.register,
        {auth: true},
        `${baseUrl}/register`,
        'POST'
      );
    });
    it(`calling update() should make a POST request.`, () => {
      httpTestHelperController(
        userService.update,
        mockUserTwo,
        `${baseUrl}/update`,
        'POST'
      );
    });
  });

});
