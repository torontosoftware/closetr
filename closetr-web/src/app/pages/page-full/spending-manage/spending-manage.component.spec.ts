import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AuthenticationService } from '../../../services/authentication.service';
import { DateFormatService } from '../../../services/utils/date-format.service';
import { ClosetService } from '../../../services/closet.service';
import { User } from '../../../models/user.model';
import { Clothing } from '../../../models/clothing.model';
import { UiBackButtonComponent } from '../../../shared/ui-back-button/ui-back-button.component';
import { UiInputAddButtonComponent } from '../../../shared/ui-input-add-button/ui-input-add-button.component';
import { UiTextButtonComponent } from '../../../shared/ui-text-button/ui-text-button.component';
import { UiFilterSelectComponent } from '../../../shared/ui-filter-select/ui-filter-select.component';
import { UiFilterDateComponent } from '../../../shared/ui-filter-date/ui-filter-date.component';
import { UiTableComponent } from '../../../shared/ui-table/ui-table.component';
import { UiWidgetFullComponent } from '../../../shared/ui-widget-full/ui-widget-full.component';
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
  toggleDateRangeShouldToggle
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
        UiWidgetFullComponent,
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
    searchCriteriaDateRange(dateFormatService);

  const searchCriteriaDateRangeForHelper = (dateRangeFor) =>
    searchCriteriaDateRangeFor(dateFormatService);

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
          component.isDateRange = true;
          inputDispatch(dateRangeFromSelect, dateFormatService.formatDateString(
            dateFormatService.newDate(2019, 1, 1)));
          inputDispatch(dateRangeToSelect, dateRangeToSelect.value =
            dateFormatService.formatDateString(dateFormatService.newDate(2019, 2, 1)));
          fixture.detectChanges();
        });
        it(`should call searchCriteriaChangeHandler.`, () => {
          fixture.whenStable().then(() =>
            expect(component.searchCriteriaChangeHandler).toHaveBeenCalledTimes(3));
        });
        it(`should set the searchCriteria variable
          respectively.`, () => {
          let searchCriteria = searchCriteriaDateRangeHelper(
            'last month', [2019, 1, 1], [2019, 2, 1]);
          fixture.whenStable().then(() =>
            expect(component.searchCriteria).toEqual(searchCriteria));
        });
      });
    });
    describe(`for date range for,`, () => {
      let dateRangeForContainer;
      beforeEach(() => {
        dateRangeForContainer = hostElement.querySelector('#date-range-for-select');
      });
      it(`should be visible when isDateRange is false.`, () => {
        component.isDateRange = false;
        fixture.detectChanges();
        fixture.whenStable().then(() =>
          expect(dateRangeForContainer.hidden).toBeFalsy());
      });
      it(`should be hidden when isDateRange is true.`, () => {
        component.isDateRange = true;
        fixture.detectChanges();
        fixture.whenStable().then(() =>
          expect(dateRangeForContainer.hidden).toBeTruthy());
      });
      describe(`when the values are changed,`, () => {
        beforeEach(() => {
          component.isDateRange = false;
          dateRangeForSelect.value = "last year";
          inputDispatch(dateRangeForSelect, 'last year', 'change');
          fixture.detectChanges();
        });
        it(`should call searchCriteriaChangeHandler.`, () => {
          fixture.whenStable().then(() =>
            expect(component.searchCriteriaChangeHandler).toHaveBeenCalledTimes(2));
        });
        it(`should set the searchCriteria variable
          respectively.`, () => {
          let searchCriteria = searchCriteriaDateRangeForHelper("last year");
          fixture.whenStable().then(() =>
            expect(component.searchCriteria).toEqual(searchCriteria));
        });
      });
    });
  });

  describe(`from the init method,`, () => {
    it(`should retrieve the current user from
      the authentication service.`, () => {
      expect(component.currentUser).toEqual(currentUser);
    });
    it(`should call getAllClothes() method.`, () => {
      expect(component.getAllClothes).toHaveBeenCalled();
    });
    it(`should call the searchCriteriaChangeHandler
      method.`, () => {
      expect(component.searchCriteriaChangeHandler).toHaveBeenCalledTimes(1);
    });
    it(`should have the variable isDateRange as false.`, () => {
      expect(component.isDateRange).toBeFalsy();
    });
    it(`should set the searchCriteria properly.`, () => {
      let searchCriteria = searchCriteriaDateRangeForHelper("last month");
      expect(component.searchCriteria).toEqual(searchCriteria);
    });
    it(`should initialize availableDateRange.`, () => {
      expect(component.availableDateRange).toEqual(availableDateRange);
    });
  });

  describe(`the table of purchases,`, () => {
    it(`should render each item in closetList.`, () => {
      let mockPurchaseTable = {
        bindBold: "clothingCost",
        bindRegular: "clothingName",
        filter: "date",
        filterBy: "clothingPurchaseDate",
        filterCriteria: {
          dateFrom: dateFormatService.dateRangeForFrom("last month"),
          dateTo: dateFormatService.newDate()
        },
        items: closetList
      };
      component.ngOnInit();
      fixture.detectChanges();
      fixture.whenStable().then(() => {
        let purchaseTable = fixture.debugElement.query(By.directive(UiTableComponent)).componentInstance;
        expect(purchaseTable.bindBold).toEqual(mockPurchaseTable.bindBold);
        expect(purchaseTable.bindRegular).toEqual(mockPurchaseTable.bindRegular);
        expect(purchaseTable.filter).toEqual(mockPurchaseTable.filter);
        expect(purchaseTable.filterBy).toEqual(mockPurchaseTable.filterBy);
        expect(purchaseTable.filterCriteria).toEqual(mockPurchaseTable.filterCriteria);
        expect(purchaseTable.items).toEqual(mockPurchaseTable.items);
      });
    });
  });

  describe(`when the getAllClothes() method is called,`, () => {
    beforeEach(() => {
      component.getAllClothes();
      fixture.detectChanges();
    })
    it(`should call closetService's getAllClothes
      method with the currentUser.`, () => {
      expect(closetService.getAllClothes).toHaveBeenCalledWith(currentUser);
    });
    it(`should set closetList to the returned data
      from closetService.`, () => {
      expect(component.closetList).toEqual(closetList);
    });
  });

  describe(`when the searchCriteriaChangeHandler()
    method is called,`, () => {
    describe(`when isDateRange is true,`, () => {
      let searchCriteriaResult;
      beforeEach(() => {
        searchCriteriaResult = searchCriteriaDateRangeHelper(
          'last month', [2018, 2, 9], [2019, 2, 9]);
      });
      it(`should set the dateFrom and dateTo variables
        to the a formatted date using dateFormatService's
        formatStringDate method.`, () => {
        spyOn(dateFormatService, 'formatStringDate').and.callThrough();
        component.isDateRange = true;
        component.searchCriteria.dateFromFormatted = '2018-02-09';
        component.searchCriteria.dateToFormatted = '2019-02-09';
        component.searchCriteriaChangeHandler();
        expect(dateFormatService.formatStringDate).toHaveBeenCalledTimes(2);
        expect(component.searchCriteria).toEqual(searchCriteriaResult);
      });
    });
    describe(`when isDateRange is false,`, () => {
      let searchCriteriaResult;
      beforeEach(() => {
        component.isDateRange = false;
        searchCriteriaResult = searchCriteriaDateRangeForHelper("last year");
        spyOn(dateFormatService, 'formatDateString').and.callThrough();
        spyOn(dateFormatService, 'dateRangeForFrom').and.callThrough();
        component.searchCriteria.dateRangeFor = "last year";
        component.searchCriteriaChangeHandler();
      });
      it(`should call dateFormatService's dateRangeForFrom,
        and formatDateString methods.`, () => {
        expect(dateFormatService.formatDateString).toHaveBeenCalledTimes(2);
        expect(dateFormatService.dateRangeForFrom).toHaveBeenCalledTimes(1);
      });
      it(`should set the searchCriteria variable
        appropriately`, () => {
        expect(component.searchCriteria).toEqual(searchCriteriaResult);
      });
    });
    it(`should call to updateFilterCriteria method`, () => {
      spyOn(component, 'updateFilterCriteria').and.callThrough();
      component.searchCriteriaChangeHandler();
      expect(component.updateFilterCriteria).toHaveBeenCalledTimes(1);
    });
  });

  describe(`when the updateFilterCriteria()
    is called,`, () => {
    it(`should set filterCriteria from
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
});
