import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Pipe, PipeTransform } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { BudgetWidgetComponent } from '../../page-partial/budget-widget/budget-widget.component';
import { TodayWidgetComponent } from '../../page-partial/today-widget/today-widget.component';
import { ClosetStatsWidgetComponent } from '../../page-partial/closet-stats-widget/closet-stats-widget.component';
import { ClosetWidgetComponent } from '../../page-partial/closet-widget/closet-widget.component';
import { DashboardComponent } from './dashboard.component';
import {
  MockBudgetWidgetComponent,
  MockTodayWidgetComponent,
  MockClosetWidgetComponent,
  MockClosetStatsWidgetComponent
} from '../../../../test/components';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule,
        RouterTestingModule,
        HttpClientTestingModule
      ],
      declarations: [
        MockBudgetWidgetComponent,
        MockTodayWidgetComponent,
        MockClosetWidgetComponent,
        MockClosetStatsWidgetComponent,
        DashboardComponent
      ],
      providers: [ ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
