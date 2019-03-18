import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Pipe, PipeTransform, Component, Injectable } from '@angular/core';
import { Router } from '@angular/router';
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

@Component({
  selector: 'app-dashboard',
  template: '<p>Mock Dashboard Component</p>'
})
class MockDashboardComponent { }

@Component({
  selector: 'app-budget-manage',
  template: '<p>Mock Budget Manage Component</p>'
})
class MockBudgetManageComponent { }

@Pipe({name: 'dateRangeFilter'})
class DateRangeFilterPipeMock implements PipeTransform{
 transform(items: any, dateFrom: Date, dateTo: Date, property: string) {
  return items;
 }
}

describe('SpendingManageComponent', () => {
  let component: SpendingManageComponent;
  let fixture: ComponentFixture<SpendingManageComponent>;
  let hostElement;
  let router: Router;
  let addManuallyButton;
  let backButton;

  const routes = [
    { path: 'dashboard', component: MockDashboardComponent },
    { path: 'budget-manage', component: MockBudgetManageComponent }
  ];

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes(routes),
        HttpClientTestingModule,
        FormsModule
      ],
      declarations: [
        MockDashboardComponent,
        MockBudgetManageComponent,
        UiBackButtonComponent,
        UiInputAddButtonComponent,
        UiTextButtonComponent,
        UiFilterSelectComponent,
        UiTableComponent,
        SpendingManageComponent,
        DateRangeFilterPipeMock
      ],
      providers: [
        SpendingManageComponent,
        {provide: DateRangeFilterPipe, useClass: DateRangeFilterPipeMock}
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpendingManageComponent);
    component = fixture.debugElement.componentInstance;
    router = TestBed.get(Router);
    hostElement = fixture.nativeElement;
    spyOn(router, 'navigate').and.callThrough();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it(`should navigate to dashboard component when
    back button is clicked`, () => {
    component.ngOnInit();
    let backButton = hostElement.querySelector('#back-button button');
    backButton.click();
    fixture.detectChanges();
    expect(router.navigate).toHaveBeenCalledWith(['/dashboard']);
  });

  it(`should navigate to budget manage page when
    'manage budget' button is clicked`, () => {
    component.ngOnInit();
    let manageBudgetButton = hostElement.querySelector('#manage-budget-button button');
    manageBudgetButton.click();
    fixture.detectChanges();
    expect(router.navigate).toHaveBeenCalledWith(['/budget-manage']);
  });

  it(`should navigate to dashboard when 'add new'
    button is clicked.`, () => {
    component.ngOnInit();
    let addNewButton = hostElement.querySelector('#add-new-button button');
    addNewButton.click();
    fixture.detectChanges();
    expect(router.navigate).toHaveBeenCalledWith(['/dashboard']);
  });

  describe(`when the toggle button,`, () => {
    it(`should set isDateRange true or false
      (multiple toggles)`, () => {

    });
  });

  describe(`the selectors`, () => {
    describe(`for date range,`, () => {
      it(`should be visible when isDateRange is true.`, () => {

      });
      it(`should be hidden when isDateRange is false.`, () => {

      });
      describe(`when the values are changed,`, () => {
        it(`should call searchCriteriaChangeHandler.`, () => {

        });
        it(`should set the searchCriteria variable
          respectively.`, () => {

        });
      });
    });
    describe(`for date range for,`, () => {
      it(`should be visible when isDateRange is false.`, () => {

      });
      it(`should be hidden when isDateRange is true.`, () => {

      });
      describe(`when the values are changed,`, () => {
        it(`should call searchCriteriaChangeHandler.`, () => {

        });
        it(`should set the searchCriteria variable
          respectively.`, () => {

        });
      });
    });
  });

  describe(`from the init method,`, () => {
    it(`should retrieve the current user from
      the authentication service.`, () => {

    });
    it(`should call getAllClothes() method.`, () => {

    });
    it(`should call the searchCriteriaChangeHandler
      method.`, () => {

    });
    it(`should have the variable isDateRange as false.`, () => {

    });
    it(`should set the searhCriteria properly.`, () => {

    });
    it(`should initialize availableDateRange.`, () => {

    });
  });

  describe(`the table of purchases,`, () => {
    it(`should render each item in closetList.`, () => {

    });
  });

  describe(`when the getAllClothes() method is called,`, () => {
    it(`should call closetService's getAllClothes
      method with the currentUser.`, () => {

    });
    it(`should set closetList to the returned data
      from closetService.`, () => {

    });
  });

  describe(`when the searchCriteriaChangeHandler()
    method is called`, () => {
    describe(`when isDateRange is true,`, () => {
      it(`should set the dateFrom and dateTo variables
        to the a formatted date using dateFormatService's
        formatStringDate method.`, () => {

      });
    });
    describe(`when isDateRange is false,`, () => {
      it(`should set the dateFrom and dateTo variables
        to reflect the equivalent range from the current
        date-range-for, using dateFormatService's
        dateRangeForFrom method.`, () => {

      });
      it(`should set the dateFrom/dateTo formatted
        variables using dateFormatService's
        formatDateString method.`, () => {

      });
    });
    it(`should call to updateFilterCriteria method`, () => {

    });
  });

  describe(`when the updateFilterCriteria()
    is called,`, () => {
    it(`should set filterCriteria from
      searchCriteria`, () => {

    });
  });
});
