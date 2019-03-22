import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { UiCloseButtonComponent } from '../../../shared/ui-close-button/ui-close-button.component';
import { UiEditButtonComponent } from '../../../shared/ui-edit-button/ui-edit-button.component';
import { ClosetCardComponent } from './closet-card.component';
import { Clothing } from '../../../models/clothing.model';

describe('ClosetCardComponent', () => {
  let component: ClosetCardComponent;
  let fixture: ComponentFixture<ClosetCardComponent>;
  let clothing: any;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientTestingModule
      ],
      declarations: [
        UiCloseButtonComponent,
        UiEditButtonComponent,
        ClosetCardComponent
      ],
      providers: [
        ClosetCardComponent
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClosetCardComponent);
    component = fixture.debugElement.componentInstance;
    component.clothing = clothing;
    fixture.detectChanges();
  });

  it('should create', () => {
    component.clothing = clothing;
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  describe(`the closet-card-caption,`, () => {
    it(`should render clothingName.`, () => {

    });
    it(`should render clothingCost.`, () => {

    });
    it(`should render clothingWorn.`, () => {

    });
  });

  describe(`the edit button,`, () => {
    it(`should call editCard method when clicked.`, () => {

    });
    describe(`should be hidden when`, () => {
      it(`isClosetManage is false, but editMode is false.`, () => {

      });
      it(`isClosetManage is false, but editMode is true.`, () => {

      });
      it(`both isClosetManage and editMode are false.`, () => {

      });
    });
    describe(`should be visible`, () => {
      it(`when both editMode and isClosetManage is true.`, () => {

      });
    });
  });

  describe(`from the init method,`, () => {
    describe(`the isClosetManage variable,`, () => {
      it(`should be true if the current url is
        /closet-manage.`, () => {

      });
      it(`should be false if the current url is
        not /closet-manage.`, () => {

      });
    });
  });

});
