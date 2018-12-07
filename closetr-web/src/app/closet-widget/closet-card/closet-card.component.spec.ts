import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClosetCardComponent } from './closet-card.component';

describe('ClosetCardComponent', () => {
  let component: ClosetCardComponent;
  let fixture: ComponentFixture<ClosetCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClosetCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClosetCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
