import { TestBed, async, inject } from '@angular/core/testing';
import { AuthGuard } from './auth.guard';
import { Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

class MockRouter {
  navigate = jasmine.createSpy('navigate');
}

describe('AuthGuard', () => {
  beforeEach(() => {
    const mockRouter = new MockRouter();
    TestBed.configureTestingModule({
      providers: [
        {provide: Router, useClass: MockRouter},
        AuthGuard,
        AuthenticationService,
        HttpClientTestingModule
      ]
    });
  });

  it('should ...', inject([
    AuthGuard,
    AuthenticationService,
    Router],
    (guard: AuthGuard) => {
    expect(guard).toBeTruthy();
  }));
});
