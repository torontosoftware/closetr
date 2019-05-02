import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { UiIconSizedComponent } from './ui-icon-sized.component';

describe('UiIconSizedComponent', () => {
  let component: UiIconSizedComponent;
  let fixture: ComponentFixture<UiIconSizedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({declarations: [ UiIconSizedComponent ]})
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UiIconSizedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
