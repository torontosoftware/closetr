import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UiTextButtonComponent } from './ui-text-button.component';

describe('UiTextButtonComponent', () => {
  let component: UiTextButtonComponent;
  let fixture: ComponentFixture<UiTextButtonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UiTextButtonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UiTextButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
