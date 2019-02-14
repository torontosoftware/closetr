import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UiEditButtonComponent } from './ui-edit-button.component';

describe('UiEditButtonComponent', () => {
  let component: UiEditButtonComponent;
  let fixture: ComponentFixture<UiEditButtonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UiEditButtonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UiEditButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
