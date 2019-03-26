import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UiPopupMenuItemComponent } from './ui-popup-menu-item.component';

describe('UiPopupMenuItemComponent', () => {
  let component: UiPopupMenuItemComponent;
  let fixture: ComponentFixture<UiPopupMenuItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UiPopupMenuItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UiPopupMenuItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
