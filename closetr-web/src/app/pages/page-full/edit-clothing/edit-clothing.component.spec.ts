import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { UiBackButtonComponent } from '../../../shared/ui-back-button/ui-back-button.component';
import { UiTextButtonComponent } from '../../../shared/ui-text-button/ui-text-button.component';
import { UiInputComponent } from '../../../shared/ui-input/ui-input.component';
import { UiInputSelectComponent } from '../../../shared/ui-input-select/ui-input-select.component';
import { Clothing } from '../../../models/clothing.model';
import { EditClothingComponent } from './edit-clothing.component';

@Component({
  selector: 'app-closet-manage',
  template: '<p>Mock Closet Manage Component</p>'
})
class MockClosetManageComponent {}

describe('EditClothingComponent', () => {
  let component: EditClothingComponent;
  let fixture: ComponentFixture<EditClothingComponent>;
  const routes = [
    {path: 'closet-manage', component: MockClosetManageComponent}
  ];
  beforeEach(async(() => {
    const clothingMock = {
      clothingName: "Zara Mockneck Tee",
      clothingWorn: 4,
      clothingCost: 10,
      clothingCategory: "Top",
      clothingPurchaseDate: "01/01/2019",
      enableClothingSave: () => true
    };

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
        {provide: Clothing, useValue: clothingMock}
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditClothingComponent);
    component = fixture.componentInstance;
    component.clothing = TestBed.get(Clothing);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
