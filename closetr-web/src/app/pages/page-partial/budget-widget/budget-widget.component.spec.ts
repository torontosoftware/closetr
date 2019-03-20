import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Pipe, PipeTransform } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormsModule } from '@angular/forms';
import { DateRangeFilterPipe } from '../../../pipes/date-range-filter.pipe';
import { UiTableComponent } from '../../../shared/ui-table/ui-table.component';
import { UiFilterSelectComponent } from '../../../shared/ui-filter-select/ui-filter-select.component';
import { UiTextButtonComponent } from '../../../shared/ui-text-button/ui-text-button.component';
import { UiEditButtonComponent } from '../../../shared/ui-edit-button/ui-edit-button.component';
import { BudgetWidgetComponent } from './budget-widget.component';

@Pipe({name: 'dateRangeFilter'})
class DateRangeFilterPipeMock implements PipeTransform {
  transform(items: any, dateFrom: Date, dateTo: Date, property: string) {
   return items;
  }
}

describe('BudgetWidgetComponent', () => {
  let component: BudgetWidgetComponent;
  let fixture: ComponentFixture<BudgetWidgetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientTestingModule,
        RouterTestingModule,
        FormsModule
      ],
      declarations: [
        DateRangeFilterPipeMock,
        UiTableComponent,
        UiFilterSelectComponent,
        UiTextButtonComponent,
        UiEditButtonComponent,
        BudgetWidgetComponent
      ],
      providers: [
        {provide: DateRangeFilterPipe, useClass: DateRangeFilterPipeMock}
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BudgetWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
