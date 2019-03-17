import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';
import { Injectable, Component, DebugElement, Pipe, PipeTransform } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthenticationService } from '../../../services/authentication.service';
import { ClosetService } from '../../../services/closet.service';
import { User } from '../../../models/user.model';
import { Clothing } from '../../../models/clothing.model';
import { SearchFilterPipe } from '../../../pipes/search-filter.pipe';
import { UiBackButtonComponent } from '../../../shared/ui-back-button/ui-back-button.component';
import { UiEditButtonComponent } from '../../../shared/ui-edit-button/ui-edit-button.component';
import { UiTextButtonComponent } from '../../../shared/ui-text-button/ui-text-button.component';
import { UiInputAddButtonComponent } from '../../../shared/ui-input-add-button/ui-input-add-button.component';
import { UiFilterSelectComponent } from '../../../shared/ui-filter-select/ui-filter-select.component';
import { UiCloseButtonComponent } from '../../../shared/ui-close-button/ui-close-button.component';
import { ClosetCardComponent } from '../../page-partial/closet-card/closet-card.component';
import { ClosetManageComponent } from './closet-manage.component';

const closetList = [
  new Clothing({clothingID: '1', clothingName: 'tshirt'}),
  new Clothing({clothingID: '2', clothingName: 'jeans'}),
  new Clothing({clothingID: '3', clothingName: 'shoes'})
];
const currentUser = new User({userName: 'fides'});

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
  removeClothing = (id) => of({data: {closetList}});
}

@Component({
  selector: 'app-dashboard',
  template: '<p>Mock Dashboard Component</p>'
})
class MockDashboardComponent { }

@Pipe({name: 'filter'})
class SearchFilterPipeMock implements PipeTransform{
  transform(items: any, searchText: String, property: string) {
    if (searchText == 'shirt') {
      return [items[0]];
    }
    return items;
  }
}

describe('ClosetManageComponent', () => {
  let debugElement: DebugElement;
  let component: ClosetManageComponent;
  let fixture: ComponentFixture<ClosetManageComponent>;
  let authenticationService: AuthenticationServiceMock;
  let closetService: ClosetServiceMock;
  let searchFilterPipe;
  let router: Router;
  let hostElement;
  let closetCardList;

  const routes = [
    { path: 'dashboard', component: MockDashboardComponent}
  ];

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes(routes),
        HttpClientTestingModule,
        FormsModule
      ],
      declarations: [
        UiBackButtonComponent,
        UiEditButtonComponent,
        UiTextButtonComponent,
        UiInputAddButtonComponent,
        UiFilterSelectComponent,
        UiCloseButtonComponent,
        ClosetCardComponent,
        ClosetManageComponent,
        SearchFilterPipeMock,
        MockDashboardComponent
      ],
      providers: [
        ClosetManageComponent,
        {provide: ClosetService, useClass: ClosetServiceMock},
        {provide: AuthenticationService, useClass: AuthenticationServiceMock},
        {provide: SearchFilterPipe, useClass: SearchFilterPipeMock}
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClosetManageComponent);
    debugElement = fixture.debugElement;
    component = debugElement.componentInstance;
    authenticationService = TestBed.get(AuthenticationService);
    closetService = TestBed.get(ClosetService);
    router = TestBed.get(Router);
    spyOn(component, 'getAllClothes').and.callThrough();
    spyOn(component, 'toggleEditMode').and.callThrough();
    spyOn(component, 'save').and.callThrough();
    spyOn(component, 'removeClothing').and.callThrough();
    spyOn(closetService, 'getAllClothes').and.callThrough();
    spyOn(closetService, 'removeClothing').and.callThrough();
    spyOn(router, 'navigate');
    hostElement = fixture.nativeElement;
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

  describe(`when removeClothing function is called`, () => {
    beforeEach(() => {
      component.removeClothing('1');
      fixture.detectChanges();
    });
    it(`should call closetService's removeClothing method
    with clothing id.`, () => {
      expect(closetService.removeClothing).toHaveBeenCalledWith('1');
    });
    it(`should call closetService's getAllClothes method
    after recieving data from removeClothing`, () => {
      expect(component.getAllClothes).toHaveBeenCalledTimes(2);
    });
  });

  describe(`when user types input in the search bar,`, () => {
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
    it(`should render changed results into closet card
      components.`, () => {
      searchInput.value = "shirt";
      searchInput.dispatchEvent(new Event('input'));
      fixture.detectChanges();
      let closetCardList = hostElement.querySelectorAll('.closet-card-item');
      expect(closetCardList.length).toEqual(1);
    });
  });

  describe(`when edit button is clicked,`, () => {
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
    it(`should hide save button when editMode is off`, () => {
      expect(saveButton.hidden).toBeFalsy();
      editButton.click();
      fixture.detectChanges();
      expect(saveButton.hidden).toBeTruthy();
    });
    it(`should call save, and toggleEditMode functions
      when save button is clicked`, () => {
      saveButton.click();
      fixture.detectChanges();
      expect(component.save).toHaveBeenCalled();
      expect(component.toggleEditMode).toHaveBeenCalled();
    });
  });

  describe(`from the init method,`, () => {
    beforeEach(() => {
      component.ngOnInit();
      fixture.detectChanges();
    });
    it(`should retrieve the current user from the
      authentication service.`, () => {
      expect(component.currentUser).toEqual(currentUser);
    });
    it(`should call the getAllClothes method, and
      set the closetList from it.`, () => {
      expect(component.getAllClothes).toHaveBeenCalled();
      expect(closetService.getAllClothes).toHaveBeenCalledWith(currentUser);
      expect(component.closetList).toEqual(closetList);
    });
    it(`should render each item in the closetList
      into closet card components`, () => {
      let closetCardList = hostElement.querySelectorAll('.closet-card-item');
      expect(closetCardList.length).toEqual(closetList.length);
    });
    it(`should have editMode as false.`, () => {
      expect(component.editMode).toBeFalsy();
    })
  });




});
