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
  new Clothing({clothingName: 'tshirt'}),
  new Clothing({clothingName: 'jeans'}),
  new Clothing({clothingName: 'shoes'})
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

describe('ClosetManageComponent', () => {
  let debugElement: DebugElement;
  let component: ClosetManageComponent;
  let fixture: ComponentFixture<ClosetManageComponent>;
  let authenticationService: AuthenticationServiceMock;
  let closetService: ClosetServiceMock;
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
    spyOn(closetService, 'getAllClothes').and.callThrough();
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

  describe(`when edit button is clicked,`, () => {
    let editButton;
    beforeEach(() => {
      component.ngOnInit();
      editButton = hostElement.querySelector('#edit-button button');
      editButton.click();
      fixture.detectChanges();
    });
    it(`should call toggleEditMode method, and
      change the editMode variable (multiple toggles)`, () => {
      expect(component.toggleEditMode).toHaveBeenCalled();
      expect(component.editMode).toBeTruthy();
      editButton.click();
      fixture.detectChanges();
      expect(component.toggleEditMode).toHaveBeenCalled();
      expect(component.editMode).toBeFalsy();
      editButton.click();
      fixture.detectChanges();
      expect(component.toggleEditMode).toHaveBeenCalled();
      expect(component.editMode).toBeTruthy();
    });
  });

  describe(`from the init method,`, () => {
    beforeEach(() => {
      debugElement.componentInstance.ngOnInit();
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
      let closetCardList = hostElement.querySelectorAll('.closet-card-item')
      expect(closetCardList.length).toEqual(closetList.length);
    });
    it(`should have editMode as false.`, () => {
      expect(component.editMode).toBeFalsy();
    })
  });




});
