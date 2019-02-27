import { async, ComponentFixture, TestBed, fakeAsync, tick} from '@angular/core/testing';
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
  public currentUserValue = "fides";
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
        LoginComponent,
        { provide: AuthenticationService, useClass: AuthenticationServiceMock }
      ]
    });
        //.compileComponents();
    fixture = TestBed.createComponent(LoginComponent);
    component = TestBed.get(LoginComponent);
    authenticationService = TestBed.get(AuthenticationService);
    router = TestBed.get(Router);
    location = TestBed.get(Location);
  });

  it('should create.', () => {
    expect(component).toBeTruthy();
  });

  it('should redirect to dashboard if logged in.', () => {
    let navSpy = spyOn(router, "navigate");
    fixture.detectChanges();
    expect(navSpy).toHaveBeenCalledWith(['/dashboard']);
  });

  it('should not redirect to dashboard if not logged in.', () => {
    let navSpy = spyOn(router, "navigate");
    authenticationService.currentUserValue = null;
    fixture.detectChanges();
    expect(navSpy).not.toHaveBeenCalledWith(['/dashboard']);
  });

  it(`should not allow login button to be clicked when both
    fields empty.`, () => {

  });

  it(`should not allow login button to be clicked when
    username field is empty, yet password field is filled.`, () => {

  });

  it(`should not allow login button to be clicked when
    password field is empty, yet username field is filled.`, () => {

  });

  it(`should allow login button to be clicked when both
    fields are filled.`, () => {

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
