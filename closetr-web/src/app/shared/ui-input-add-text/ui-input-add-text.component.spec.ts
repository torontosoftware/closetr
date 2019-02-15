import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UiInputAddTextComponent } from './ui-input-add-text.component';

describe('UiInputAddTextComponent', () => {
  let component: UiInputAddTextComponent;
  let fixture: ComponentFixture<UiInputAddTextComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UiInputAddTextComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UiInputAddTextComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
