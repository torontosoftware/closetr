import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { Component, Injectable, DebugElement, Pipe, PipeTransform } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AuthenticationService } from '../../../services/authentication.service';
import { ClosetService } from '../../../services/closet.service';
import { LogOutfitService } from  '../../../services/log-outfit.service';
import { DateFormatService } from '../../../services/utils/date-format.service';
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

const closetList = [
  new Clothing({clothingID: '1', clothingName: 'tshirt'}),
  new Clothing({clothingID: '2', clothingName: 'jeans'}),
  new Clothing({clothingID: '3', clothingName: 'shoes'})
];
const outfitClothingList = closetList.map((clothing) => {
  return {clothing: clothing}
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
}

@Component({
  selector: 'app-dashboard',
  template: '<p>Mock Dashboard Component</p>'
})
class MockDashboardComponent { }

@Pipe({name: 'filter'})
class SearchFilterPipeMock implements PipeTransform{
 transform(items: any, searchText: String, property: string) {
  return items;
 }
}

describe('LogOutfitComponent', () => {
  let component: LogOutfitComponent;
  let fixture: ComponentFixture<LogOutfitComponent>;
  let authenticationService: AuthenticationServiceMock;
  let closetService: ClosetServiceMock;
  let logOutfitService: LogOutfitServiceMock;
  let dateFormatService: DateFormatService;

  const routes = [
    { path: 'dashboard', component: MockDashboardComponent }
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
        SearchFilterPipeMock
      ],
      providers: [
        DateFormatService,
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
    component = fixture.debugElement.componentInstance;
    authenticationService = TestBed.get(AuthenticationService);
    closetService = TestBed.get(ClosetService);
    logOutfitService = TestBed.get(LogOutfitService);
    dateFormatService = TestBed.get(DateFormatService);
    spyOn(component, 'getAllClothes').and.callThrough();
    spyOn(component, 'getAllOutfitClothes').and.callThrough();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    console.log(component);
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
    it(`should call the getAllClothes method, and
      set the closetList from it.`, () => {
      expect(component.getAllClothes).toHaveBeenCalled();
      expect(component.closetList).toEqual(closetList);
    });
    it(`should set the global params (used for
    calling getAllOutfitClothes())`, () => {
      expect(component.params).toEqual(params);
    });
    it(`should call getAllOutfitClothes with
      the global params`, () => {
      expect(component.getAllOutfitClothes).toHaveBeenCalledWith(params);
    });
    it(`should have editMode as false.`, () => {
      expect(component.editMode).toBeFalsy();
    });
  });

});
