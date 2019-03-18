import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, Injectable } from '@angular/core';
import { of } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AuthenticationService } from '../../../services/authentication.service';
import { UserService } from '../../../services/user.service';
import { UiBackButtonComponent } from '../../../shared/ui-back-button/ui-back-button.component';
import { UiEditButtonComponent } from '../../../shared/ui-edit-button/ui-edit-button.component';
import { UiTextButtonComponent } from '../../../shared/ui-text-button/ui-text-button.component';
import { UiInputComponent } from '../../../shared/ui-input/ui-input.component';
import { User } from '../../../models/user.model';
import { ProfileComponent } from './profile.component';

const currentUser = new User({
  userID: 'fideslinga',
  userName: 'Fides Linga',
  userDesc: 'description',
  userPassword: 'password'
});

const updatedUser = new User({
  userID: 'fideslinga',
  userName: 'Fidessa Linga',
  userDesc: 'a big chungus',
  userPassword: 'password'
});

@Component({
  selector: 'app-dashboard',
  template: '<p>Mock Dashboard Component'
})
class MockDashboardComponent { }

@Injectable({
  providedIn: 'root'
})
class AuthenticationServiceMock {
  currentUser = of(currentUser);
}

@Injectable({
  providedIn: 'root'
})
class UserServiceMock {
  update = (user) => of({data: updatedUser});
}

describe('ProfileComponent', () => {
  let component: ProfileComponent;
  let fixture: ComponentFixture<ProfileComponent>;
  let hostElement;
  let saveButton;
  let editButton;
  let usernameInput: HTMLInputElement;
  let nameInput: HTMLInputElement;
  let descriptionInput: HTMLInputElement;
  let passwordInput: HTMLInputElement;

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
        UiBackButtonComponent,
        UiEditButtonComponent,
        UiTextButtonComponent,
        UiInputComponent,
        ProfileComponent
      ],
      providers: [
        ProfileComponent,
        { provide: UserService, useClass: UserServiceMock },
        { provide: AuthenticationService, useClass: AuthenticationServiceMock }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileComponent);
    component = fixture.componentInstance;
    hostElement = fixture.nativeElement;
    fixture.detectChanges();
    saveButton = hostElement.querySelector('#save-button button');
    editButton = hostElement.querySelector('#edit-button button');
    usernameInput = hostElement.querySelector('#username-input input');
    nameInput = hostElement.querySelector('#name-input input');
    descriptionInput = hostElement.querySelector('#description-input input');
    passwordInput = hostElement.querySelector('#password-input input');
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe(`from the init method`, () => {
    beforeEach(() => {
      component.ngOnInit();
      fixture.detectChanges();
    })
    it(`should retrieve the current user from
      authentication service.`, () => {
      expect(component.currentUser).toEqual(currentUser);
    });
    it(`should have editMode as false initially.`, () => {
      expect(component.editMode).toBeFalsy();
    });
    it(`should populate the form fields properly.`, () => {
      fixture.whenStable().then(() => {
        expect(usernameInput.value).toEqual(currentUser.userID);
        expect(nameInput.value).toEqual(currentUser.userName);
        expect(descriptionInput.value).toEqual(currentUser.userDesc);
        expect(passwordInput.value).toEqual(currentUser.userPassword);
      });
    });
    it(`should have all fields disabled.`, () => {
      fixture.whenStable().then(() => {
        expect(usernameInput.disabled).toBeTruthy();
        expect(nameInput.disabled).toBeTruthy();
        expect(descriptionInput.disabled).toBeTruthy();
        expect(passwordInput.disabled).toBeTruthy();
      });
    });
  });

});
