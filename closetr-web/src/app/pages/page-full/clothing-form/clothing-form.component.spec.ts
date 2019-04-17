import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormsModule } from '@angular/forms';
import { UiBackButtonComponent } from '../../../shared/ui-back-button/ui-back-button.component';
import { UiTextButtonComponent } from '../../../shared/ui-text-button/ui-text-button.component';
import { UiInputComponent } from '../../../shared/ui-input/ui-input.component';
import { UiInputSelectComponent } from '../../../shared/ui-input-select/ui-input-select.component';
import { ClothingFormComponent } from './clothing-form.component';
import {
  RoutesServiceMock,
  AuthenticationServiceMock,
  ClosetServiceMock,
  LogOutfitServiceMock
} from '../../../../test/services';
import {
  mockClothingOne
} from '../../../../test/objects';
import {
  inputDispatch
} from '../../../../test/utils';

describe('ClothingFormComponent', () => {
  let component: ClothingFormComponent;
  let fixture: ComponentFixture<ClothingFormComponent>;
  let hostElement;
  let saveButton;
  let nameInput: HTMLInputElement;
  let costInput: HTMLInputElement;
  let categoryInput: HTMLInputElement;
  let wornInput: HTMLInputElement;
  let purchaseDateInput: HTMLInputElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule,
        RouterTestingModule,
        HttpClientTestingModule
      ],
      declarations: [
        ClothingFormComponent,
        UiBackButtonComponent,
        UiTextButtonComponent,
        UiInputComponent,
        UiInputSelectComponent
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClothingFormComponent);
    component = fixture.debugElement.componentInstance;
    fixture.detectChanges();
    hostElement = fixture.nativeElement;
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
      component.clothing = mockClothingEmpty;
    });
    describe(`should be disabled when`, () => {
      describe(`clothing name field is filled,`, () => {
        beforeEach(() => {
          inputDispatch(nameInput, 'name');
          fixture.detectChanges();
        });
        it(`and all else is empty`, () => {});
        describe(`and clothing worn field is filled,`, () => {
          beforeEach(() => {
            inputDispatch(wornInput, '0');
            fixture.detectChanges();
          });
          it(`and all else is empty`, () => {});
          it(`and clothing cost field is filled, and all else is empty.`, () => {
            inputDispatch(costInput, '0');
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

});
