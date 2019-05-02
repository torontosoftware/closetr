import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { UiBackButtonComponent } from './ui-back-button.component';
import { RouterTestingModule } from '@angular/router/testing';
import { MockDashboardComponent } from '../../../test/components';
import { clickAndTestNavigate } from '../../../test/utils';

describe('UiBackButtonComponent', () => {
  let component: UiBackButtonComponent;
  let fixture: ComponentFixture<UiBackButtonComponent>;
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
        UiBackButtonComponent
      ],
      imports: [ RouterTestingModule.withRoutes(routes) ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UiBackButtonComponent);
    component = fixture.debugElement.componentInstance;
    hostElement = fixture.nativeElement;
    router = TestBed.get(Router);
    spyOn(router, 'navigate');
    component.url = url;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it(`clicking back button should navigate to previous url.`, () => {
    clickAndTestNavigate(
      hostElement.querySelector('button.btn-back'),
      router,
      '/dashboard',
      fixture
    );
  });
});
