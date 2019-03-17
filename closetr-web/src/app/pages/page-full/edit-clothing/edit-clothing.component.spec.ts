import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { Component, OnInit, Injectable } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { ClosetService } from '../../../services/closet.service';
import { AuthenticationService } from '../../../services/authentication.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { UiBackButtonComponent } from '../../../shared/ui-back-button/ui-back-button.component';
import { UiTextButtonComponent } from '../../../shared/ui-text-button/ui-text-button.component';
import { UiInputComponent } from '../../../shared/ui-input/ui-input.component';
import { UiInputSelectComponent } from '../../../shared/ui-input-select/ui-input-select.component';
import { Clothing } from '../../../models/clothing.model';
import { User } from '../../../models/user.model';
import { EditClothingComponent } from './edit-clothing.component';

const clothingForEdit = new Clothing({
  clothingName: "Zara Mockneck Tee",
  clothingWorn: 4,
  clothingCost: 10,
  clothingCategory: "Top",
  clothingPurchaseDate: "2019-02-03"
});

@Component({
  selector: 'app-closet-manage',
  template: '<p>Mock Closet Manage Component</p>'
})
class MockClosetManageComponent {}

@Injectable({
  providedIn: 'root'
})
class ClosetServiceMock {
  getClothingForEdit = () => clothingForEdit;
}

@Injectable({
  providedIn: 'root'
})
class AuthenticationServiceMock {
  currentUser = of(new User({userID: 'fideslinga'}));
}

describe('EditClothingComponent', () => {
  let component: EditClothingComponent;
  let fixture: ComponentFixture<EditClothingComponent>;
  let authenticationService: AuthenticationServiceMock;
  let closetService: ClosetServiceMock;

  const routes = [
    { path: 'closet-manage', component: MockClosetManageComponent }
  ];

  beforeEach(async(() => {

    TestBed.configureTestingModule({
      imports: [
        FormsModule,
        RouterTestingModule.withRoutes(routes),
        HttpClientTestingModule
      ],
      declarations: [
        UiBackButtonComponent,
        UiTextButtonComponent,
        UiInputComponent,
        UiInputSelectComponent,
        EditClothingComponent,
        MockClosetManageComponent
      ],
      providers: [
        EditClothingComponent,
        { provide: ClosetService, useClass: ClosetServiceMock },
        { provide: AuthenticationService, useClass: AuthenticationServiceMock }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditClothingComponent);
    component = fixture.debugElement.componentInstance;
    authenticationService = TestBed.get(AuthenticationService);
    closetService = TestBed.get(ClosetService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe(`from the init method`, () => {
    it(`should call closetService's getClothingForEdit method.`, () => {

    });
    it(`should navigate to closet manage page is there is no
      clothing for edit.`, () => {

    });
    it(`should set the clothing variable with the returned data
      (if it exists).`, () => {

    });
    it(`should retrieve the current user from the authentication
      service.`, () => {

    });
    it(`should retrieve clothing categories from clothing model,
      and render the options in the category selector.`, () => {

    });
    it(`should render the clothing object on all fields properly.`, () => {

    });
    it(`should have the save button enabled.`, () => {

    });
  });
});
