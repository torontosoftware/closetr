import { async, ComponentFixture, TestBed} from '@angular/core/testing';
import { Injectable, Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
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
  const routes = [
    { path: 'dashboard', component: MockDashboardComponent }
  ];
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
    console.log("howdy", component);
    //component = TestBed.get(LoginComponent);
    authenticationService = TestBed.get(AuthenticationService);
  });
  /*
  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });*/

  /*
  it('should create', () => {
    expect(component).toBeTruthy();
  });*/

  it('should redirect to dashboard if logged in', () => {
    console.log("starting first case", component);
    authenticationService.currentUserValue = "yes";
    fixture.detectChanges();
    //expect(component.router.url).toEqual('/dashboard');
  });

  it('should not redirect to dashboard if not logged in', () => {
    console.log("starting second case");
    authenticationService.currentUserValue = 0;
    console.log(component,"should not redirect to dashboard");
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should redirect to dashboard', () => {
    console.log("starting third case",component);
    authenticationService.currentUserValue = "pls";
    console.log(component,"third: should not redirect to dashboard");
    fixture.detectChanges();
    //fixture.detectChanges();
    expect(component).toBeTruthy();
  });

});
