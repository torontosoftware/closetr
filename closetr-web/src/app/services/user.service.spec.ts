import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';
import { UserService } from './user.service';
import { environment } from '../../environments/environment';

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
});
