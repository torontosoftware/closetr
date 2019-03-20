import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { Component, Injectable, Pipe, PipeTransform } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormsModule } from '@angular/forms';
import { AuthenticationService } from '../../../services/authentication.service';
import { ClosetService } from '../../../services/closet.service';
import { User } from '../../../models/user.model';
import { Clothing } from '../../../models/clothing.model';
import { DateRangeFilterPipe } from '../../../pipes/date-range-filter.pipe';
import { UiTableComponent } from '../../../shared/ui-table/ui-table.component';
import { UiFilterSelectComponent } from '../../../shared/ui-filter-select/ui-filter-select.component';
import { UiTextButtonComponent } from '../../../shared/ui-text-button/ui-text-button.component';
import { UiEditButtonComponent } from '../../../shared/ui-edit-button/ui-edit-button.component';
import { BudgetWidgetComponent } from './budget-widget.component';

const closetList = [
  new Clothing({clothingID: '1', clothingName: 'tshirt'}),
  new Clothing({clothingID: '2', clothingName: 'jeans'}),
  new Clothing({clothingID: '3', clothingName: 'shoes'})
];

const currentUser = new User({userName: 'fides', id: '1'});

@Component({
  selector: 'app-dashboard',
  template: '<p>Mock Spending Manage Component</p>'
})
class MockSpendingManageComponent { }

@Component({
  selector: 'app-dashboard',
  template: '<p>Mock Budget Manage Component</p>'
})
class MockBudgetManageComponent { }

@Pipe({name: 'dateRangeFilter'})
class DateRangeFilterPipeMock implements PipeTransform {
  transform(items: any, dateFrom: Date, dateTo: Date, property: string) {
   return items;
  }
}

@Injectable({
  providedIn: 'root'
})
class AuthenticationServiceMock {
  currentUser = of(currentUser);
}

@Injectable({
  providedIn: 'root'
})
class ClosetServiceMock {
  getAllClothes = (user) => of({data: closetList});
}

describe('BudgetWidgetComponent', () => {
  let component: BudgetWidgetComponent;
  let fixture: ComponentFixture<BudgetWidgetComponent>;
  let closetService: ClosetServiceMock;
  let authenticationService: AuthenticationServiceMock;

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
        FormsModule
      ],
      declarations: [
        MockBudgetManageComponent,
        MockSpendingManageComponent,
        DateRangeFilterPipeMock,
        UiTableComponent,
        UiFilterSelectComponent,
        UiTextButtonComponent,
        UiEditButtonComponent,
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
    closetService = TestBed.get(ClosetService);
    authenticationService = TestBed.get(AuthenticationService);
    spyOn(component, 'getAllClothes').and.callThrough();
    spyOn(closetService, 'getAllClothes').and.callThrough();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it(`should navigate to budget manage component
    when edit button is clicked`, () => {

  });

  it(`should navigate to spending manage component
    when 'manage spending' button is clicked`, () => {

  });

  describe(`from the init method,`, () => {
    beforeEach(() => {
      component.ngOnInit();
      fixture.detectChanges();
    });
    it(`should retrieve the current user from
      the authentication service.`, () => {
      expect(component.currentUser).toEqual(currentUser);
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
  });

  describe(`the getAllClothes() method,`, () => {
    it(`should call closet service's getAllClothes()
      method`, () => {

    });
    it(`should set closetList to the returned
      data from closetService`, () => {

    });
  });

  describe(`the date selector,`, () => {
    it(`should take dateOptions as items`, () => {

    });
  });

  describe(`the table of purchases,`, () => {
    it(`should render each item in closetList.`, () => {
    });
  });
});
