import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { Location } from '@angular/common';
import { Injectable } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthenticationService } from '../../../services/authentication.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { UiInputComponent } from '../../../shared/ui-input/ui-input.component';
import { UiTextButtonComponent } from '../../../shared/ui-text-button/ui-text-button.component';
import { LoginComponent } from './login.component';
import {
  MockDashboardComponent
} from '../../../../test/components';

@Injectable({
  providedIn: 'root'
})
class AuthenticationServiceMock {
  currentUserValue = null;
  login = jasmine.createSpy('authenticationService.login').and.returnValue(
    of(true)
  );
}

describe('LoginComponent', () => {
  let component: LoginComponent;
  let authenticationService: AuthenticationServiceMock;
  let fixture: ComponentFixture<LoginComponent>;
  let location: Location;
  let router: Router;
  let hostElement;
  let loginButton: any;
  let errorLabel: HTMLInputElement;
  let usernameInput: HTMLInputElement;
  let passwordInput: HTMLInputElement;
  let navSpy;

  const routes = [
    { path: 'dashboard', component: MockDashboardComponent }
  ];
  const routerSpy = jasmine.createSpyObj('Router', ['navigateByUrl']);
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule,
        RouterTestingModule.withRoutes(routes),
        HttpClientTestingModule
      ],
      declarations: [
        MockDashboardComponent,
        UiInputComponent,
        UiTextButtonComponent,
        LoginComponent
      ],
      providers: [
        Location,
        LoginComponent,
        { provide: AuthenticationService, useClass: AuthenticationServiceMock }
      ]
    });
    fixture = TestBed.createComponent(LoginComponent);
    component = TestBed.get(LoginComponent);
    authenticationService = TestBed.get(AuthenticationService);
    router = TestBed.get(Router);
    navSpy = spyOn(router, "navigate");
    fixture.detectChanges();
    hostElement = fixture.nativeElement;
    errorLabel = hostElement.querySelector('#password-input .input-clean-error-label');
    loginButton = hostElement.querySelector('#login-button button');
    usernameInput = hostElement.querySelector('#username-input input');
    passwordInput = hostElement.querySelector('#password-input input');
    fixture.detectChanges();
  });

  describe('when there is a user logged in', () => {
    it('should redirect to dashboard.', () => {
      authenticationService.currentUserValue = "fides";
      component.ngOnInit();
      fixture.detectChanges();
      expect(navSpy).toHaveBeenCalledWith(['/dashboard']);
    });
  });

  describe('when there is no user logged in,', () => {
    it('should not redirect to dashboard.', () => {
      fixture.detectChanges();
      component.ngOnInit();
      expect(navSpy).not.toHaveBeenCalledWith(['/dashboard']);
    });

    describe('when user attempts to click "log in" button,', () => {
      describe('should be disabled when,', () => {
        it('both fields are empty.', () => {
          component.ngOnInit();
          fixture.detectChanges();
          expect(loginButton.disabled).toBeTruthy();
        });
        it('username field is empty, yet password field is filled.', () => {
          component.ngOnInit();
          usernameInput.value = 'input';
          usernameInput.dispatchEvent(new Event('input'));
          fixture.detectChanges();
          expect(loginButton.disabled).toBeTruthy();
        });
        it(`password field is empty, yet username field is filled.`, () => {
          component.ngOnInit();
          passwordInput.value = 'input';
          passwordInput.dispatchEvent(new Event('input'));
          fixture.detectChanges();
          expect(loginButton.disabled).toBeTruthy();
        });
      });

      describe('and both fields are filled,', () => {
        beforeEach(() => {
          authenticationService.login = jasmine.createSpy('authenticationService.login').and.returnValue(
            of(false)
          );
          component.ngOnInit();
          usernameInput.value = 'input';
          usernameInput.dispatchEvent(new Event('input'));
          passwordInput.value = 'input';
          passwordInput.dispatchEvent(new Event('input'));
          fixture.detectChanges();
        });

        it(`should allow login button to be clicked.`, () => {
          expect(loginButton.disabled).toBeFalsy();
        });

        it(`should call the authentication service's login function
          upon clicking the the login button.`, () => {
          let loginData = {
            userID: 'input',
            userPassword: 'input'
          };
          loginButton.click();
          fixture.detectChanges();
          expect(authenticationService.login).toHaveBeenCalledWith(loginData);
        });

        describe('with incorrect credentials', () => {
          beforeEach(() => {
            loginButton.click();
            fixture.detectChanges();
          });

          it(`should display an error message.`, () => {
            expect(navSpy).not.toHaveBeenCalledWith(['/dashboard']);
            expect(errorLabel.hidden).toBeFalsy();
          });

          it(`should display an error message, which disappears
            when user types new value.`, () => {
            usernameInput.value = 'new input';
            usernameInput.dispatchEvent(new Event('input'));
            fixture.detectChanges();
            expect(errorLabel.hidden).toBeTruthy();
          });
        });

        describe('with correct credentials,', () => {
          it(`should redirect to dashboard when the authentication
            service returns success on login function.`, () => {
            authenticationService.login = jasmine.createSpy('authenticationService.login').and.returnValue(
              of(true)
            );
            loginButton.click();
            fixture.detectChanges();
            expect(navSpy).toHaveBeenCalledWith(['/dashboard']);
          });
        });

      });
    });
  });
});
