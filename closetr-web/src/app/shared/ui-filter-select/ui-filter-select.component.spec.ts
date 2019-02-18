import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UiFilterSelectComponent } from './ui-filter-select.component';

describe('UiFilterSelectComponent', () => {
  let component: UiFilterSelectComponent;
  let fixture: ComponentFixture<UiFilterSelectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UiFilterSelectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UiFilterSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
