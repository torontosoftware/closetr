import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormsModule } from '@angular/forms';
import { UiEditButtonComponent } from '../../../shared/ui-edit-button/ui-edit-button.component';
import { UiFilterSelectComponent } from '../../../shared/ui-filter-select/ui-filter-select.component';
import { ClosetCardComponent } from '../closet-card/closet-card.component';
import { UiCloseButtonComponent } from '../../../shared/ui-close-button/ui-close-button.component';
import { ClosetWidgetComponent } from './closet-widget.component';

describe('ClosetWidgetComponent', () => {
  let component: ClosetWidgetComponent;
  let fixture: ComponentFixture<ClosetWidgetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientTestingModule,
        FormsModule
      ],
      declarations: [
        UiEditButtonComponent,
        UiFilterSelectComponent,
        ClosetCardComponent,
        UiCloseButtonComponent,
        ClosetWidgetComponent
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClosetWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
