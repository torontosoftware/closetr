import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { Injectable } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { SharedModule } from '../../../shared/shared.module';
import { UserService } from '../../../services/user.service';
import { AuthenticationService } from '../../../services/authentication.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RegisterComponent } from './register.component';
import {
  MockLoginComponent,
  MockDashboardComponent,
} from '../../../../test/components';
import {
  UserServiceMock,
  AuthenticationServiceNoUserMock
} from '../../../../test/services';
import {
  inputDispatch,
  multTestCompare,
  multInputDispatchAndChange,
  clickAndTestNavigate
} from '../../../../test/utils';
import {
  loggedUserRedirectDashboard,
  userNotRedirectDashboard
} from '../../../../test/common-tests';

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let authenticationService: AuthenticationServiceNoUserMock;
  let userService: UserServiceMock;
  let fixture: ComponentFixture<RegisterComponent>;
  let router: Router;
  let hostElement;

  const routes = [
    { path: 'login', component: MockLoginComponent },
    { path: 'dashboard', component: MockDashboardComponent }
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes(routes),
        HttpClientTestingModule,
        FormsModule,
        SharedModule
      ],
      declarations: [
        RegisterComponent,
        MockLoginComponent,
        MockDashboardComponent
      ],
      providers: [
        RegisterComponent,
        { provide: AuthenticationService, useClass: AuthenticationServiceNoUserMock },
        { provide: UserService, useClass: UserServiceMock }
      ]
    });
    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.debugElement.componentInstance;
    authenticationService = TestBed.get(AuthenticationService);
    userService = TestBed.get(UserService);
    router = TestBed.get(Router);
    spyOn(router, "navigate");
    spyOn(userService, 'register').and.callThrough();
    hostElement = fixture.nativeElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('when there is a user logged in,', () => {
    it('should redirect to dashboard.', () => {
      loggedUserRedirectDashboard(authenticationService, component, fixture, router);
    });
  });

  describe('when there is no user logged in,', () => {
    let registerButton: any;
    let loginButton: any;
    let nameInput: HTMLInputElement;
    let usernameInput: HTMLInputElement;
    let passwordInput: HTMLInputElement;
    let passwordConfirmInput: HTMLInputElement;
    let nameInputErrorLabel: HTMLElement;
    let usernameInputErrorLabel: HTMLElement;
    let passwordInputErrorLabel: HTMLElement;
    let passwordConfirmInputErrorLabel: HTMLElement;

    beforeEach(() => {
      registerButton = hostElement.querySelector('#register-button button');
      loginButton = hostElement.querySelector('#to-login-button button');
      nameInput = hostElement.querySelector('#name-input input');
      usernameInput = hostElement.querySelector('#username-input input');
      passwordInput = hostElement.querySelector('#password-input input');
      passwordConfirmInput = hostElement.querySelector('#password-confirm-input input');
      nameInputErrorLabel = hostElement.querySelector('#name-input .input-clean-error-label');
      usernameInputErrorLabel = hostElement.querySelector('#username-input .input-clean-error-label');
      passwordInputErrorLabel = hostElement.querySelector('#password-input .input-clean-error-label');
      passwordConfirmInputErrorLabel = hostElement.querySelector('#password-confirm-input .input-clean-error-label');
    });

    const passwordAndConfirmTest = () =>
    {
      describe('and password field is filled,', () => {
        beforeEach(() => {
          inputDispatch(passwordInput, 'password');
        })
        it('and password confirm field is filled.', () => {
          inputDispatch(passwordConfirmInput, 'password');
        });
        it('and no other fields.', () => {});
      });
    };

    it('should not redirect to dashboard', () => {
      userNotRedirectDashboard(router);
    });

    it('should navigate to login page when `login` button is clicked', () => {
      clickAndTestNavigate(loginButton, router, '/login', fixture);
    });

    it('should have all fields empty on load.', () => {
      multTestCompare([
        nameInput,
        usernameInput,
        passwordInput,
        passwordConfirmInput
      ], 'value', '');
    });

    it('should have no errors on load.', () => {
      multTestCompare([
        nameInputErrorLabel,
        usernameInputErrorLabel,
        passwordInputErrorLabel,
        passwordConfirmInputErrorLabel
      ], 'hidden', true);
    });

    it('should disable register button on load.', () => {
      expect(registerButton.disabled).toBeTruthy();
    });

    describe('and there is user input,', () => {
      beforeEach(() => {
        component.ngOnInit();
        fixture.detectChanges();
      });
      describe(`should display error on name input field when name input
        field is empty but`, () => {
        describe('username input field is filled,', () => {
          beforeEach(() => {
            inputDispatch(usernameInput, 'username');
            fixture.detectChanges();
          });
          afterEach(() => {
            fixture.detectChanges();
            expect(nameInputErrorLabel.hidden).toBeFalsy();
          });
          it('and no other fields are.', () => {});
          passwordAndConfirmTest();
        });
      });

      describe(`should display error on username input field when
        username input field is empty but`, () => {
          describe('password input field is filled,', () => {
            beforeEach(() => {
              inputDispatch(passwordInput, 'password');
              fixture.detectChanges();
            });
            afterEach(() => {
              fixture.detectChanges();
              expect(usernameInputErrorLabel.hidden).toBeFalsy();
            })
            it('and password confirm input field is filled.', () => {
              inputDispatch(passwordConfirmInput, 'password confirm');
            });
            it(`and no other fields (after username) are.`, () => {});
          });
      });

      describe(`should display error on password input field when
        password input field is empty but`, () => {
          it('password confirm input field is filled.', () => {
            inputDispatch(passwordConfirmInput, 'password confirm');
            fixture.detectChanges();
            expect(passwordInputErrorLabel.hidden).toBeFalsy();
          });
      });

      describe('should display error on password confirm input field when', () => {
        it(`password confirm field is filled and not the same
          as password field,`, () => {
            inputDispatch(passwordConfirmInput, 'password confirm');
            inputDispatch(passwordInput, 'password');
            fixture.detectChanges();
            expect(passwordConfirmInputErrorLabel.hidden).toBeFalsy();
          });
      });

      describe('should not display error on any input fields when', () => {
        afterEach(() => {
          fixture.detectChanges();
          multTestCompare([
            nameInputErrorLabel,
            usernameInputErrorLabel,
            passwordInputErrorLabel,
            passwordConfirmInputErrorLabel
          ], 'hidden', true);
        });
        describe('name field is filled,', () => {
          beforeEach(() => {
            inputDispatch(nameInput, 'name');
          })
          it('and no other fields.', () => {});
          describe('and username field is filled,', () => {
            beforeEach(() => {
              inputDispatch(usernameInput, 'username');
            })
            it('and no other fields.', () => {});
            passwordAndConfirmTest();
          });
        });
      });

      describe(`when all fields are filled, and password is the
        same as password confirm,`, () => {
        beforeEach(() => {
          multInputDispatchAndChange(
            [
              {input: nameInput, value: 'name'},
              {input: usernameInput, value: 'username'},
              {input: passwordInput, value: 'password'},
              {input: passwordConfirmInput, value: 'password'}
            ],
            fixture
          );
        });
        it('should enable the register button', () => {
          expect(registerButton.disabled).toBeFalsy();
        });
        describe('and register button is clicked', () => {
          it(`should call the user service's register function.`, () => {
            registerButton.click();
            fixture.detectChanges();
            expect(userService.register).toHaveBeenCalled();
          });
          describe('with username that is already registered', () => {
            beforeEach(() => {
              userService.register = () => of({auth: false});
              spyOn(userService, 'register').and.callThrough();
              inputDispatch(usernameInput, 'new fides');
              registerButton.click();
              fixture.detectChanges();
            });
            it('should not redirect to dashboard.', () => {
              expect(router.navigate).not.toHaveBeenCalledWith(['/dashboard']);
            });
            it('should show error on username.', () => {
              expect(usernameInputErrorLabel.hidden).toBeFalsy();
            });
          });
          describe('with username that has not been registered', () => {
            it('should redirect to dashboard component.', () => {
              userService.register = () => of({auth: true});
              clickAndTestNavigate(registerButton, router, '/dashboard', fixture);
              expect(usernameInputErrorLabel.hidden).toBeTruthy();
            });
          });
        });
      });
    });
  });
});
