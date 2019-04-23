import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UiWidgetFullComponent } from './ui-widget-full.component';

describe('UiWidgetFullComponent', () => {
  let component: UiWidgetFullComponent;
  let fixture: ComponentFixture<UiWidgetFullComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UiWidgetFullComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UiWidgetFullComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
