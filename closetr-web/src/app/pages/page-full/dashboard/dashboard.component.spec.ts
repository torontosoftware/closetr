import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { UiFilterSelectComponent } from '../../../shared/ui-filter-select/ui-filter-select.component';
import { UiCloseButtonComponent } from '../../../shared/ui-close-button/ui-close-button.component';
import { UiTextButtonComponent } from '../../../shared/ui-text-button/ui-text-button.component';
import { UiEditButtonComponent } from '../../../shared/ui-edit-button/ui-edit-button.component';
import { BudgetWidgetComponent } from '../../page-partial/budget-widget/budget-widget.component';
import { TodayWidgetComponent } from '../../page-partial/today-widget/today-widget.component';
import { ClosetWidgetComponent } from '../../page-partial/closet-widget/closet-widget.component';
import { ClosetCardComponent } from '../../page-partial/closet-card/closet-card.component';
import { DashboardComponent } from './dashboard.component';

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
        UiFilterSelectComponent,
        UiCloseButtonComponent,
        UiTextButtonComponent,
        UiEditButtonComponent,
        BudgetWidgetComponent,
        TodayWidgetComponent,
        ClosetWidgetComponent,
        ClosetCardComponent,
        DashboardComponent
      ]
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
