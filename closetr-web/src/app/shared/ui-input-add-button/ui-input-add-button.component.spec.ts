import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UiInputAddButtonComponent } from './ui-input-add-button.component';

describe('UiInputAddButtonComponent', () => {
  let component: UiInputAddButtonComponent;
  let fixture: ComponentFixture<UiInputAddButtonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UiInputAddButtonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UiInputAddButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
