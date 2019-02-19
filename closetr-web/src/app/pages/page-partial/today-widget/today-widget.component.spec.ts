import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AuthenticationService } from '../../../services/authentication.service';
import { RouterTestingModule } from '@angular/router/testing';
import { UiTextButtonComponent } from '../../../shared/ui-text-button/ui-text-button.component';
import { TodayWidgetComponent } from './today-widget.component';
import { User } from '../../../models/user.model';

describe('TodayWidgetComponent', () => {
  let component: TodayWidgetComponent;
  let fixture: ComponentFixture<TodayWidgetComponent>;
  let currentUser: any;

  beforeEach(async(() => {
    const mockUser = {
      userName: "Fides"
    };
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule
      ],
      declarations: [
        UiTextButtonComponent,
        TodayWidgetComponent
      ],
      providers: [
        AuthenticationService,
        {provide: User, useValue: mockUser}
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    currentUser = TestBed.get(User);
    fixture = TestBed.createComponent(TodayWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    console.log(component, currentUser);
    component.currentUser = currentUser;
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });
});
