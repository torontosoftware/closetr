import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SpendingManageComponent } from './spending-manage.component';

describe('SpendingManageComponent', () => {
  let component: SpendingManageComponent;
  let fixture: ComponentFixture<SpendingManageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SpendingManageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpendingManageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
