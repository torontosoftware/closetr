import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Injectable } from '@angular/core';
import { By } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AuthenticationService } from '../../../services/authentication.service';
import { UiPopupMenuItemComponent } from '../../../shared/ui-popup-menu-item/ui-popup-menu-item.component';
import { UserMenuComponent } from './user-menu.component';
import {
  MockProfileComponent,
  MockLoginComponent
} from '../../../../test/components';

@Injectable({
  providedIn: 'root'
})
class AuthenticationServiceMock {
  logout = () => { return };
}

describe('UserMenuComponent', () => {
  let component: UserMenuComponent;
  let fixture: ComponentFixture<UserMenuComponent>;
  let router: Router;
  let hostElement;
  let authenticationService: AuthenticationService;

  const routes = [
    { path: 'profile', component: MockProfileComponent },
    { path: 'login', component: MockLoginComponent }
  ];

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        MockProfileComponent,
        MockLoginComponent,
        UiPopupMenuItemComponent,
        UserMenuComponent
      ],
      imports: [
        RouterTestingModule.withRoutes(routes),
        HttpClientTestingModule
      ],
      providers: [
        UserMenuComponent,
        { provide: AuthenticationService, useClass: AuthenticationServiceMock }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserMenuComponent);
    component = fixture.debugElement.componentInstance;
    router = TestBed.get(Router);
    hostElement = fixture.nativeElement;
    authenticationService = TestBed.get(AuthenticationService);
    spyOn(component, 'navClick').and.callThrough();
    spyOn(component, 'close').and.callThrough();
    spyOn(component, 'logout').and.callThrough();
    spyOn(component.closeUserMenuEmit, 'emit');
    spyOn(router, 'navigate').and.callThrough();
    spyOn(authenticationService, 'logout');
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe(`the ui-popup-menu-item`, () => {
    describe(`for my-profile link,`, () => {
      let profileMenuItem;
      beforeEach(() => {
        profileMenuItem = fixture.debugElement.query(
          By.css('#profile-menu-item')
        ).componentInstance;
      });
      it(`should render.`, () => {
        expect(profileMenuItem).toBeTruthy();
        expect(profileMenuItem.labelText).toEqual('My Profile');
      });
      it(`should call navClick() with '/profile' when
        clicked.`, () => {
        let profileMenuItemButton = hostElement.querySelector('#profile-menu-item button');
        profileMenuItemButton.click();
        fixture.detectChanges();
        expect(component.navClick).toHaveBeenCalledWith('/profile');
      });
    });
    describe(`for settings link,`, () => {
      let settingsMenuItem;
      beforeEach(() => {
        settingsMenuItem = fixture.debugElement.query(
          By.css('#settings-menu-item')
        ).componentInstance;
      })
      it(`should render.`, () => {
        expect(settingsMenuItem).toBeTruthy();
        expect(settingsMenuItem.labelText).toEqual('Settings');
      });
      it(`should call navClick() with '/settings' when
        clicked.`, () => {
        let settingsMenuItemButton = hostElement.querySelector('#settings-menu-item button');
        settingsMenuItemButton.click();
        fixture.detectChanges();
        expect(component.navClick).toHaveBeenCalledWith('/settings');
      });
    });
    describe(`for sign-out link,`, () => {
      let signoutMenuItem;
      beforeEach(() => {
        signoutMenuItem = fixture.debugElement.query(
          By.css('#signout-menu-item')
        ).componentInstance;
      });
      it(`should render.`, () => {
        expect(signoutMenuItem).toBeTruthy();
        expect(signoutMenuItem.labelText).toEqual('Sign Out');
      });
      it(`should call navClick() with '/sign-out' when
        clicked.`, () => {
        let signoutMenuItemButton = hostElement.querySelector('#signout-menu-item button');
        signoutMenuItemButton.click();
        fixture.detectChanges();
        expect(component.navClick).toHaveBeenCalledWith('/sign-out');
      });
    });

    it(`should render from sign-out link.`, () => {
      let signoutMenuItem = fixture.debugElement.query(
        By.css('#signout-menu-item')
      ).componentInstance;
      expect(signoutMenuItem).toBeTruthy();
      expect(signoutMenuItem.labelText).toEqual('Sign Out');
    });
  });

  describe(`the navClick() function,`, () => {
    it(`should navigate to /profile and call close(),
      when it is called with /profile.`, () => {
      component.navClick('/profile');
      expect(router.navigate).toHaveBeenCalledWith(['/profile']);
      expect(component.close).toHaveBeenCalled();
    });
    it(`should call logout() and then close(),
      when it is called with /sign-out.`, () => {
      component.navClick('/sign-out');
      expect(component.logout).toHaveBeenCalled();
      expect(component.close).toHaveBeenCalled();
    });
  });

  describe(`the logout() function,`, () => {
    beforeEach(() => {
      component.logout();
    });
    it(`should call authentication service's
      logout function.`, () => {
      expect(authenticationService.logout).toHaveBeenCalled();
    });
    it(`should navigate to login page.`, () => {
      expect(router.navigate).toHaveBeenCalledWith(['/login']);
    });
  });

  describe(`the close() function`, () => {
    beforeEach(() => {
      component.close();
    });
    it(`should call closeUserMenuEmit's
      emit function,`, () => {
      expect(component.closeUserMenuEmit.emit).toHaveBeenCalled();
    });
  });

});
