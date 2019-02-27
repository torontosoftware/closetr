import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Location } from '@angular/common';
import { Injectable, Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthenticationService } from '../../../services/authentication.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { UiInputComponent } from '../../../shared/ui-input/ui-input.component';
import { UiTextButtonComponent } from '../../../shared/ui-text-button/ui-text-button.component';
import { LoginComponent } from './login.component';

@Injectable({
  providedIn: 'root'
})
class AuthenticationServiceMock {
  public currentUserValue = null;
}

@Component({
  selector: 'app-dashboard',
  template: '<p>Mock Dashboard Component</p>'
})
class MockDashboardComponent {}

describe('LoginComponent', () => {
  let component: LoginComponent;
  let authenticationService: AuthenticationServiceMock;
  let fixture: ComponentFixture<LoginComponent>;
  let location: Location;
  let router: Router;
  let hostElement;
  let loginButton: any;
  let usernameInput: HTMLInputElement;
  let passwordInput: HTMLInputElement;

  const routes = [
    { path: 'dashboard', component: MockDashboardComponent }
  ];
  const routerSpy = jasmine.createSpyObj('Router',['navigateByUrl']);
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
    //.compileComponents();
    fixture = TestBed.createComponent(LoginComponent);
    component = TestBed.get(LoginComponent);
    //component = TestBed.get(LoginComponent);
    authenticationService = TestBed.get(AuthenticationService);
    router = TestBed.get(Router);

    fixture.detectChanges();
    hostElement = fixture.nativeElement;
    loginButton = hostElement.querySelector('#login-button button');
    usernameInput = hostElement.querySelector('#username-input input');
    passwordInput = hostElement.querySelector('#password-input input');
    fixture.detectChanges();
  });

  it('should redirect to dashboard if logged in.', () => {
    let navSpy = spyOn(router, "navigate");
    authenticationService.currentUserValue = "fides";
    component.ngOnInit();
    fixture.detectChanges();
    expect(navSpy).toHaveBeenCalledWith(['/dashboard']);
  });

  it('should not redirect to dashboard if not logged in.', () => {
    let navSpy = spyOn(router, "navigate");
    fixture.detectChanges();
    component.ngOnInit();
    expect(navSpy).not.toHaveBeenCalledWith(['/dashboard']);
  });

  it(`should not allow login button to be clicked when both
    fields empty.`, () => {
    component.ngOnInit();
    fixture.detectChanges();
    expect(loginButton.disabled).toBeTruthy();
  });

  it(`should not allow login button to be clicked when
    username field is empty, yet password field is filled.`, () => {
    component.ngOnInit();
    usernameInput.value = 'input';
    usernameInput.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    expect(loginButton.disabled).toBeTruthy();
  });

  it(`should not allow login button to be clicked when
    password field is empty, yet username field is filled.`, () => {
    component.ngOnInit();
    passwordInput.value = 'input';
    passwordInput.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    expect(loginButton.disabled).toBeTruthy();
  });

  it(`should allow login button to be clicked when both
    fields are filled.`, () => {
    component.ngOnInit();
    usernameInput.value = 'input';
    usernameInput.dispatchEvent(new Event('input'));
    passwordInput.value = 'input';
    passwordInput.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    expect(loginButton.disabled).toBeFalsy();
  });

  it(`should call the authentication service's login function
    upon clicking the the login button.`, () => {

  });

  it(`should display an error message when the authentication
    service returns error on login function.`, () => {

  });

  it(`should redirect to dashboard when the authentication
    service returns success on login function.`, () => {

  });

});
