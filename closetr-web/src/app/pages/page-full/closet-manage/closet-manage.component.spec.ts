import { async, ComponentFixture, TestBed } from '@angular/core/testing';
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

@Pipe({name: 'filter'})
class SearchFilterPipeMock implements PipeTransform{
  transform(items: any, searchText: String, property: string) {
    return ;
  }
}

describe('ClosetManageComponent', () => {
  let debugElement: DebugElement;
  let component: ClosetManageComponent;
  let fixture: ComponentFixture<ClosetManageComponent>;
  let authenticationService: AuthenticationServiceMock;
  let closetService: ClosetServiceMock;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
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
        SearchFilterPipeMock
      ],
      providers: [
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
    spyOn(component, 'getAllClothes').and.callThrough();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
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
      expect(component.closetList).toEqual(closetList);
    });
    it(`should render each item in the closetList
      into closet card components`, () => {

    });
  });


});
