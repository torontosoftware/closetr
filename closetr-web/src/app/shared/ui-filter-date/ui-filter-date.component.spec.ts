import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UiFilterDateComponent } from './ui-filter-date.component';

describe('UiFilterDateComponent', () => {
  let component: UiFilterDateComponent;
  let fixture: ComponentFixture<UiFilterDateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UiFilterDateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UiFilterDateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
