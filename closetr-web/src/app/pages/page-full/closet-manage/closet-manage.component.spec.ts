import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';
import { Injectable, Component, DebugElement, Pipe, PipeTransform } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthenticationService } from '../../../services/authentication.service';
import { SearchFilterPipe } from '../../../pipes/search-filter.pipe';
import { UiBackButtonComponent } from '../../../shared/ui-back-button/ui-back-button.component';
import { UiEditButtonComponent } from '../../../shared/ui-edit-button/ui-edit-button.component';
import { UiTextButtonComponent } from '../../../shared/ui-text-button/ui-text-button.component';
import { UiInputAddButtonComponent } from '../../../shared/ui-input-add-button/ui-input-add-button.component';
import { UiFilterSelectComponent } from '../../../shared/ui-filter-select/ui-filter-select.component';
import { UiCloseButtonComponent } from '../../../shared/ui-close-button/ui-close-button.component';
import { ClosetCardComponent } from '../../page-partial/closet-card/closet-card.component';
import { ClosetManageComponent } from './closet-manage.component';

@Injectable({
  providedIn: 'root'
})
class AuthenticationServiceMock {
  currentUser = of('fides');
}

@Pipe({name: 'filter'})
class SearchFilterPipeMock implements PipeTransform{
  transform(items: any, searchText: String, property: string) {
    return ;
  }
}

describe('ClosetManageComponent', () => {
  let debugElement: DebugElement;
  let fixture: ComponentFixture<ClosetManageComponent>;
  let authenticationService: AuthenticationServiceMock;

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
        {provide: AuthenticationService, useClass: AuthenticationServiceMock},
        {provide: SearchFilterPipe, useClass: SearchFilterPipeMock}
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClosetManageComponent);
    debugElement = fixture.debugElement;
    authenticationService = TestBed.get(AuthenticationService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(debugElement.componentInstance).toBeTruthy();
  });

  describe(`from the init method,`, () => {
    beforeEach(() => {
      debugElement.componentInstance.ngOnInit();
    });
    it(`should retrieve the current user from the
      authentication service.`, () => {

    });
    it(`should be call the getAllClothes method, and
      set the closetList from it.`, () => {

    });
    it(`should render each item in the closetList
      into closet card components`, () => {

    });
  });


});
