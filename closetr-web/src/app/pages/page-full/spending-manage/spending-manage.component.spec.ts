import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { SharedModule } from '../../../shared/shared.module';
import { AuthenticationService } from '../../../services/authentication.service';
import { DateFormatService } from '../../../services/utils/date-format.service';
import { ClosetService } from '../../../services/closet.service';
import { SpendingManageComponent } from './spending-manage.component';
import { DateRangeFilterPipe } from '../../../pipes/date-range-filter.pipe';
import {
  MockDashboardComponent,
  MockBudgetManageComponent
} from '../../../../test/components';
import {
  availableDateRange,
  mockClosetList,
  mockUserOne
} from '../../../../test/objects';
import {
  ClosetServiceMock,
  AuthenticationServiceMock
} from '../../../../test/services';
import {
  DateRangeFilterPipeMock
} from '../../../../test/pipes';
import {
  inputDispatch,
  clickAndTestNavigate,
  searchCriteriaDateRange,
  searchCriteriaDateRangeFor
} from '../../../../test/utils';
import {
  toggleDateRangeShouldToggle,
  getAllClothesComponent,
  purchaseTableShouldRender
} from '../../../../test/common-tests';

const closetList = mockClosetList;
const currentUser = mockUserOne;

describe('SpendingManageComponent', () => {
  let component: SpendingManageComponent;
  let fixture: ComponentFixture<SpendingManageComponent>;
  let dateFormatService: DateFormatService;
  let authenticationService: AuthenticationServiceMock;
  let closetService: ClosetServiceMock;
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
        FormsModule,
        SharedModule
      ],
      declarations: [
        MockDashboardComponent,
        MockBudgetManageComponent,
        SpendingManageComponent,
        DateRangeFilterPipeMock
      ],
      providers: [
        SpendingManageComponent,
        {provide: ClosetService, useClass: ClosetServiceMock},
        {provide: AuthenticationService, useClass: AuthenticationServiceMock},
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
    authenticationService = TestBed.get(AuthenticationService);
    closetService = TestBed.get(ClosetService);
    spyOn(router, 'navigate').and.callThrough();
    spyOn(component, 'searchCriteriaChangeHandler').and.callThrough();
    spyOn(component, 'getAllClothes').and.callThrough();
    spyOn(closetService, 'getAllClothes').and.callThrough();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it(`should navigate to dashboard component when
    back button is clicked`, () => {
    clickAndTestNavigate(
      hostElement.querySelector('#back-button button'),
      router, '/dashboard', fixture);
  });

  it(`should navigate to budget manage page when
    'manage budget' button is clicked`, () => {
    clickAndTestNavigate(
      hostElement.querySelector('#manage-budget-button button'),
        router, '/budget-manage', fixture);
  });

  it(`should navigate to dashboard when 'add new'
    button is clicked.`, () => {
    clickAndTestNavigate(hostElement.querySelector('#add-new-button button'),
      router, '/dashboard', fixture);
  });

  describe(`the toggle button should set isDateRange true or false
    (multiple toggles)`, () => {
    beforeEach(() => {
      toggleDateRangeShouldToggle(component, fixture,
        hostElement.querySelector('#toggle-button input'));
    });
  });

  const searchCriteriaDateRangeHelper = (dateRangeFor, dateFrom, dateTo) =>
    searchCriteriaDateRange(dateFormatService)(dateRangeFor, dateFrom, dateTo);

  const searchCriteriaDateRangeForHelper = (dateRangeFor) =>
    searchCriteriaDateRangeFor(dateFormatService)(dateRangeFor);

  describe(`the selectors`, () => {
    let dateRangeForSelect: HTMLInputElement;
    let dateRangeFromSelect: HTMLInputElement;
    let dateRangeToSelect: HTMLInputElement;
    beforeEach(() => {
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
      it(`should be visible when isDateRange is true, and not
        otherwise`, () => {
        const dateRangeContainerVisible = (isDateRange) => {
          component.isDateRange = isDateRange;
          fixture.detectChanges();
          expect(dateRangeFromContainer.hidden).toEqual(!isDateRange);
          expect(dateRangeToContainer.hidden).toEqual(!isDateRange);
        }
        dateRangeContainerVisible(true);
        dateRangeContainerVisible(false);
      });
      it(`when the values are changed, should set the searchCriteria
        variable respectively.`, () => {
        let searchCriteria = searchCriteriaDateRangeHelper(
          'last month', [2019, 1, 1], [2019, 2, 1]);
        component.isDateRange = true;
        inputDispatch(dateRangeFromSelect, dateFormatService.formatDateString(
          dateFormatService.newDate(2019, 1, 1)));
        inputDispatch(dateRangeToSelect, dateRangeToSelect.value =
          dateFormatService.formatDateString(dateFormatService.newDate(2019, 2, 1)));
        fixture.detectChanges();
        expect(component.searchCriteria).toEqual(searchCriteria);
      });
    });
    describe(`for date range for,`, () => {
      let dateRangeForContainer;
      beforeEach(() => {
        dateRangeForContainer = hostElement.querySelector('#date-range-for-select');
      });
      it(`should be hidden when isDateRange is true, and not
        otherwise`, () => {
        const dateRangeForContainerVisible = (isDateRange) => {
          component.isDateRange = isDateRange;
          fixture.detectChanges();
          expect(dateRangeForContainer.hidden).toEqual(isDateRange);
        }
        dateRangeForContainerVisible(true);
        dateRangeForContainerVisible(false);
      });
      it(`when the values are changed, should set the searchCriteria variable
        respectively.`, () => {
        let searchCriteria = searchCriteriaDateRangeForHelper("last year");
        component.isDateRange = false;
        dateRangeForSelect.value = "last year";
        inputDispatch(dateRangeForSelect, 'last year', 'change');
        fixture.detectChanges();
        expect(component.searchCriteria).toEqual(searchCriteria);
      });
    });
  });

  it(`the init method should initialize variables.`, () => {
    let searchCriteria = searchCriteriaDateRangeForHelper("last month");
    expect(component.currentUser).toEqual(currentUser);
    expect(component.getAllClothes).toHaveBeenCalled();
    expect(component.searchCriteriaChangeHandler).toHaveBeenCalledTimes(1);
    expect(component.isDateRange).toBeFalsy();
    expect(component.searchCriteria).toEqual(searchCriteria);
    expect(component.availableDateRange).toEqual(availableDateRange);
  });

  it(`the table of purchases should render each item in closetList.`, () => {
    purchaseTableShouldRender(component, fixture, dateFormatService);
  });

  it(`the getAllClothes() method should set closetList.`, () => {
    getAllClothesComponent(component, fixture, closetService);
  });

  describe(`when the searchCriteriaChangeHandler()
    method is called,`, () => {
    it(`when isDateRange is true, should set the dateFrom and dateTo
      variables to the a formatted date using dateFormatService's
      formatStringDate method.`, () => {
      component.isDateRange = true;
      let searchCriteriaResult = searchCriteriaDateRangeHelper(
          'last month', [2018, 2, 9], [2019, 2, 9]);
      component.searchCriteria.dateFromFormatted = '2018-02-09';
      component.searchCriteria.dateToFormatted = '2019-02-09';
      component.searchCriteriaChangeHandler();
      expect(component.searchCriteria).toEqual(searchCriteriaResult);
    });
    it(`when isDateRange is false, should set the searchCriteria variable
      appropriately`, () => {
      component.isDateRange = false;
      let searchCriteriaResult = searchCriteriaDateRangeForHelper("last year");
      component.searchCriteria.dateRangeFor = "last year";
      component.searchCriteriaChangeHandler();
      expect(component.searchCriteria).toEqual(searchCriteriaResult);
    });
    it(`should call to updateFilterCriteria method`, () => {
      spyOn(component, 'updateFilterCriteria').and.callThrough();
      component.searchCriteriaChangeHandler();
      expect(component.updateFilterCriteria).toHaveBeenCalledTimes(1);
    });
  });

  it(`when the updateFilterCriteria() is called, should set filterCriteria from
    searchCriteria`, () => {
    let searchCriteria = searchCriteriaDateRangeHelper(
      'last month', [2018, 2, 9], [2019, 2, 9]);
    let filterCriteria = {
      dateFrom: dateFormatService.newDate(2018, 2, 9),
      dateTo: dateFormatService.newDate(2019, 2, 9)
    };
    component.searchCriteria = searchCriteria;
    component.updateFilterCriteria();
    expect(component.filterCriteria).toEqual(filterCriteria);
  });
});
