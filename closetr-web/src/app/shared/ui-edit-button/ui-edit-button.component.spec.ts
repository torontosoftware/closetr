import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { UiIconSizedComponent } from '../ui-icon-sized/ui-icon-sized.component';
import { UiEditButtonComponent } from './ui-edit-button.component';
import {
  inputChangeTestClassname,
  uiIconSizedTest,
  clickTest,
  clickAndTestNavigate
} from '../../../test/utils';
import {
  iconButtonDefaults
} from '../../../test/common-tests';
import {
  MockDashboardComponent
} from '../../../test/components';

describe('UiEditButtonComponent', () => {
  let component: UiEditButtonComponent;
  let fixture: ComponentFixture<UiEditButtonComponent>;
  let router: Router;
  let hostElement;

  const routes = [
    { path: 'dashboard', component: MockDashboardComponent }
  ];

  const url = '/dashboard';

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        MockDashboardComponent,
        UiEditButtonComponent,
        UiIconSizedComponent
      ],
      imports: [ RouterTestingModule.withRoutes(routes) ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UiEditButtonComponent);
    component = fixture.componentInstance;
    hostElement = fixture.nativeElement;
    router = TestBed.get(Router);
    spyOn(component, 'buttonClick').and.callThrough();
    spyOn(router, 'navigate');
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  const inputClassnameTest = (subject, inputType, inputValue, className) =>
    inputChangeTestClassname(component, fixture);

  describe(`for button,`, () => {
    let button;
    beforeEach(() => {
      button = hostElement.querySelector('button.icon-edit');
    });
    it(`when hidden is true, should have 'display-none'
      class applied to button.`, () => {
      inputClassnameTest(button, 'hidden', true, 'display-none');
    });
    it(`when type is 'closet-card', should have 'closet-card-icon-edit' class
      applied to button.`, () => {
      inputClassnameTest(button, 'type', 'closet-card',
        'closet-card-icon-edit');
    });
    describe(`buttonClick(),`, () => {
      it(`should be called when button is clicked.`, () => {
        clickTest(button, fixture);
      });
      it(`should navigate to buttonLink when type is 'link.'`, () => {
        component.type = 'link';
        component.buttonLink = url;
        clickAndTestNavigate(button, router, '/dashboard', fixture);
      });
    });
  });

  it(`should have default type, buttonLink, hidden (state), and size
    when not specified.`, () => {
    iconButtonDefaults(component);
  });

  it(`ui-icon-sized should be given correct parameters.`, () => {
    uiIconSizedTest(fixture, 'lg', 'material-icons');
  });
});
