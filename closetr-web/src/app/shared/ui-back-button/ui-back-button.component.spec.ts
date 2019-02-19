import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { UiBackButtonComponent } from './ui-back-button.component';
import { RouterTestingModule } from '@angular/router/testing';

describe('UiBackButtonComponent', () => {
  let component: UiBackButtonComponent;
  let fixture: ComponentFixture<UiBackButtonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UiBackButtonComponent ],
      imports: [ RouterTestingModule ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UiBackButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
