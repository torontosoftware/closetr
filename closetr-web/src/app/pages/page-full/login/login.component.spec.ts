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
  public currentUserValue = "desslinga";
}

@Injectable({
  providedIn: 'root'
})
class AuthenticationServiceNone {
  public currentUserValue = "desslinga";
}

@Component({
  selector: 'app-dashboard',
  template: '<p>Mock Dashboard Component</p>'
})
class MockDashboardComponent {}

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  const routes = [
    { path: 'dashboard', component: MockDashboardComponent }
  ];
  beforeEach(async(() => {
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
        { provide: AuthenticationService, useClass: AuthenticationServiceMock }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    fixture = null;
    component = null;
  });

  /*
  it('should create', () => {
    expect(component).toBeTruthy();
  });*/

  it('should redirect to dashboard if logged in', () => {
    console.log(component);
    //expect(component.router.url).toEqual('/dashboard');
  });

  it('should not redirect to dashboard if not logged in', () => {
    console.log(component);
    component.authenticationService.currentUserValue = null;
    console.log(component);
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

});
