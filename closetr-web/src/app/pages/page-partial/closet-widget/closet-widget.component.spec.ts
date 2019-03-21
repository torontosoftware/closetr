import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { of } from 'rxjs';
import { Component, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormsModule } from '@angular/forms';
import { AuthenticationService } from '../../../services/authentication.service';
import { ClosetService } from '../../../services/closet.service';
import { User } from '../../../models/user.model';
import { Clothing } from '../../../models/clothing.model';
import { UiEditButtonComponent } from '../../../shared/ui-edit-button/ui-edit-button.component';
import { UiFilterSelectComponent } from '../../../shared/ui-filter-select/ui-filter-select.component';
import { ClosetCardComponent } from '../closet-card/closet-card.component';
import { UiCloseButtonComponent } from '../../../shared/ui-close-button/ui-close-button.component';
import { ClosetWidgetComponent } from './closet-widget.component';

@Component({
  selector: 'app-closet-manage',
  template: '<p> Closet Manage Component </p>'
})
class MockClosetManageComponent { }

const closetList = [
  new Clothing({clothingID: '1', clothingName: 'tshirt'}),
  new Clothing({clothingID: '2', clothingName: 'jeans'}),
  new Clothing({clothingID: '3', clothingName: 'shoes'})
];
const filterOptions = [
  "no filter",
  "exclude Aritzia items",
  "sweaters only",
  "pants and sweaters only",
  "pants only"
];
const sortOptions = [
  "cost ascending",
  "cost descending",
  "most recently purchased",
  "least recently purchased",
  "most worn"
];
const currentUser = new User({userName: 'fides', id: '1'});

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
  getSortOptions = () => sortOptions;
  getFilterOptions = () => filterOptions;
}

describe('ClosetWidgetComponent', () => {
  let component: ClosetWidgetComponent;
  let fixture: ComponentFixture<ClosetWidgetComponent>;
  let router: Router;
  let authenticationService: AuthenticationServiceMock;
  let closetService: ClosetServiceMock;
  let hostElement;

  const routes = [
    { path: 'closet-manage', component: MockClosetManageComponent }
  ];

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes(routes),
        HttpClientTestingModule,
        FormsModule
      ],
      declarations: [
        MockClosetManageComponent,
        UiEditButtonComponent,
        UiFilterSelectComponent,
        ClosetCardComponent,
        UiCloseButtonComponent,
        ClosetWidgetComponent
      ],
      providers: [
        ClosetWidgetComponent,
        {provide: ClosetService, useClass: ClosetServiceMock},
        {provide: AuthenticationService, useClass: AuthenticationServiceMock},
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClosetWidgetComponent);
    component = fixture.debugElement.componentInstance;
    hostElement = fixture.nativeElement;
    router = TestBed.get(Router);
    authenticationService = TestBed.get(AuthenticationService);
    closetService = TestBed.get(ClosetService);
    spyOn(router, 'navigate').and.callThrough();
    spyOn(component, 'getAllClothes').and.callThrough();
    spyOn(closetService, 'getAllClothes').and.callThrough();
    spyOn(closetService, 'getSortOptions').and.callThrough();
    spyOn(closetService, 'getFilterOptions').and.callThrough();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it(`should be render closetList into closet card components.`, () => {
    let closetCards = fixture.debugElement.queryAll(
      By.directive(ClosetCardComponent)
    ).map(closetCardFixture => closetCardFixture.componentInstance.clothing);
    expect(closetCards).toEqual(closetList);
  });

  it(`should navigate to the closet manage component when the edit
    button is clicked.`, () => {
    let editButton = hostElement.querySelector('#edit-button button');
    editButton.click();
    fixture.detectChanges();
    expect(router.navigate).toHaveBeenCalledWith(['/closet-manage']);
  });

  it(`should render filterOptions into the filter selector.`, () => {
    let filterSelect = fixture.debugElement.query(
      By.css('#filter-select')
    ).componentInstance;
    expect(filterSelect.items).toEqual(filterOptions);
  });

  it(`should render sortOptions into the sort selector.`, () => {
    let sortSelect = fixture.debugElement.query(
      By.css('#sort-select')
    ).componentInstance;
    expect(sortSelect.items).toEqual(sortOptions);
  });

  describe(`from the init method,`, () => {
    beforeEach(() => {
      component.ngOnInit();
      fixture.detectChanges();
    })
    it(`should retrieve the current user from the authentication
      service.`, () => {
      expect(component.currentUser).toEqual(currentUser);
    });
    it(`should call getAllClothes() method.`, () => {
      expect(component.getAllClothes).toHaveBeenCalled();
    });
    it(`should retrieve filterOptions from closet service.`, () => {
      expect(closetService.getFilterOptions).toHaveBeenCalled();
      expect(component.filterOptions).toEqual(filterOptions);
    });
    it(`should retrieve sortOptions from closet service.`, () => {
      expect(closetService.getSortOptions).toHaveBeenCalled();
      expect(component.sortOptions).toEqual(sortOptions);
    });
  });

  describe(`when the getAllClothes() method is called,`, () => {
    beforeEach(() => {
      component.getAllClothes();
      fixture.detectChanges();
    });
    it(`should call closetService's getAllClothes() method.`, () => {
      expect(closetService.getAllClothes).toHaveBeenCalledTimes(2);
      expect(closetService.getAllClothes).toHaveBeenCalledWith(currentUser);
    });
    it(`should set closetList as equal to the returned data
      from closet service.`, () => {
      expect(component.closetList).toEqual(closetList);
    });
  });


});
