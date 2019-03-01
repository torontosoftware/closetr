import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Pipe, PipeTransform } from '@angular/core';
import { DateRangeFilterPipe } from '../../pipes/date-range-filter.pipe';
import { UiTableComponent } from './ui-table.component';

@Pipe({name: 'dateRangeFilter'})
class DateRangeFilterPipeMock implements PipeTransform {
  transform(items: any, dateFrom: Date, dateTo: Date, property: string) {
   return items;
  }
}

describe('UiTableComponent', () => {
  let component: UiTableComponent;
  let fixture: ComponentFixture<UiTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        DateRangeFilterPipeMock,
        UiTableComponent
      ],
      providers: [
        {provide: DateRangeFilterPipe, useClass: DateRangeFilterPipeMock}
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UiTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
