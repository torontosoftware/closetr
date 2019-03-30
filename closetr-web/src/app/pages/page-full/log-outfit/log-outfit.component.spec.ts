import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { Injectable, DebugElement, Pipe, PipeTransform } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AuthenticationService } from '../../../services/authentication.service';
import { ClosetService } from '../../../services/closet.service';
import { LogOutfitService } from  '../../../services/log-outfit.service';
import { DateFormatService } from '../../../services/utils/date-format.service';
import { RoutesService } from '../../../services/routes.service';
import { User } from '../../../models/user.model';
import { Clothing } from '../../../models/clothing.model';
import { UiBackButtonComponent } from '../../../shared/ui-back-button/ui-back-button.component';
import { UiEditButtonComponent } from '../../../shared/ui-edit-button/ui-edit-button.component';
import { UiTextButtonComponent } from '../../../shared/ui-text-button/ui-text-button.component';
import { UiInputAddButtonComponent } from '../../../shared/ui-input-add-button/ui-input-add-button.component';
import { UiCloseButtonComponent } from '../../../shared/ui-close-button/ui-close-button.component';
import { ClosetCardComponent } from '../../page-partial/closet-card/closet-card.component';
import { SearchFilterPipe } from '../../../pipes/search-filter.pipe';
import { LogOutfitComponent } from './log-outfit.component';
import {
  MockDashboardComponent,
  MockAddClothingComponent
} from '../../../../test/components';

const closetList = [
  new Clothing({clothingID: '1', clothingName: 'tshirt'}),
  new Clothing({clothingID: '2', clothingName: 'jeans'}),
  new Clothing({clothingID: '3', clothingName: 'shoes'})
];
const outfitClothingList = closetList.map((clothing) => {
  return {
    outfitEntryID: clothing.clothingID,
    clothing: clothing
  }
});
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

}

@Injectable({
  providedIn: 'root'
})
class LogOutfitServiceMock {
  getAllOutfitClothes = (params) => of({data: outfitClothingList});
  addOutfitClothing = (params) => of({data: true});
  deleteOutfitClothing = (params) => of({data: true});
}

@Injectable({
  providedIn: 'root'
})
class RoutesServiceMock {
  setPrevUrl = (params) => { return };
}

