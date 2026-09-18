import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CurrencyIcon } from './currency-icon';

describe('CurrencyIcon', () => {
  let component: CurrencyIcon;
  let fixture: ComponentFixture<CurrencyIcon>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CurrencyIcon],
    }).compileComponents();

    fixture = TestBed.createComponent(CurrencyIcon);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
