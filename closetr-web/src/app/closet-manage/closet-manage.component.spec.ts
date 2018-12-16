import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClosetManageComponent } from './closet-manage.component';

describe('ClosetManageComponent', () => {
  let component: ClosetManageComponent;
  let fixture: ComponentFixture<ClosetManageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClosetManageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClosetManageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
