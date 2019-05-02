import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { UiCloseButtonComponent } from './ui-close-button.component';
import { UiIconSizedComponent } from '../ui-icon-sized/ui-icon-sized.component';
import { inputChangeTestClassname } from '../../../test/utils';

describe('UiCloseButtonComponent', () => {
  let component: UiCloseButtonComponent;
  let fixture: ComponentFixture<UiCloseButtonComponent>;
  let hostElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        UiIconSizedComponent,
        UiCloseButtonComponent
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UiCloseButtonComponent);
    component = fixture.debugElement.componentInstance;
    hostElement = fixture.nativeElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it(`should have default type, buttonLink, hidden (state), and size
    when not specified.`, () => {
    expect(component.type).toEqual('button');
    expect(component.buttonLink).toEqual('/');
    expect(component.hidden).toEqual(false);
    expect(component.size).toEqual('lg');
  });

  const inputClassnameTest = (subject, inputType, inputValue, className) =>
    inputChangeTestClassname(component, fixture);

  describe(`for inputs affecting button class,`, () => {
    let button;
    beforeEach(() => {
      button = hostElement.querySelector('button.btn-close');
    });
    it(`when hidden is true, should be disabled, and have 'display-none'
      class applied to button.`, () => {
      inputClassnameTest(button, 'hidden', true, 'display-none');
    });
    it(`when type is 'closet-card', should have 'closet-card-icon-close' class
      applied to button.`, () => {
      inputClassnameTest(button, 'type', 'closet-card',
        'closet-card-icon-close');
    });
  });

  it(`ui-icon-sized should be given correct parameters.`, () => {
    let iconSized = fixture.debugElement.query(
      By.css('i')).componentInstance;
    expect(iconSized.className).toEqual('material-icons icon-white icon-close');
    expect(iconSized.size).toEqual('lg');
  });
});
