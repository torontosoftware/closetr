import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { UiIconSizedComponent } from './ui-icon-sized.component';
import { inputChangeTestClassname } from '../../../test/utils';

describe('UiIconSizedComponent', () => {
  let component: UiIconSizedComponent;
  let fixture: ComponentFixture<UiIconSizedComponent>;
  let hostElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({declarations: [ UiIconSizedComponent ]})
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UiIconSizedComponent);
    component = fixture.debugElement.componentInstance;
    hostElement = fixture.nativeElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  const inputClassnameTest = (subject, inputType, inputValue, className) =>
    inputChangeTestClassname(component, fixture);

  describe(`for inputs affecting icon class,`, () => {
    let icon;
    beforeEach(() => {
      icon = hostElement.querySelector('i');
    });
    it(`icon should have 'icon-lg' class when size is 'lg.'`, () => {
      inputClassnameTest(icon, 'size', 'lg', 'icon-lg');
    });
    it(`icon should have 'icon-md' class when size is 'md.'`, () => {
      inputClassnameTest(icon, 'size', 'md', 'icon-md');
    });
  });


});
