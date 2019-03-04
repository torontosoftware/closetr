import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Injectable, Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthenticationService } from '../../../services/authentication.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { UiInputComponent } from '../../../shared/ui-input/ui-input.component';
import { UiTextButtonComponent } from '../../../shared/ui-text-button/ui-text-button.component';
import { RegisterComponent } from './register.component';


@Injectable({
  providedIn: 'root'
})
class AuthenticationServiceMock {
  currentUserValue = null;
}

@Component({
  selector: 'app-login',
  template: '<p>Mock Login Component</p>'
})
class MockLoginComponent {}

@Component({
  selector: 'app-dashboard',
  template: '<p>Mock Dashboard Component</p>'
})
class MockDashboardComponent {}

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let authenticationService: AuthenticationServiceMock;
  let fixture: ComponentFixture<RegisterComponent>;
  let router: Router;
  let routerSpy;
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
        FormsModule
      ],
      declarations: [
        UiInputComponent,
        UiTextButtonComponent,
        RegisterComponent,
        MockLoginComponent,
        MockDashboardComponent
      ],
      providers: [
        RegisterComponent,
        { provide: AuthenticationService, useClass: AuthenticationServiceMock }
      ]
    });

    fixture = TestBed.createComponent(RegisterComponent);
    component = TestBed.get(RegisterComponent);
    authenticationService = TestBed.get(AuthenticationService);
    router = TestBed.get(Router);
    routerSpy = spyOn(router, "navigate");
    hostElement = fixture.nativeElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('when there is a user logged in,', () => {
    it('should redirect to dashboard.', () => {
      authenticationService.currentUserValue = 'fides';
      component.ngOnInit();
      fixture.detectChanges();
      console.log(component);
      expect(routerSpy).toHaveBeenCalledWith(['/dashboard']);
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

    it('should not redirect to dashboard', () => {
      component.ngOnInit();
      fixture.detectChanges();
      expect(routerSpy).not.toHaveBeenCalledWith(['/dashboard']);
    });

    it('should navigate to login page when `login` button is clicked', () => {
      component.ngOnInit();
      loginButton.click();
      fixture.detectChanges();
      expect(routerSpy).toHaveBeenCalledWith(['/login']);
    });

    it('should have all fields empty on load.', () => {
      component.ngOnInit();
      fixture.detectChanges();
      expect(nameInput.value).toEqual('');
      expect(usernameInput.value).toEqual('');
      expect(passwordInput.value).toEqual('');
      expect(passwordConfirmInput.value).toEqual('');
    });

    it('should have no errors on load.', () => {
      component.ngOnInit();
      fixture.detectChanges();
      expect(nameInputErrorLabel.hidden).toBeTruthy();
      expect(usernameInputErrorLabel.hidden).toBeTruthy();
      expect(passwordInputErrorLabel.hidden).toBeTruthy();
      expect(passwordConfirmInputErrorLabel.hidden).toBeTruthy();
    });

    it('should disable register button on load.', () => {
      component.ngOnInit();
      fixture.detectChanges();
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
            usernameInput.value = "username";
            usernameInput.dispatchEvent(new Event('input'));
            fixture.detectChanges();
          });
          it('and no other fields are.', () => {
            expect(nameInputErrorLabel.hidden).toBeFalsy();
          });
          describe('and password input is filled', () => {
            beforeEach(() => {
              passwordInput.value = "password";
              passwordInput.dispatchEvent(new Event('input'));
              fixture.detectChanges();
            });
            it('and no other fields are.', () => {
              expect(nameInputErrorLabel.hidden).toBeFalsy();
            });
            it('and password confirm input field is filled.', () => {
              passwordConfirmInput.value = "password confirm";
              passwordConfirmInput.dispatchEvent(new Event('input'));
              fixture.detectChanges();
              expect(nameInputErrorLabel.hidden).toBeFalsy();
            });
          })
        });
      });

      describe(`should display error on username input field when
        username input field is empty but`, () => {
          describe('password input field is filled,', () => {
            beforeEach(() => {
              passwordInput.value = "password";
              passwordInput.dispatchEvent(new Event('input'));
              fixture.detectChanges();
            });
            it(`and no other fields (after username) are.`, () => {
              expect(usernameInputErrorLabel.hidden).toBeFalsy();
            });
            it('and password confirm input field is filled.', () => {
              passwordConfirmInput.value = "password confirm";
              passwordConfirmInput.dispatchEvent(new Event('input'));
              fixture.detectChanges();
              expect(usernameInputErrorLabel.hidden).toBeFalsy();
            });
          });
      });

      describe(`should display error on password input field when
        password input field is empty but`, () => {
          it('password confirm input field is filled.', () => {
            passwordConfirmInput.value = "password confirm";
            passwordConfirmInput.dispatchEvent(new Event('input'));
            fixture.detectChanges();
            console.log(component,hostElement,"yuh");
            expect(passwordInputErrorLabel.hidden).toBeFalsy();
          });
      });

      describe('should display error on password confirm input field when', () => {
        it(`password confirm field is filled and not the same
          as password field,`, () => {
            passwordConfirmInput.value = "password confirm";
            passwordConfirmInput.dispatchEvent(new Event('input'));
            passwordInput.value = "password";
            passwordInput.dispatchEvent(new Event('input'));
            fixture.detectChanges();
            expect(passwordConfirmInputErrorLabel.hidden).toBeFalsy();
          });
      });

      describe('should not display error on any input fields when', () => {
        beforeEach(() => {
          nameInput.value = "name";
          nameInput.dispatchEvent(new Event('input'));
          fixture.detectChanges();
        })
        afterEach(() => {
          expect(nameInputErrorLabel.hidden).toBeTruthy();
          expect(usernameInputErrorLabel.hidden).toBeTruthy();
          expect(passwordInputErrorLabel.hidden).toBeTruthy();
          expect(passwordConfirmInputErrorLabel.hidden).toBeTruthy();
        });
        describe('name field is filled,', () => {
          it('and no other fields.', () => {});
          describe('and username field is filled,', () => {
            it('and no other fields.', () => {});
            describe('and password field is filled,', () => {
              it('and no other fields.', () => {});
              it('and password confirm field is filled.', () => {});
            });
          });
        });
      });
    });



  });

  /*
  test: redirect to dashboard if logged in

  test: don't redirect to dashboard if not logged in

  test: clicking on 'log in' navigates to login component

  test: all fields empty on initial load

  test: no errors shown on initial load

  test: sign up button disabled on initial load

  form validation tests...

  test: type value in 'name' field, should show no errors,
  and should leave button disabled.

  test: type value in 'username' field, same as above
  */

});
