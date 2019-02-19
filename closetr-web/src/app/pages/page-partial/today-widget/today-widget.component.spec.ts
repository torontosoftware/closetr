import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { UiTextButtonComponent } from '../../../shared/ui-text-button/ui-text-button.component';
import { TodayWidgetComponent } from './today-widget.component';
import { User } from '../../../models/user.model';

describe('TodayWidgetComponent', () => {
  let component: TodayWidgetComponent;
  let fixture: ComponentFixture<TodayWidgetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule
      ],
      declarations: [
        UiTextButtonComponent,
        TodayWidgetComponent
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TodayWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
