import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../../../shared/shared.module';
import { AuthenticationService } from '../../../services/authentication.service';
import { ClosetService } from '../../../services/closet.service';
import { ClosetCardComponent } from '../closet-card/closet-card.component';
import { ClosetWidgetComponent } from './closet-widget.component';
import {
  MockClosetManageComponent
} from '../../../../test/components';
import {
  sortOptions,
  filterOptions,
  mockClosetList,
  mockUserOne
} from '../../../../test/objects';
import {
  AuthenticationServiceMock,
  ClosetServiceMock
} from '../../../../test/services';

const closetList = mockClosetList;
const currentUser = mockUserOne;

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
        FormsModule,
        SharedModule
      ],
      declarations: [
        MockClosetManageComponent,
        ClosetCardComponent,
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
      expect(component.filterOptions).toEqual(filterOptions);
    });
    it(`should retrieve sortOptions from closet service.`, () => {
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
