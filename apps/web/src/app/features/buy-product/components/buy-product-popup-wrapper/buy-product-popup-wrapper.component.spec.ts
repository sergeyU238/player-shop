import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BuyProductPopupWrapper } from './buy-product-popup-wrapper.component';

describe('BuyProductPopup', () => {
  let component: BuyProductPopupWrapper;
  let fixture: ComponentFixture<BuyProductPopupWrapper>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BuyProductPopupWrapper],
    }).compileComponents();

    fixture = TestBed.createComponent(BuyProductPopupWrapper);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
