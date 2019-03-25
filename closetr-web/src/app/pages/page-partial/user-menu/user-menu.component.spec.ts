import { async, ComponentFixture, TestBed } from '@angular/core/testing';
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
    it(`should render from my-profile link.`, () => {

    });
    it(`should render from settings link.`, () => {

    });
    it(`should render from sign-out link.`, () => {

    });
  });

  describe(`the navClick() function,`, () => {
    it(`should be called with '/profile' when
      the profile link button is clicked.`, () => {

    });
    it(`should be called with '/settings' when
      the settings link button is clicked.`, () => {

    });
    it(`should be called with '/sign-out' when
      the sign-out link button is clicked.`, () => {

    });
    describe(`when called with a link,`, () => {
      it(`should navigate to /profile and call close(),
        when it is called with /profile.`, () => {

      });
      it(`should call logout() and then close(),
        when it is called with /sign-out.`, () => {

      });
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
      emit function,` () => {

    });
  });

});
