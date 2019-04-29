import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { DebugElement, Pipe, PipeTransform } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AuthenticationService } from '../../../services/authentication.service';
import { ClosetService } from '../../../services/closet.service';
import { LogOutfitService } from  '../../../services/log-outfit.service';
import { DateFormatService } from '../../../services/utils/date-format.service';
import { RoutesService } from '../../../services/routes.service';
import { UiBackButtonComponent } from '../../../shared/ui-back-button/ui-back-button.component';
import { UiEditButtonComponent } from '../../../shared/ui-edit-button/ui-edit-button.component';
import { UiTextButtonComponent } from '../../../shared/ui-text-button/ui-text-button.component';
import { UiInputAddButtonComponent } from '../../../shared/ui-input-add-button/ui-input-add-button.component';
import { UiCloseButtonComponent } from '../../../shared/ui-close-button/ui-close-button.component';
import { UiWidgetFullComponent } from '../../../shared/ui-widget-full/ui-widget-full.component';
import { ClosetCardComponent } from '../../page-partial/closet-card/closet-card.component';
import { SearchFilterPipe } from '../../../pipes/search-filter.pipe';
import { LogOutfitComponent } from './log-outfit.component';
import {
  MockDashboardComponent,
  MockAddClothingComponent
} from '../../../../test/components';
import {
  mockOutfitClothingList,
  mockClosetList,
  mockUserOne,
  mockSearchFilterPipeParams
} from '../../../../test/objects';
import {
  SearchFilterPipeMock
} from '../../../../test/pipes';
import {
  ClosetServiceMock,
  LogOutfitServiceMock,
  RoutesServiceMock,
  AuthenticationServiceMock
} from '../../../../test/services';
import {
  clickBackAndTestNavigate,
  inputDispatch,
  inputDispatchAndCount,
  inputDispatchAndCheckArgs,
  clickAndTestCalledWithMult,
  clickTest
} from '../../../../test/utils';
import {
  editButtonTests
} from '../../../../test/common-tests';

const closetList = mockClosetList;
const outfitClothingList = mockOutfitClothingList;
const currentUser = mockUserOne;

