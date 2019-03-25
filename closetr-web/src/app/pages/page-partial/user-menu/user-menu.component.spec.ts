import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { UiPopupMenuItemComponent } from '../../../shared/ui-popup-menu-item/ui-popup-menu-item.component';
import { UserMenuComponent } from './user-menu.component';

describe('UserMenuComponent', () => {
  let component: UserMenuComponent;
  let fixture: ComponentFixture<UserMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        UiPopupMenuItemComponent,
        UserMenuComponent
      ],
      imports: [
        RouterTestingModule,
        HttpClientTestingModule
      ],
      providers: [
        UserMenuComponent
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe(`the ui-popup-menu-item`, () => {
    describe(`for my-profile link,`, () => {
      it(`should render.`, () => {
        let profileMenuItem = fixture.debugElement.query(
          By.css('#profile-menu-item')
        ).componentInstance;
        expect(profileMenuItem).toBeTruthy();
        expect(profileMenuItem.labelText).toEqual('My Profile');
      });
      it(`should be called with '/profile' when
        clicked.`, () => {

      });
    });
    describe(`for settings link,`, () => {
      it(`should render.`, () => {
        let settingsMenuItem = fixture.debugElement.query(
          By.css('#settings-menu-item')
        ).componentInstance;
        expect(settingsMenuItem).toBeTruthy();
        expect(settingsMenuItem.labelText).toEqual('Settings');
      });
      it(`should be called with '/profile' when
        clicked.`, () => {

      });
    });
    describe(`for sign-out link,`, () => {
      it(`should render.`, () => {
        let signoutMenuItem = fixture.debugElement.query(
          By.css('#signout-menu-item')
        ).componentInstance;
        expect(signoutMenuItem).toBeTruthy();
        expect(signoutMenuItem.labelText).toEqual('Sign Out');
      });
      it(`should be called with '/sign-out' when
        clicked.`, () => {

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

    });
    it(`should call logout() and then close(),
      when it is called with /sign-out.`, () => {

    });
  });

  describe(`the logout() function,`, () => {
    it(`should call authentication service's
      logout function.`, () => {

    });
    it(`should navigate to login page.`, () => {

    });
  });

  describe(`the close() function`, () => {
    it(`should call closeUserMenuEmit's
      emit function,`, () => {

    });
  });

});
