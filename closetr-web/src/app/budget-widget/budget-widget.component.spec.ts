import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BudgetWidgetComponent } from './budget-widget.component';

describe('BudgetWidgetComponent', () => {
  let component: BudgetWidgetComponent;
  let fixture: ComponentFixture<BudgetWidgetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BudgetWidgetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BudgetWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
