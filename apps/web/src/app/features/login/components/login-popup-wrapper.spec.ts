import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginPopupWrapper } from './login-popup-wrapper';

describe('LoginPopupWrapper', () => {
  let component: LoginPopupWrapper;
  let fixture: ComponentFixture<LoginPopupWrapper>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoginPopupWrapper],
    }).compileComponents();

    fixture = TestBed.createComponent(LoginPopupWrapper);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
