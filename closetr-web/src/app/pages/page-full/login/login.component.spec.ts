import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { Location } from '@angular/common';
import { Injectable } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { SharedModule } from '../../../shared/shared.module';
import { AuthenticationService } from '../../../services/authentication.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { LoginComponent } from './login.component';
import {
  MockDashboardComponent
} from '../../../../test/components';
import {
  AuthenticationServiceNoUserMock
} from '../../../../test/services';
import {
  inputDispatch,
  multInputDispatchAndChange,
  clickAndTestNavigate
} from '../../../../test/utils';
import {
  loggedUserRedirectDashboard,
  userNotRedirectDashboard
} from '../../../../test/common-tests';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let authenticationService: AuthenticationServiceNoUserMock;
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
        HttpClientTestingModule,
        SharedModule
      ],
      declarations: [
        MockDashboardComponent,
        LoginComponent
      ],
      providers: [
        Location,
        LoginComponent,
        { provide: AuthenticationService, useClass: AuthenticationServiceNoUserMock }
      ]
    });
    fixture = TestBed.createComponent(LoginComponent);
    component = TestBed.get(LoginComponent);
    authenticationService = TestBed.get(AuthenticationService);
    router = TestBed.get(Router);
    spyOn(router, "navigate");
    spyOn(authenticationService, 'login').and.callThrough();
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
      loggedUserRedirectDashboard(authenticationService, component, fixture, router);
    });
  });

  describe('when there is no user logged in,', () => {
    it('should not redirect to dashboard.', () => {
      userNotRedirectDashboard(router);
    });

    describe('when user attempts to click "log in" button,', () => {
      describe('should be disabled when,', () => {
        afterEach(() => {
          expect(loginButton.disabled).toBeTruthy();
        })
        it('both fields are empty.', () => {});
        it('username field is empty, yet password field is filled.', () => {
          multInputDispatchAndChange(
            [{input: usernameInput, value: 'input'}],
            fixture
          );
        });
        it(`password field is empty, yet username field is filled.`, () => {
          multInputDispatchAndChange(
            [{input: passwordInput, value: 'input'}],
            fixture
          );
        });
      });

      describe('and both fields are filled,', () => {
        beforeEach(() => {
          multInputDispatchAndChange(
            [
              {input: usernameInput, value: 'input'},
              {input: passwordInput, value: 'input'}
            ],
            fixture
          );
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
            authenticationService.login = () => of(false);
            spyOn(authenticationService, 'login').and.returnValue(of(false));
            loginButton.click();
            fixture.detectChanges();
          });

          it(`should display an error message.`, () => {
            expect(router.navigate).not.toHaveBeenCalledWith(['/dashboard']);
            expect(errorLabel.hidden).toBeFalsy();
          });

          it(`should display an error message, which disappears
            when user types new value.`, () => {
            inputDispatch(usernameInput, 'new input');
            fixture.detectChanges();
            expect(errorLabel.hidden).toBeTruthy();
          });
        });

        describe('with correct credentials,', () => {
          it(`should redirect to dashboard when the authentication
            service returns success on login function.`, () => {
            clickAndTestNavigate(loginButton, router, '/dashboard', fixture);
          });
        });

      });
    });
  });
});
