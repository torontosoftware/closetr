import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
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

describe('AddClothingComponent', () => {
  let component: AddClothingComponent;
  let fixture: ComponentFixture<AddClothingComponent>;
  let router: Router;

  const routes = [
    { path: 'login', component: MockLoginComponent },
    { path: 'closet-manage', component: MockClosetManageComponent },
    { path: 'log-outfit', component: MockLogOutfitComponent }
  ];

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
