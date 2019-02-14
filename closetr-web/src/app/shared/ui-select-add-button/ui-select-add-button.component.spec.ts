import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UiSelectAddButtonComponent } from './ui-select-add-button.component';

describe('UiSelectAddButtonComponent', () => {
  let component: UiSelectAddButtonComponent;
  let fixture: ComponentFixture<UiSelectAddButtonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UiSelectAddButtonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UiSelectAddButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
