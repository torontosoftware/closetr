import { TestBed, async, inject } from '@angular/core/testing';
import { AuthGuard } from './auth.guard';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthenticationService } from '../services/authentication.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';


describe('AuthGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule
      ],
      providers: [
        AuthGuard,
        AuthenticationService,
      ]
    });
  });

  it('should ...', inject([ AuthGuard ],
    (guard: AuthGuard) => {
    expect(guard).toBeTruthy();
  }));
});
