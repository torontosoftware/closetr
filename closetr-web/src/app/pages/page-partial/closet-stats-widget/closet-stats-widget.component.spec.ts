import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClosetStatsWidgetComponent } from './closet-stats-widget.component';

describe('ClosetStatsWidgetComponent', () => {
  let component: ClosetStatsWidgetComponent;
  let fixture: ComponentFixture<ClosetStatsWidgetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClosetStatsWidgetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClosetStatsWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
