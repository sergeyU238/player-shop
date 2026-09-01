import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuyVendorTokenPromoCode } from './buy-vendor-token-promo-code';

describe('BuyVendorTokenPromoCode', () => {
  let component: BuyVendorTokenPromoCode;
  let fixture: ComponentFixture<BuyVendorTokenPromoCode>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BuyVendorTokenPromoCode],
    }).compileComponents();

    fixture = TestBed.createComponent(BuyVendorTokenPromoCode);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
