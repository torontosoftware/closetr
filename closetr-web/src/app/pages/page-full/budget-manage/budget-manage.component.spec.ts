import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { UiBackButtonComponent } from '../../../shared/ui-back-button/ui-back-button.component';
import { UiEditButtonComponent } from '../../../shared/ui-edit-button/ui-edit-button.component';
import { UiTextButtonComponent } from '../../../shared/ui-text-button/ui-text-button.component';
import { UiSelectAddButtonComponent } from '../../../shared/ui-select-add-button/ui-select-add-button.component';
import { UiInputAddTextComponent } from '../../../shared/ui-input-add-text/ui-input-add-text.component';
import { BudgetManageComponent } from './budget-manage.component';

describe('BudgetManageComponent', () => {
  let component: BudgetManageComponent;
  let fixture: ComponentFixture<BudgetManageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule,
        RouterTestingModule
      ],
      declarations: [
        UiBackButtonComponent,
        UiEditButtonComponent,
        UiTextButtonComponent,
        UiSelectAddButtonComponent,
        UiInputAddTextComponent,
        BudgetManageComponent
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BudgetManageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
