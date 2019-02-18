import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BaseGeneralComponent } from './base-general.component';

describe('BaseGeneralComponent', () => {
  let component: BaseGeneralComponent;
  let fixture: ComponentFixture<BaseGeneralComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BaseGeneralComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BaseGeneralComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
