import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { UiBackButtonComponent } from '../../../shared/ui-back-button/ui-back-button.component';
import { AddClothingComponent } from './add-clothing.component';

describe('AddClothingComponent', () => {
  let component: AddClothingComponent;
  let fixture: ComponentFixture<AddClothingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AddClothingComponent,
        UiBackButtonComponent 
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddClothingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
