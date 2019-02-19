import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { UiBackButtonComponent } from '../../../shared/ui-back-button/ui-back-button.component';
import { UiTextButtonComponent } from '../../../shared/ui-text-button/ui-text-button.component';
import { UiInputComponent } from '../../../shared/ui-input/ui-input.component';
import { UiInputSelectComponent } from '../../../shared/ui-input-select/ui-input-select.component';
import { Clothing } from '../../../models/clothing.model';
import { AddClothingComponent } from './add-clothing.component';

describe('AddClothingComponent', () => {
  let component: AddClothingComponent;
  let fixture: ComponentFixture<AddClothingComponent>;

  beforeEach(async(() => {
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
        FormsModule,
        HttpClientTestingModule,
        RouterTestingModule,
      ],
      declarations: [
        AddClothingComponent,
        UiBackButtonComponent,
        UiTextButtonComponent,
        UiInputComponent,
        UiInputSelectComponent,
      ],
      providers: [
        {provide: Clothing, useValue: clothingMock}
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddClothingComponent);
    component = fixture.componentInstance;
    component.clothing = TestBed.get(Clothing);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
