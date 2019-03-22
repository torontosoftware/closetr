import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ClosetService } from '../../../services/closet.service';
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

@Injectable({
  providedIn: 'root'
})
class ClosetServiceMock {
  setClothingForEdit = () => { return };
}

describe('ClosetCardComponent', () => {
  let component: ClosetCardComponent;
  let fixture: ComponentFixture<ClosetCardComponent>;
  let router: Router;
  let hostElement;
  let closetService: ClosetServiceMock;

  const routes = [
    { path: 'edit-clothing/:id', component: MockEditClothingComponent },
    { path: 'closet-manage', component: ClosetCardComponent}
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
        ClosetCardComponent,
        { provide: ClosetService, useClass: ClosetServiceMock }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClosetCardComponent);
    hostElement = fixture.nativeElement;
    component = fixture.debugElement.componentInstance;
    router = TestBed.get(Router);
    closetService = TestBed.get(ClosetService);
    component.clothing = clothing;
    spyOn(component, 'editCard').and.callThrough();
    spyOn(component, 'removeCard').and.callThrough();
    spyOn(component.removeCardEmit, 'emit').and.callThrough();
    spyOn(router, 'navigate').and.callThrough();
    spyOn(closetService, 'setClothingForEdit');
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
    let closeButton;
    beforeEach(() => {
      closeButton = hostElement.querySelector('#close-button button');
    });
    it(`should be visible when editMode is true.`, () => {
      component.editMode = true;
      fixture.detectChanges();
      expect(closeButton.disabled).toBeFalsy();
    });
    it(`should be hidden when editMode is false.`, () => {
      component.editMode = false;
      fixture.detectChanges();
      expect(closeButton.disabled).toBeTruthy();
    });
    it(`should call removeCard method with clothingID,
      when clicked.`, () => {
      component.editMode = true;
      fixture.detectChanges();
      closeButton.click();
      expect(component.removeCard).toHaveBeenCalledWith(clothing.clothingID);
    });
  });

  describe(`the editCard() method`, () => {
    beforeEach(() => {
      component.editCard(clothing);
    });
    it(`should call closetService's setClothingForEdit
      method with clothing.`, () => {
      expect(closetService.setClothingForEdit).toHaveBeenCalledWith(clothing);
    });
    it(`should navigate to edit-clothing with the
      clothingID as additional parameter.`, () => {
      expect(router.navigate).toHaveBeenCalledTimes(1);
    });
  });

  describe(`the removeCard() method,`, () => {
    it(`should call removeCardEmit's emit function with
      clothingID`, () => {
      component.removeCard(clothing.clothingID);
      expect(component.removeCardEmit.emit).toHaveBeenCalledWith(clothing.clothingID);
    });
  });

  describe(`from the init method,`, () => {
    describe(`the isClosetManage variable,`, () => {
      it(`should be true if the current url is
        /closet-manage.`, () => {
        router.navigate(["/closet-manage"]).then(() => {
          component.ngOnInit();
          expect(component.isClosetManage).toBeTruthy();
        });
      });
      it(`should be false if the current url is
        not /closet-manage.`, () => {
        component.ngOnInit();
        expect(component.isClosetManage).toBeFalsy();
      });
    });
  });

});
