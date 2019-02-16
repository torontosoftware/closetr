import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClosetWidgetComponent } from './closet-widget.component';

describe('ClosetWidgetComponent', () => {
  let component: ClosetWidgetComponent;
  let fixture: ComponentFixture<ClosetWidgetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClosetWidgetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClosetWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
