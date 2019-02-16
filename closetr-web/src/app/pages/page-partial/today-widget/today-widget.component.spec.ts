import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TodayWidgetComponent } from './today-widget.component';

describe('TodayWidgetComponent', () => {
  let component: TodayWidgetComponent;
  let fixture: ComponentFixture<TodayWidgetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TodayWidgetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TodayWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
