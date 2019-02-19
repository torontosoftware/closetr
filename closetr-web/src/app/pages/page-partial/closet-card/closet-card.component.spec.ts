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
    const mockClothing = {
      clothingID: "12345",
      clothingName: "Aritzia TShirt",
      clothingCost: 140,
      clothingWorn: 4
    };
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
        {provide: Clothing, useValue: mockClothing}
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    clothing = TestBed.get(clothing);
    console.log(clothing,"henloooooooooooooooo");
    fixture = TestBed.createComponent(ClosetCardComponent);
    component = fixture.componentInstance;
    component.clothing = clothing;
    console.log("hi",fixture, component);
    fixture.detectChanges();
  });

  it('should create', () => {
    console.log("fefefefefe");
    component.clothing = clothing;
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });
});
