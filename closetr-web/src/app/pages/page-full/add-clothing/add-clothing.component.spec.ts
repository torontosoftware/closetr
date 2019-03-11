import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { RoutesService } from '../../../services/routes.service';
import { AuthenticationService } from '../../../services/authentication.service';
import { UiBackButtonComponent } from '../../../shared/ui-back-button/ui-back-button.component';
import { UiTextButtonComponent } from '../../../shared/ui-text-button/ui-text-button.component';
import { UiInputComponent } from '../../../shared/ui-input/ui-input.component';
import { UiInputSelectComponent } from '../../../shared/ui-input-select/ui-input-select.component';
import { Clothing } from '../../../models/clothing.model';
import { AddClothingComponent } from './add-clothing.component';

@Component({
  selector: 'app-login',
  template: '<p>Mock Login Component</p>'
})
class MockLoginComponent {}

@Component({
  selector: 'app-closet-manage',
  template: '<p>Mock Closet Manage Component</p>'
})
class MockClosetManageComponent {}

@Component({
  selector: 'app-log-outfit',
  template: '<p>Mock Log Outfit Component</p>'
})
class MockLogOutfitComponent {}

@Injectable({
  providedIn: 'root'
})
class AuthenticationServiceMock {
  currentUser = of('fides');
}

@Injectable({
  providedIn: 'root'
})
class RoutesServiceMock {
  getPrevUrl(): {
    return '/log-outfit';
  };
  setPrevUrl(): { }
}

describe('AddClothingComponent', () => {
  let component: AddClothingComponent;
  let fixture: ComponentFixture<AddClothingComponent>;
  let authenticationService: AuthenticationServiceMock;
  let router: Router;
  let routerSpy;
  let hostElement;

  const routes = [
    { path: 'login', component: MockLoginComponent },
    { path: 'closet-manage', component: MockClosetManageComponent },
    { path: 'log-outfit', component: MockLogOutfitComponent }
  ];

  beforeEach(() => {
    const clothingMock = {
      clothingName: "",
      clothingWorn: 0,
      clothingCost: 0,
      clothingCategory: "Top",
      clothingPurchaseDate: "01/01/2019",
      enableClothingSave: () => true
    };
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes(routes),
        FormsModule,
        HttpClientTestingModule,
        RouterTestingModule,
      ],
      declarations: [
        MockLoginComponent,
        MockClosetManageComponent,
        MockLogOutfitComponent,
        AddClothingComponent,
        UiBackButtonComponent,
        UiTextButtonComponent,
        UiInputComponent,
        UiInputSelectComponent,
      ],
      providers: [
        AddClothingComponent,
        { provide: Clothing, useValue: clothingMock },
        { provide: RoutesService, useClass: RoutesServiceMock },
        { provide: AuthenticationService, useClass: AuthenticationServiceMock }
      ]
    });
    fixture = TestBed.createComponent(AddClothingComponent);
    component = TestBed.get(AddClothingComponent);
    authenticationService = TestBed.get(AuthenticationService);
    component.clothing = TestBed.get(Clothing);
    router = TestBed.get(Router);
    routerSpy = spyOn(router, "navigate");
    hostElement = fixture.nativeElement;
    fixture.detectChanges();
  });

  describe('when no user is logged in', () => {
    it('should redirect to login page.', () => {
    });
  });

  describe('for prevUrl,', () => {
    it(`should retrieve the prevUrl as log-outfit
      if the previous component was log outfit`, () => {

    });

    it(`should retrieve the prevUrl as closet-manage
      if the previous component was closet manage`, () => {

    });

    it(`should set the prevUrl as closet-manage
      if there is no previous component`, () => {

    });
  });



  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
