import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { UiCloseButtonComponent } from '../../../shared/ui-close-button/ui-close-button.component';
import { UiEditButtonComponent } from '../../../shared/ui-edit-button/ui-edit-button.component';
import { ClosetCardComponent } from './closet-card.component';
import { Clothing } from '../../../models/clothing.model';

const clothing = new Clothing({
  clothingID: '12345',
  clothingName: 'White Button Down Shirt',
  clothingCost: 45,
  clothingWorn: 12,
  clothingPurchaseDate: '2018-03-14'
});

@Component({
  selector: 'app-edit-clothing',
  template: '<p> Mock Edit Clothing Component </p>'
})
class MockEditClothingComponent { }

describe('ClosetCardComponent', () => {
  let component: ClosetCardComponent;
  let fixture: ComponentFixture<ClosetCardComponent>;
  let router: Router;
  let hostElement;

  const routes = [
    { path: 'edit-clothing/:id', component: MockEditClothingComponent }
  ];

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes(routes),
        HttpClientTestingModule
      ],
      declarations: [
        MockEditClothingComponent,
        UiCloseButtonComponent,
        UiEditButtonComponent,
        ClosetCardComponent
      ],
      providers: [
        ClosetCardComponent
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClosetCardComponent);
    hostElement = fixture.nativeElement;
    component = fixture.debugElement.componentInstance;
    router = TestBed.get(Router);
    component.clothing = clothing;
    spyOn(component, 'editCard').and.callThrough();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe(`the closet-card-caption,`, () => {
    it(`should render clothingName.`, () => {
      let nameDisplay = hostElement.querySelector('.closet-card-caption #name-display');
      expect(nameDisplay.textContent).toEqual(
        ` ${clothing.clothingName} `
      );
    });
    it(`should render clothingCost.`, () => {
      let costDisplay = hostElement.querySelector('.closet-card-caption #cost-display');
      expect(costDisplay.textContent).toEqual(
        ` cost: ${clothing.clothingCost} `
      );
    });
    it(`should render clothingWorn.`, () => {
      let wornDisplay = hostElement.querySelector('.closet-card-caption #worn-display');
      expect(wornDisplay.textContent).toEqual(
        ` worn: ${clothing.clothingWorn} times `
      );
    });
  });

  describe(`the edit button,`, () => {
    let editButton;
    beforeEach(() => {
      component.editMode = true;
      component.isClosetManage = true;
      fixture.detectChanges();
      editButton = hostElement.querySelector('#edit-button button');
    });
    it(`should call editCard method with clothing,
      when clicked.`, () => {
      editButton.click();
      fixture.detectChanges();
      expect(component.editCard).toHaveBeenCalledWith(clothing);
    });
    describe(`should be disabled when`, () => {
      afterEach(() => {
        fixture.detectChanges();
        expect(editButton.disabled).toBeTruthy();
      });
      it(`isClosetManage is true, but editMode is false.`, () => {
        component.isClosetManage = true;
        component.editMode = false;
      });
      it(`editMode is true, but isClosetManage is false.`, () => {
        component.isClosetManage = false;
        component.editMode = true;
      });
      it(`both isClosetManage and editMode are false.`, () => {
        component.isClosetManage = false;
        component.editMode = false;
      });
    });
    describe(`should be visible`, () => {
      it(`when both editMode and isClosetManage is true.`, () => {
        component.isClosetManage = true;
        component.editMode = true;
        expect(editButton.hidden).toBeFalsy();
      });
    });
  });

  describe(`the close button,`, () => {
    it(`should be visible when editMode is true.`, () => {

    });
    it(`should be hidden when editMode is false.`, () => {

    });
    it(`should call removeCard method with clothingID,
      when clicked.`, () => {

    });
  });

  describe(`the editCard() method`, () => {
    it(`should call closetService's setClothingForEdit
      method with clothing.`, () => {

    });
    it(`should navigate to edit-clothing with the
      clothingID as additional parameter.`, () => {

    });
  });

  describe(`the removeCard() method,`, () => {
    it(`should call removeCardEmit's emit function with
      clothingID`, () => {

    });
  });

  describe(`from the init method,`, () => {
    describe(`the isClosetManage variable,`, () => {
      it(`should be true if the current url is
        /closet-manage.`, () => {

      });
      it(`should be false if the current url is
        not /closet-manage.`, () => {

      });
    });
  });

});
