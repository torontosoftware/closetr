import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { UiCloseButtonComponent } from './ui-close-button.component';

describe('UiCloseButtonComponent', () => {
  let component: UiCloseButtonComponent;
  let fixture: ComponentFixture<UiCloseButtonComponent>;
  let hostElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({ declarations: [ UiCloseButtonComponent ]})
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

  const inputClassnameTest = (subject, inputType, inputValue, className) => {
    component[inputType] = inputValue;
    fixture.detectChanges();
    expect(subject.className.includes(className)).toBeTruthy();
  }

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
      inputClassnameTest(button, 'type', 'closet-card', 'closet-card-icon-close');
    });
  });

  describe(`for inputs affecting icon class,`, () => {
    let icon;
    beforeEach(() => {
      icon = hostElement.querySelector('i.icon-close');
    });
    it(`icon should have 'icon-lg' class when size is 'lg.'`, () => {
      inputClassnameTest(icon, 'size', 'lg', 'icon-lg');
    });
    it(`icon should have 'icon-md' class when size is 'md.'`, () => {
      inputClassnameTest(icon, 'size', 'md', 'icon-md');
    });
  });
});
