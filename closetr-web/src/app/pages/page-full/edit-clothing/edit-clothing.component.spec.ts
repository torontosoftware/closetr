import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { Component, OnInit, Injectable } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
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
const currentUser = new User({userName: 'fides'});

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
  editClothing = () => of(true);
}

@Injectable({
  providedIn: 'root'
})
class AuthenticationServiceMock {
  currentUser = of(currentUser);
}

describe('EditClothingComponent', () => {
  let component: EditClothingComponent;
  let fixture: ComponentFixture<EditClothingComponent>;
  let authenticationService: AuthenticationServiceMock;
  let closetService: ClosetServiceMock;
  let router;
  let hostElement;
  let saveButton;
  let nameInput: HTMLInputElement;
  let costInput: HTMLInputElement;
  let categoryInput: HTMLInputElement;
  let wornInput: HTMLInputElement;
  let purchaseDateInput: HTMLInputElement;

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
    router = TestBed.get(Router);
    authenticationService = TestBed.get(AuthenticationService);
    closetService = TestBed.get(ClosetService);
    spyOn(router, 'navigate');
    spyOn(closetService, 'getClothingForEdit').and.callThrough();
    spyOn(closetService, 'editClothing').and.callThrough();
    spyOn(component, 'save').and.callThrough();
    spyOn(component, 'back').and.callThrough();
    hostElement = fixture.nativeElement;
    fixture.detectChanges();
    saveButton = hostElement.querySelector('#save-button button');
    nameInput = hostElement.querySelector('#name-input input');
    costInput = hostElement.querySelector('#cost-input input')
    categoryInput = hostElement.querySelector('#category-input select');
    wornInput = hostElement.querySelector('#worn-input input');
    purchaseDateInput = hostElement.querySelector('#purchase-date-input input');
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe(`the save button`, () => {
    beforeEach(() => {
      saveButton = hostElement.querySelector('#save-button button');
      component.clothing = new Clothing();
    });
    describe(`should be disabled when`, () => {
      describe(`clothing name field is filled,`, () => {
        beforeEach(() => {
          nameInput.value = "name";
          nameInput.dispatchEvent(new Event('input'));
          fixture.detectChanges();
        });
        it(`and all else is empty`, () => {});
        describe(`and clothing worn field is filled,`, () => {
          beforeEach(() => {
            wornInput.value = "0";
            wornInput.dispatchEvent(new Event('input'));
            fixture.detectChanges();
          });
          it(`and all else is empty`, () => {});
          it(`and clothing cost field is filled, and all else is empty.`, () => {
            costInput.value = "0";
            costInput.dispatchEvent(new Event('input'));
            fixture.detectChanges();
          });
        });
        afterEach(() => {
          expect(saveButton.disabled).toBeTruthy();
        })
      });
    });
    describe(`when clicked,`, () => {
      beforeEach(() => {
        component.clothing = clothingForEdit;
        saveButton.click();
        fixture.detectChanges();
      })
      it(`should call the save function`, () => {
        expect(component.save).toHaveBeenCalled();
      })
      it(`should call closetService's editClothing method with
        the clothing for edit.`, () => {
        expect(closetService.editClothing).toHaveBeenCalledWith(clothingForEdit);
      });
      it(`should call the back function.`, () => {
        expect(component.back).toHaveBeenCalled();
      });
    });
    it(`should be enabled when all fields are filled.`, () => {
      component.clothing = clothingForEdit;
      fixture.detectChanges();
      expect(saveButton.disabled).toBeFalsy();
    });
  });
  describe(`from the init method,`, () => {
    describe(`if there is a clothing for edit,`, () => {
      beforeEach(() => {
        component.ngOnInit();
        fixture.detectChanges();
      });
      it(`should set the clothing variable with the returned data
        (if it exists).`, () => {
        expect(closetService.getClothingForEdit).toHaveBeenCalled();
        expect(component.clothing).toEqual(clothingForEdit);
      });
      it(`should retrieve the current user from the authentication
        service.`, () => {
        expect(component.currentUser).toEqual(currentUser);
      });
      it(`should retrieve clothing categories from clothing model,
        and render the options in the category selector.`, () => {
        expect(component.clothingCategories).toEqual(Clothing.clothingCategories);
      });
      it(`should render the clothing object on all fields properly.`, () => {
        fixture.whenStable().then(() => {
          expect(costInput.value).toEqual(clothingForEdit.clothingCost.toString());
          expect(nameInput.value).toEqual(clothingForEdit.clothingName);
          expect(categoryInput.value).toEqual(clothingForEdit.clothingCategory);
          expect(wornInput.value).toEqual(clothingForEdit.clothingWorn.toString());
          expect(purchaseDateInput.value).toEqual(clothingForEdit.clothingPurchaseDate);
        });
      });
      it(`should have the save button enabled.`, () => {
        expect(saveButton.disabled).toBeFalsy();
      });
    });
    describe(`if there is no clothing for edit,`, () => {
      beforeEach(() => {
        closetService.getClothingForEdit = () => { return null };
        spyOn(closetService, 'getClothingForEdit').and.callThrough();
        component.ngOnInit();
        fixture.detectChanges();
      });
      it(`should call closetService's getClothingForEdit method.`, () => {
        expect(closetService.getClothingForEdit).toHaveBeenCalled();
      });
      it(`should navigate to closet manage page.`, () => {
        expect(router.navigate).toHaveBeenCalledWith(['/closet-manage']);
      });
    });

  });
});