@Pipe({name: 'filter'})
class SearchFilterPipeMock implements PipeTransform{
 transform(items: any, searchText: String, property: string) {
  if (searchText == 'shirt') {
    return [items[0]];
  }
  return items;
 }
}

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

  describe(`from the init method`, () => {
    let params;
    beforeEach(() => {
      params = {
        userID: currentUser.id,
        date: dateFormatService.formatDateString(new Date())
      };
      component.ngOnInit();
      fixture.detectChanges();
    });
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
    let params;
    beforeEach(() => {
      params = {
        userID: currentUser.id,
        date: dateFormatService.formatDateString(new Date())
      };
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
      expect(component.deleteOutfitClothing).toHaveBeenCalledWith(outfitClothingList[0].outfitEntryID);
    });
    it(`should call logOutfitService's deleteOutfitClothing
      method, and call getAllOutfitClothes after data is
      recieved.`, () => {
      expect(logOutfitService.deleteOutfitClothing).toHaveBeenCalledWith(outfitClothingList[0].outfitEntryID);
      expect(component.getAllOutfitClothes).toHaveBeenCalledTimes(2);
    });
  });

  describe(`when edit button is clicked`, () => {
    let editButton;
    let saveButton;
    beforeEach(() => {
      editButton = hostElement.querySelector('#edit-button button');
      saveButton = hostElement.querySelector('#save-button button');
      component.ngOnInit();
      editButton.click();
      fixture.detectChanges();
    });
    it(`should call toggleEditMode method, and
      change the editMode variable (multiple toggles)`, () => {
      expect(component.toggleEditMode).toHaveBeenCalledTimes(1);
      expect(component.editMode).toBeTruthy();
      editButton.click();
      fixture.detectChanges();
      expect(component.toggleEditMode).toHaveBeenCalledTimes(2);
      expect(component.editMode).toBeFalsy();
      editButton.click();
      fixture.detectChanges();
      expect(component.toggleEditMode).toHaveBeenCalledTimes(3);
      expect(component.editMode).toBeTruthy();
    });
    it(`should hide save button when editMode is off.`, () => {
      expect(saveButton.hidden).toBeFalsy();
      editButton.click();
      fixture.detectChanges();
      expect(saveButton.hidden).toBeTruthy();
    });
    it(`should call save, and toggleEditMode functions
      when save button is clicked.`, () => {
      saveButton.click();
      fixture.detectChanges();
      expect(component.save).toHaveBeenCalled();
      expect(component.toggleEditMode).toHaveBeenCalled();
    });
  });

  describe(`when the user types input in the search bar,`, () => {
    let searchInput: HTMLInputElement;
    let params: any;
    beforeEach(() => {
      component.ngOnInit();
      searchInput = hostElement.querySelector('#search-input input');
    });
    it(`should call search filter with searchText and
      the clothingName string as property.`, () => {
      params = [[
        closetList, 'shirt', 'clothingName'
      ]];
      searchFilterPipe = spyOn(SearchFilterPipeMock.prototype, 'transform');
      searchInput.value = "shirt";
      searchInput.dispatchEvent(new Event('input'));
      fixture.detectChanges();
      expect(searchFilterPipe.calls.allArgs()).toEqual(params);
    });
    it(`should render results into closet-search-box components
      (shirt input)`, () => {
      searchInput.value = "shirt";
      searchInput.dispatchEvent(new Event('input'));
      fixture.detectChanges();
      let outfitSearchList = hostElement.querySelectorAll('.closet-search-box');
      expect(outfitSearchList.length).toEqual(1);
    });
    it(`should render results into closet-search-box components
      (blank input)`, () => {
      searchInput.value = "";
      searchInput.dispatchEvent(new Event('input'));
      fixture.detectChanges();
      let outfitSearchList = hostElement.querySelectorAll('.closet-search-box');
      expect(outfitSearchList.length).toEqual(3);
    });
    describe(`and user clicks a search result,`, () => {
      let searchResultButton;
      beforeEach(() => {
        searchResultButton = hostElement.querySelector('.closet-search-box');
        searchResultButton.click();
        fixture.detectChanges();
      });
      it(`should call the addSearchResult function with clothing`, () => {
        expect(component.addSearchResult).toHaveBeenCalledWith(closetList[0]);
      });
      describe(`the addSearchResult function`, () => {
        it(`should call addOutfitClothing with correct params`, () => {
          const params = {
            clothingID: closetList[0].clothingID,
            userID: currentUser.id,
            date: dateFormatService.formatDateString(new Date())
          };
          expect(component.addOutfitClothing).toHaveBeenCalledWith(params);
        });
        it(`should call getAllOutfitClothes with global params`, () => {
          const params = {
            userID: currentUser.id,
            date: dateFormatService.formatDateString(new Date())
          };
          expect(component.getAllOutfitClothes).toHaveBeenCalledWith(params);
        });
      });
    });
  });

  describe(`when the user clicks the 'add manually' button,`, () => {
    let addManuallyButton;
    beforeEach(() => {
      addManuallyButton = hostElement.querySelector('#add-manually-button button');
      addManuallyButton.click();
      fixture.detectChanges();
    });
    it(`should call navTo() function`, () => {
      expect(component.navTo).toHaveBeenCalled();
    });
    it(`should set prevUrl to log-outfit, and navigate
      to the add-clothing page.`, () => {
      expect(routesService.setPrevUrl).toHaveBeenCalledWith('/log-outfit');
      expect(router.navigate).toHaveBeenCalledWith(['/add-clothing']);
    });
  });

});
