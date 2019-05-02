import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { UiIconSizedComponent } from '../ui-icon-sized/ui-icon-sized.component';
import { UiEditButtonComponent } from './ui-edit-button.component';
import {
  inputChangeTestClassname,
  uiIconSizedTest
} from '../../../test/utils';

describe('UiEditButtonComponent', () => {
  let component: UiEditButtonComponent;
  let fixture: ComponentFixture<UiEditButtonComponent>;
  let hostElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        UiEditButtonComponent,
        UiIconSizedComponent
      ],
      imports: [ RouterTestingModule ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UiEditButtonComponent);
    component = fixture.componentInstance;
    hostElement = fixture.nativeElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it(`ui-icon-sized should be given correct parameters.`, () => {
    uiIconSizedTest(fixture, 'lg', 'material-icons');
  });
});
