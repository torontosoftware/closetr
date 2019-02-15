import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UiBackButtonComponent } from './ui-back-button.component';

describe('UiBackButtonComponent', () => {
  let component: UiBackButtonComponent;
  let fixture: ComponentFixture<UiBackButtonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UiBackButtonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UiBackButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
