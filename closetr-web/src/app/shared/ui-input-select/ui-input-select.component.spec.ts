import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UiInputSelectComponent } from './ui-input-select.component';

describe('UiInputSelectComponent', () => {
  let component: UiInputSelectComponent;
  let fixture: ComponentFixture<UiInputSelectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UiInputSelectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UiInputSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
