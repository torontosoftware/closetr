import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Pipe, PipeTransform, Component, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormsModule } from '@angular/forms';
import { DateFormatService } from '../../../services/utils/date-format.service';
import { UiBackButtonComponent } from '../../../shared/ui-back-button/ui-back-button.component';
import { UiInputAddButtonComponent } from '../../../shared/ui-input-add-button/ui-input-add-button.component';
import { UiTextButtonComponent } from '../../../shared/ui-text-button/ui-text-button.component';
import { UiFilterSelectComponent } from '../../../shared/ui-filter-select/ui-filter-select.component';
import { UiFilterDateComponent } from '../../../shared/ui-filter-date/ui-filter-date.component';
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
  let dateFormatService: DateFormatService;
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
        UiFilterDateComponent,
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
    dateFormatService = TestBed.get(DateFormatService);
    spyOn(router, 'navigate').and.callThrough();
    spyOn(component, 'searchCriteriaChangeHandler').and.callThrough();
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
    let dateRangeForSelect: HTMLInputElement;
    let dateRangeFromSelect: HTMLInputElement;
    let dateRangeToSelect: HTMLInputElement;
    beforeEach(() => {
      component.ngOnInit();
      fixture.detectChanges();
      dateRangeForSelect = hostElement.querySelector('#date-range-for-select select');
      dateRangeFromSelect = hostElement.querySelector('#date-range-from-select input');
      dateRangeToSelect = hostElement.querySelector('#date-range-to-select input');
    })
    describe(`for date range,`, () => {
      let dateRangeFromContainer;
      let dateRangeToContainer;
      beforeEach(() => {
        dateRangeFromContainer = hostElement.querySelector('#date-range-from-select');
        dateRangeToContainer = hostElement.querySelector('#date-range-to-select');
      });
      it(`should be visible when isDateRange is true.`, () => {
        component.isDateRange = true;
        fixture.detectChanges();
        fixture.whenStable().then(() => {
          expect(dateRangeFromContainer.hidden).toBeFalsy();
          expect(dateRangeToContainer.hidden).toBeFalsy();
        });
      });
      it(`should be hidden when isDateRange is false.`, () => {
        component.isDateRange = false;
        fixture.detectChanges();
        fixture.whenStable().then(() => {
          expect(dateRangeFromContainer.hidden).toBeTruthy();
          expect(dateRangeToContainer.hidden).toBeTruthy();
        });
      });
      describe(`when the values are changed,`, () => {
        beforeEach(() => {
          console.log("before values are changed");
          dateRangeFromSelect.value = dateFormatService.formatDateString(new Date(2019, 1, 1));
          dateRangeFromSelect.dispatchEvent(new Event('input'));
          dateRangeFromSelect.dispatchEvent(new Event('change'));
          fixture.detectChanges();
          console.log(dateRangeFromSelect, dateRangeFromSelect.value,"yaaaaaaaa");
          dateRangeToSelect.value = dateFormatService.formatDateString(new Date(2019, 2, 1));
          dateRangeToSelect.dispatchEvent(new Event('input'));
          dateRangeToSelect.dispatchEvent(new Event('change'));
          console.log(dateRangeFromSelect, dateRangeToSelect);
          fixture.detectChanges();
        });
        it(`should call searchCriteriaChangeHandler.`, () => {
          fixture.whenStable().then(() => {
            expect(component.searchCriteriaChangeHandler).toHaveBeenCalledTimes(3);
          });
        });
        it(`should set the searchCriteria variable
          respectively.`, () => {
            dateRangeFromSelect.value = dateFormatService.formatDateString(new Date(2019, 1, 1));
            dateRangeFromSelect.dispatchEvent(new Event('input'));
            dateRangeFromSelect.dispatchEvent(new Event('change'));
            fixture.detectChanges();
            dateRangeToSelect.value = dateFormatService.formatDateString(new Date(2019, 2, 1));
            dateRangeToSelect.dispatchEvent(new Event('input'));
            dateRangeFromSelect.dispatchEvent(new Event('change'));
            console.log(dateRangeFromSelect, dateRangeToSelect);
          let searchCriteria = {
            property: "clothingPurchaseDate",
            dateRangeFor: "last month",
            dateFrom: new Date(2019, 1, 1),
            dateTo: new Date(2019, 2, 1),
            dateFromFormatted: dateFormatService.formatDateString(new Date(2019, 1, 1)),
            dateToFormatted: dateFormatService.formatDateString(new Date(2019, 2, 1))
          };
          fixture.whenStable().then(() => {
            expect(component.searchCriteria).toEqual(searchCriteria);
            console.log("test",component.searchCriteria, searchCriteria);
            console.log(dateRangeFromSelect, dateRangeToSelect);
          });
        });
      });
    });
    describe(`for date range for,`, () => {
      beforeEach(() => {
        dateRangeForSelect.value = "last year";
        dateRangeForSelect.dispatchEvent(new Event('input'));
        fixture.detectChanges();
        fixture.whenStable().then(() => {
          console.log(dateRangeForSelect);
        });
      });
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
