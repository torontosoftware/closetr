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
    it('should not redirect to dashboard', () => {
      component.ngOnInit();
      fixture.detectChanges();
      expect(routerSpy).not.toHaveBeenCalledWith(['/dashboard']);
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
