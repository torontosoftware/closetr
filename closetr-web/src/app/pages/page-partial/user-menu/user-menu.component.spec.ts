import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { UserMenuComponent } from './user-menu.component';

describe('UserMenuComponent', () => {
  let component: UserMenuComponent;
  let fixture: ComponentFixture<UserMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserMenuComponent ],
      imports: [ RouterTestingModule ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
