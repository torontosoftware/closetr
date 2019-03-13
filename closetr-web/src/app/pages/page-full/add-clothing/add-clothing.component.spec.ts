import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { LogOutfitService } from '../../../services/log-outfit.service';
import { ClosetService } from '../../../services/closet.service';
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
  getPrevUrl = () => '/log-outfit';
  setPrevUrl = () => null;
}

@Injectable({
  providedIn: 'root'
})
class ClosetServiceMock {
  addClothing;
}

@Injectable({
  providedIn: 'root'
})
class LogOutfitServiceMock {
  addOutfitClothing;
}

describe('AddClothingComponent', () => {
  let component: AddClothingComponent;
  let fixture: ComponentFixture<AddClothingComponent>;
  let authenticationService: AuthenticationServiceMock;
  let routesService: RoutesServiceMock;
  let closetService: ClosetServiceMock;
  let logOutfitService: LogOutfitServiceMock;
  let router: Router;
  let hostElement;

  let clothingMock = new Clothing({
    clothingName: "yes",
    clothingWorn: 0,
    clothingCost: 0,
    clothingCategory: "Top",
    clothingPurchaseDate: "2019-01-02"
  });

  const routes = [
    { path: 'login', component: MockLoginComponent },
    { path: 'closet-manage', component: MockClosetManageComponent },
    { path: 'log-outfit', component: MockLogOutfitComponent }
  ];

  beforeEach(() => {
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
        { provide: LogOutfitService, useClass: LogOutfitServiceMock },
        { provide: ClosetService, useClass: ClosetServiceMock },
        { provide: RoutesService, useClass: RoutesServiceMock },
        { provide: AuthenticationService, useClass: AuthenticationServiceMock }
      ]
    });
    fixture = TestBed.createComponent(AddClothingComponent);
    component = TestBed.get(AddClothingComponent);
    authenticationService = TestBed.get(AuthenticationService);
    routesService = TestBed.get(RoutesService);
    closetService = TestBed.get(ClosetService);
    logOutfitService = TestBed.get(LogOutfitService);
    router = TestBed.get(Router);
    spyOn(router, "navigate");
    hostElement = fixture.nativeElement;
    fixture.detectChanges();
  });

  describe('when there is a user logged in,', () => {
    let nameInput: HTMLInputElement;
    let costInput: HTMLInputElement;
    let categoryInput: HTMLInputElement;
    let wornInput: HTMLInputElement;
    let purchaseDateInput: HTMLInputElement;
    let saveButton: any;

    beforeEach(() => {
      nameInput = hostElement.querySelector('#name-input input');
      costInput = hostElement.querySelector('#cost-input input');
      categoryInput = hostElement.querySelector('#category-input input');
      wornInput = hostElement.querySelector('#worn-input input');
      purchaseDateInput = hostElement.querySelector('#purchase-date-input input');
      saveButton = hostElement.querySelector('#save-button button');
    })
    it('should set proper default values on fields', () => {
      component.ngOnInit();
      fixture.detectChanges();
      fixture.whenStable().then(() => {
        expect(nameInput.value).toEqual('');
        expect(costInput.value).toEqual('0');
        expect(categoryInput.value).toEqual('Top');
        expect(wornInput.value).toEqual('0');
        expect(purchaseDateInput.value).toEqual('');
      });
    });
    describe('for prevUrl,', () => {
      it(`should retrieve the prevUrl as /log-outfit
        if the previous component was log outfit`, () => {
          component.ngOnInit();
          fixture.detectChanges();
          expect(component.prevUrl).toEqual('/log-outfit');
      });

      it(`should retrieve the prevUrl as /closet-manage
        if the previous component was closet manage`, () => {
          routesService.getPrevUrl = () => '/closet-manage';
          component.ngOnInit();
          fixture.detectChanges();
          expect(component.prevUrl).toEqual('/closet-manage');
      });

      it(`should set the prevUrl as /closet-manage
        if there is no previous component`, () => {
          routesService.getPrevUrl = () => null;
          component.ngOnInit();
          fixture.detectChanges();
          expect(component.prevUrl).toEqual('/closet-manage');
      });
    });

    describe('when user is trying to submit,', () => {
      it(`should disable submit if not all required fields
        are filled.`, () => {
        expect(saveButton.disabled).toBeTruthy();
      });
      describe(`and the user attempts to click save with
        all fields filled,`, () => {
        beforeEach(() => {
          component.ngOnInit();
          nameInput.value = "name";
          nameInput.dispatchEvent(new Event('input'));
          purchaseDateInput.value = "2019-01-02";
          purchaseDateInput.dispatchEvent(new Event('input'));
          fixture.detectChanges();
        });
        it(`should enable submit.`, () => {
          expect(saveButton.disabled).toBeFalsy();
        });
        describe(`and after the click,`, () => {
          beforeEach(() => {
            component.prevUrl = '/closet-manage';
            closetService.addClothing = jasmine.createSpy('closetService.addClothing').and.returnValue(
              of({
                data: {_id: 'id'}
              })
            );
            logOutfitService.addOutfitClothing = jasmine.createSpy('logOutfitService.addOutfitClothing').and.returnValue(
              of(true)
            );
          });
          it('should call closetService.addClothing.', () => {
            saveButton.click();
            fixture.detectChanges();
            expect(closetService.addClothing).toHaveBeenCalled();
          });
          describe(`when data comes back,`, () => {
            describe(`and the prev page was log outfit,`, () => {
              beforeEach(() => {
                saveButton.click();
                fixture.detectChanges();
              })
              it(`should call logOutfitService.addOutfitClothing with
                the proper params`, () => {
                expect(logOutfitService.addOutfitClothing).toHaveBeenCalled();
              });
              it(`after calling logOutfitService.addOutfitClothing,
                go back to the log outfit page.`, () => {
                expect(router.navigate).toHaveBeenCalledWith(['/log-outfit']);
              });
            });
            describe(`and the prev page was closet manage`, () => {
              it(`should go back to the closet manage page.`, () => {
                component.enableSave = false;
                component._setPrevUrl('/closet-manage');
                fixture.detectChanges();
                saveButton.click();
                console.log(component,fixture,"closet manage test after");
                expect(router.navigate).toHaveBeenCalledWith(['/closet-manage']);
              });
            })
          });
        });
      });
    });
  })



  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
