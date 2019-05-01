import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../../../shared/shared.module';
import { AuthenticationService } from '../../../services/authentication.service';
import { ClosetService } from '../../../services/closet.service';
import { DateFormatService } from '../../../services/utils/date-format.service';
import { User } from '../../../models/user.model';
import { Clothing } from '../../../models/clothing.model';
import { DateRangeFilterPipe } from '../../../pipes/date-range-filter.pipe';
import { BudgetWidgetComponent } from './budget-widget.component';
import {
  MockSpendingManageComponent,
  MockBudgetManageComponent
} from '../../../../test/components';
import {
  mockClosetListRenderedTable,
  mockUserOne
} from '../../../../test/objects';
import {
  AuthenticationServiceMock,
  ClosetServiceMock
} from '../../../../test/services';
import {
  DateRangeFilterPipeMock
} from '../../../../test/pipes';
import {
  getAllClothesComponent,
  purchaseTableShouldRender
} from '../../../../test/common-tests';

describe('BudgetWidgetComponent', () => {
  let component: BudgetWidgetComponent;
  let fixture: ComponentFixture<BudgetWidgetComponent>;
  let closetService: ClosetServiceMock;
  let dateFormatService: DateFormatService;
  let authenticationService: AuthenticationServiceMock;
  let router: Router;
  let hostElement;

  const routes = [
    { path: 'spending-manage', component: MockSpendingManageComponent },
    { path: 'budget-manage', component: MockBudgetManageComponent }
  ];

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes(routes),
        HttpClientTestingModule,
        RouterTestingModule,
        FormsModule,
        SharedModule
      ],
      declarations: [
        MockBudgetManageComponent,
        MockSpendingManageComponent,
        DateRangeFilterPipeMock,
        BudgetWidgetComponent
      ],
      providers: [
        { provide: AuthenticationService, useClass: AuthenticationServiceMock },
        { provide: ClosetService, useClass: ClosetServiceMock },
        { provide: DateRangeFilterPipe, useClass: DateRangeFilterPipeMock }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BudgetWidgetComponent);
    component = fixture.debugElement.componentInstance;
    router = TestBed.get(Router);
    hostElement = fixture.nativeElement;
    closetService = TestBed.get(ClosetService);
    authenticationService = TestBed.get(AuthenticationService);
    dateFormatService = TestBed.get(DateFormatService);
    spyOn(router, 'navigate').and.callThrough();
    spyOn(component, 'getAllClothes').and.callThrough();
    spyOn(closetService, 'getAllClothes').and.callThrough();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it(`should navigate to budget manage component
    when edit button is clicked`, () => {
    let editButton = hostElement.querySelector('#edit-button button');
    editButton.click();
    fixture.detectChanges();
    expect(router.navigate).toHaveBeenCalledWith(['/budget-manage']);
  });

  it(`should navigate to spending manage component
    when 'manage spending' button is clicked`, () => {
    let manageSpendingButton = hostElement.querySelector('#manage-spending-button button');
    manageSpendingButton.click();
    fixture.detectChanges();
    expect(router.navigate).toHaveBeenCalledWith(['/spending-manage']);
  });

  describe(`from the init method,`, () => {
    beforeEach(() => {
      component.ngOnInit();
      fixture.detectChanges();
    });
    it(`should retrieve the current user from
      the authentication service.`, () => {
      expect(component.currentUser).toEqual(mockUserOne);
    });
    it(`should call getAllClothes() method.`, () => {
      expect(component.getAllClothes).toHaveBeenCalled();
    });
    it(`should set the dateOptions with the
      correct options`, () => {
      let dateOptions = [
        "last week",
        "last month"
      ];
      expect(component.dateOptions).toEqual(dateOptions);
    });
    it(`should set the filterCriteria properly`, () => {
      let filterCriteria = {
        dateRangeFor: "last month",
        dateFrom: dateFormatService.dateRangeForFrom("last month"),
        dateTo: dateFormatService.newDate()
      };
      expect(component.filterCriteria).toEqual(filterCriteria);
    });
  });

  describe(`when changing date options selector,`, () => {
    it(`should call updateFilterCriteria() method.`, () => {
      let dateRangeSelect = hostElement.querySelector('#date-range-select select');
      spyOn(component, 'updateFilterCriteria').and.callThrough();
      dateRangeSelect.value = "last month";
      dateRangeSelect.dispatchEvent(new Event('change'));
      fixture.detectChanges();
      expect(component.updateFilterCriteria).toHaveBeenCalledTimes(1);
    });
  });

  it(`the getAllClothes() method should set closetList.`, () => {
    getAllClothesComponent(component, fixture, closetService);
  });

  describe(`the date range selector,`, () => {
    it(`should take dateOptions as items`, () => {
      let dateOptions = [
        "last week",
        "last month"
      ];
      let dateRangeSelect = fixture.debugElement.query(
        By.css('#date-range-select')
      ).componentInstance;
      expect(dateRangeSelect.items).toEqual(dateOptions);
    });
  });

  it(`the table of purchases should render each item in closetList.`, () => {
    purchaseTableShouldRender(component, fixture, dateFormatService);
  });
});
