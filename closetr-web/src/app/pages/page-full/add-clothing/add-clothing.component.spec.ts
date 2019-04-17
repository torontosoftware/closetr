import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { LogOutfitService } from '../../../services/log-outfit.service';
import { ClosetService } from '../../../services/closet.service';
import { RoutesService } from '../../../services/routes.service';
import { AuthenticationService } from '../../../services/authentication.service';
import { ClothingFormComponent } from '../clothing-form/clothing-form.component';
import { UiBackButtonComponent } from '../../../shared/ui-back-button/ui-back-button.component';
import { UiTextButtonComponent } from '../../../shared/ui-text-button/ui-text-button.component';
import { UiInputComponent } from '../../../shared/ui-input/ui-input.component';
import { UiInputSelectComponent } from '../../../shared/ui-input-select/ui-input-select.component';
import { Clothing } from '../../../models/clothing.model';
import { AddClothingComponent } from './add-clothing.component';
import {
  MockLoginComponent,
  MockClosetManageComponent,
  MockLogOutfitComponent
} from '../../../../test/components';
import {
  RoutesServiceMock,
  AuthenticationServiceMock,
  ClosetServiceMock,
  LogOutfitServiceMock
} from '../../../../test/services';
import {
  mockClothingEmpty,
  mockClothingOne
} from '../../../../test/objects';
import {
  inputDispatch
} from '../../../../test/utils';

const clothing = mockClothingOne;

describe('AddClothingComponent', () => {
  let component: AddClothingComponent;
  let fixture: ComponentFixture<AddClothingComponent>;
  let authenticationService: AuthenticationServiceMock;
  let routesService: RoutesServiceMock;
  let closetService: ClosetServiceMock;
  let logOutfitService: LogOutfitServiceMock;
  let router: Router;

  const routes = [
    { path: 'login', component: MockLoginComponent },
    { path: 'closet-manage', component: MockClosetManageComponent },
    { path: 'log-outfit', component: MockLogOutfitComponent }
  ];

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes(routes),
        FormsModule,
        HttpClientTestingModule,
        RouterTestingModule,
      ],
      declarations: [
        ClothingFormComponent,
        MockLoginComponent,
        MockClosetManageComponent,
        MockLogOutfitComponent,
        AddClothingComponent,
        UiBackButtonComponent,
        UiTextButtonComponent,
        UiInputComponent,
        UiInputSelectComponent,
      ],
      providers: [
        AddClothingComponent,
        { provide: LogOutfitService, useClass: LogOutfitServiceMock },
        { provide: ClosetService, useClass: ClosetServiceMock },
        { provide: RoutesService, useClass: RoutesServiceMock },
        { provide: AuthenticationService, useClass: AuthenticationServiceMock }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddClothingComponent);
    component = fixture.debugElement.componentInstance;
    authenticationService = TestBed.get(AuthenticationService);
    routesService = TestBed.get(RoutesService);
    closetService = TestBed.get(ClosetService);
    logOutfitService = TestBed.get(LogOutfitService);
    router = TestBed.get(Router);
    spyOn(router, 'navigate').and.callThrough();
    spyOn(closetService, 'addClothing').and.callThrough();
    spyOn(logOutfitService, 'addOutfitClothing').and.callThrough();
    fixture.detectChanges();
  });

  describe('when there is a user logged in,', () => {
    it('should create new Clothing with userID of currentUser.', () => {
      component.ngOnInit();
      fixture.detectChanges();
      fixture.whenStable().then(() => {
        expect(component.clothing).toEqual(mockClothingEmpty);
      });
    });
    describe('for prevUrl,', () => {
      it(`should retrieve the prevUrl as /log-outfit
        if the previous component was log outfit`, () => {
          expect(component.prevUrl).toEqual('/log-outfit');
          component.back();
          expect(router.navigate).toHaveBeenCalledWith(['/log-outfit']);
      });

      it(`should retrieve the prevUrl as /closet-manage
        if the previous component was closet manage`, () => {
          routesService.getPrevUrl = () => '/closet-manage';
          component.ngOnInit();
          fixture.detectChanges();
          expect(component.prevUrl).toEqual('/closet-manage');
          component.back();
          expect(router.navigate).toHaveBeenCalledWith(['/closet-manage']);
      });

      it(`should set the prevUrl as /closet-manage
        if there is no previous component`, () => {
          routesService.getPrevUrl = () => null;
          component.ngOnInit();
          fixture.detectChanges();
          expect(component.prevUrl).toEqual('/closet-manage');
          component.back();
          expect(router.navigate).toHaveBeenCalledWith(['/closet-manage']);
      });
    });

    describe(`when save function is called with correct data,`, () => {
      beforeEach(() => {
        clothing.clothingName = 'name';
        clothing.clothingPurchaseDate = '2019-01-02';
        component.save();
        fixture.detectChanges();
      });
      it('should call closetService.addClothing.', () => {
        expect(closetService.addClothing).toHaveBeenCalled();
      });
      describe(`when data comes back,`, () => {
        describe(`and the prev page was log outfit,`, () => {
          beforeEach(() => {
            component.save();
            fixture.detectChanges();
          })
          it(`should call logOutfitService.addOutfitClothing with
            the proper params`, () => {
            expect(logOutfitService.addOutfitClothing).toHaveBeenCalled();
          });
          it(`after calling logOutfitService.addOutfitClothing,
            go back to the log outfit page.`, () => {
            expect(router.navigate).toHaveBeenCalledWith(['/log-outfit']);
          });
        });
        describe(`and the prev page was closet manage`, () => {
          it(`should go back to the closet manage page.`, () => {
            component.prevUrl = '/closet-manage';
            fixture.detectChanges();
            component.save();
            expect(router.navigate).toHaveBeenCalledWith(['/closet-manage']);
          });
        });
      });
    });
  });
  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
