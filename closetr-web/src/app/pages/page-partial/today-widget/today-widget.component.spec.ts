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
  let mockUser: any;
  let currentUser: any;

  beforeEach(async(() => {
    mockUser = {
      userName: "Fides",
      userID: "fideslinga"
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
        {provide: User, useValue: mockUser},
        AuthenticationService
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TodayWidgetComponent);
    component = fixture.componentInstance;
    currentUser = TestBed.get(User);
    fixture.detectChanges();
  });

  it('should create', () => {
    currentUser.userName = "Fides";
    expect(component).toBeTruthy();
  });
});
