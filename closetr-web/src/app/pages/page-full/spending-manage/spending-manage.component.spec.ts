import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Pipe, PipeTransform } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormsModule } from '@angular/forms';
import { UiBackButtonComponent } from '../../../shared/ui-back-button/ui-back-button.component';
import { UiInputAddButtonComponent } from '../../../shared/ui-input-add-button/ui-input-add-button.component';
import { UiTextButtonComponent } from '../../../shared/ui-text-button/ui-text-button.component';
import { UiFilterSelectComponent } from '../../../shared/ui-filter-select/ui-filter-select.component';
import { UiTableComponent } from '../../../shared/ui-table/ui-table.component';
import { SpendingManageComponent } from './spending-manage.component';
import { DateRangeFilterPipe } from '../../../pipes/date-range-filter.pipe';

@Pipe({name: 'dateRangeFilter'})
class DateRangeFilterPipeMock implements PipeTransform{
 transform(items: any, dateFrom: Date, dateTo: Date, property: string) {
  return items;
 }
}

describe('SpendingManageComponent', () => {
  let component: SpendingManageComponent;
  let fixture: ComponentFixture<SpendingManageComponent>;


  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientTestingModule,
        FormsModule
      ],
      declarations: [
        UiBackButtonComponent,
        UiInputAddButtonComponent,
        UiTextButtonComponent,
        UiFilterSelectComponent,
        UiTableComponent,
        SpendingManageComponent,
        DateRangeFilterPipeMock
      ],
      providers: [
        {provide: DateRangeFilterPipe, useClass: DateRangeFilterPipeMock}
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpendingManageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