describe('LogOutfitComponent', () => {
  let component: LogOutfitComponent;
  let fixture: ComponentFixture<LogOutfitComponent>;
  let router: Router;
  let authenticationService: AuthenticationServiceMock;
  let closetService: ClosetServiceMock;
  let logOutfitService: LogOutfitServiceMock;
  let dateFormatService: DateFormatService;
  let routesService: RoutesServiceMock;
  let searchFilterPipe;
  let hostElement;
  let params;

  const routes = [
    { path: 'dashboard', component: MockDashboardComponent },
    { path: 'add-clothing', component: MockAddClothingComponent }
  ];

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule,
        RouterTestingModule.withRoutes(routes),
        HttpClientTestingModule
      ],
      declarations: [
        UiBackButtonComponent,
        UiEditButtonComponent,
        UiTextButtonComponent,
        UiInputAddButtonComponent,
        UiCloseButtonComponent,
        UiWidgetFullComponent,
        ClosetCardComponent,
        LogOutfitComponent,
        MockDashboardComponent,
        MockAddClothingComponent,
        SearchFilterPipeMock
      ],
      providers: [
        DateFormatService,
        {provide: RoutesService, useClass: RoutesServiceMock},
        {provide: ClosetService, useClass: ClosetServiceMock},
        {provide: LogOutfitService, useClass: LogOutfitServiceMock},
        {provide: AuthenticationService, useClass: AuthenticationServiceMock},
        {provide: SearchFilterPipe, useClass: SearchFilterPipeMock}
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LogOutfitComponent);
    hostElement = fixture.nativeElement;
    component = fixture.debugElement.componentInstance;
    router = TestBed.get(Router);
    authenticationService = TestBed.get(AuthenticationService);
    closetService = TestBed.get(ClosetService);
    logOutfitService = TestBed.get(LogOutfitService);
    routesService = TestBed.get(RoutesService);
    dateFormatService = TestBed.get(DateFormatService);
    spyOn(router, 'navigate').and.callThrough();
    spyOn(component, 'getAllClothes').and.callThrough();
    spyOn(component, 'getAllOutfitClothes').and.callThrough();
    spyOn(component, 'save').and.callThrough();
    spyOn(component, 'toggleEditMode').and.callThrough();
    spyOn(component, 'addSearchResult').and.callThrough();
    spyOn(component, 'addOutfitClothing').and.callThrough();
    spyOn(component, 'deleteOutfitClothing').and.callThrough();
    spyOn(component, 'navTo').and.callThrough();
    spyOn(routesService, 'setPrevUrl');
    spyOn(closetService, 'getAllClothes').and.callThrough();
    spyOn(logOutfitService, 'getAllOutfitClothes').and.callThrough();
    spyOn(logOutfitService, 'addOutfitClothing').and.callThrough();
    spyOn(logOutfitService, 'deleteOutfitClothing').and.callThrough();

    params = {
      userID: currentUser.id,
      date: dateFormatService.formatDateString(new Date())
    };

    console.log("params", params);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it(`should navigate to dashboard component when
    back button is clicked`, () => {
    clickBackAndTestNavigate(hostElement, router, '/dashboard', fixture);
  });

  describe(`from the init method`, () => {
    it(`should retrieve the currentuser from the
      authentication service.`, () => {
      expect(component.currentUser).toEqual(currentUser);
    });
    it(`should call the getAllClothes method.`, () => {
      expect(component.getAllClothes).toHaveBeenCalled();
    });
    it(`should set the global params (used for
    calling getAllOutfitClothes())`, () => {
      expect(component.params).toEqual(params);
    });
    it(`should call getAllOutfitClothes with
      the global params`, () => {
      expect(component.getAllOutfitClothes).toHaveBeenCalledWith(params);
    });
    it(`should render each item in outfitClothingList
      into closet card components`, () => {
      let outfitCardList = hostElement.querySelectorAll('.closet-card-item');
      expect(outfitCardList.length).toEqual(outfitClothingList.length);
    });
    it(`should have editMode as false.`, () => {
      expect(component.editMode).toBeFalsy();
    });
  });

  describe(`the getAllClothes method`, () => {
    beforeEach(() => {
      component.getAllClothes();
      fixture.detectChanges();
    });
    it(`should call closetService's getAllClothes method`, () => {
      expect(closetService.getAllClothes).toHaveBeenCalled();
    });
    it(`should set closetList as equal to the returned data
      from closetService`, () => {
      expect(component.closetList).toEqual(closetList);
    });
  });

  describe(`the getAllOutfitClothes method`, () => {
    beforeEach(() => {
      component.getAllOutfitClothes(params);
      fixture.detectChanges();
    });
    it(`should call the logOutfitService's getAllOutfitClothes
    method.`, () => {
      expect(logOutfitService.getAllOutfitClothes).toHaveBeenCalledWith(params);
    });
    it(`should set outfitClothingList as the result from
      logOutfitService.`, () => {
      expect(component.outfitClothingList).toEqual(outfitClothingList);
    });
  });

  describe(`the remove card method`, () => {
    beforeEach(() => {
      component.removeCard(outfitClothingList[0]);
      fixture.detectChanges();
    });
    it(`should call deleteOutfitClothing with the correct
      outfitEntry.`, () => {
      expect(component.deleteOutfitClothing)
        .toHaveBeenCalledWith(outfitClothingList[0].outfitEntryID);
    });
    it(`should call logOutfitService's deleteOutfitClothing
      method, and call getAllOutfitClothes after data is
      recieved.`, () => {
      expect(logOutfitService.deleteOutfitClothing)
        .toHaveBeenCalledWith(outfitClothingList[0].outfitEntryID);
      expect(component.getAllOutfitClothes).toHaveBeenCalledTimes(2);
    });
  });

  describe(`when edit button is clicked,`, () => {
    beforeEach(() => editButtonTests(component, fixture, hostElement));
  });

  describe(`when the user types input in the search bar,`, () => {
    let searchInput: HTMLInputElement;
    beforeEach(() => {
      searchInput = hostElement.querySelector('#search-input input');
    });
    it(`should call search filter with searchText and
      the clothingName string as property.`, () => {
      searchFilterPipe = spyOn(SearchFilterPipeMock.prototype, 'transform');
      inputDispatchAndCheckArgs(searchInput, 'shirt',
        mockSearchFilterPipeParams, searchFilterPipe, fixture);
    });
    it(`should render results into closet-search-box components
      (shirt input)`, () => {
      inputDispatchAndCount(searchInput, 'shirt', hostElement,
        '.closet-search-box', 1, fixture);
    });
    it(`should render results into closet-search-box components
      (blank input)`, () => {
      inputDispatchAndCount(searchInput, '', hostElement,
        '.closet-search-box', 3, fixture);
    });
    describe(`and user clicks a search result,`, () => {
      let searchResultButton;
      beforeEach(() => {
        searchResultButton = hostElement.querySelector('.closet-search-box');
        clickTest(searchResultButton, fixture);
      });
      it(`should call the addSearchResult function with clothing`, () => {
        expect(component.addSearchResult).toHaveBeenCalledWith(closetList[0]);
      });
      describe(`the addSearchResult function`, () => {
        it(`should call addOutfitClothing with correct params`, () => {
          const customParams = {
            ...params,
            clothingID: closetList[0].clothingID
          };
          expect(component.addOutfitClothing).toHaveBeenCalledWith(customParams);
        });
        it(`should call getAllOutfitClothes with global params`, () => {
          expect(component.getAllOutfitClothes).toHaveBeenCalledWith(params);
        });
      });
    });
  });

  it(`when the user clicks the 'add manually' button, should set prevUrl to
  log-outfit, and navigate to the add-clothing page.`, () => {
    clickAndTestCalledWithMult(
      hostElement.querySelector('#add-manually-button button'),
      fixture,
      [{func: component.navTo},
       {func: routesService.setPrevUrl, result: '/log-outfit'},
       {func: router.navigate, result: ['/add-clothing']}]
    );
  });

});
