import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuyVendorTokenVendor } from './buy-vendor-token-vendor.component';

describe('BuyVendorTokenPromoCode', () => {
  let component: BuyVendorTokenVendor;
  let fixture: ComponentFixture<BuyVendorTokenVendor>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BuyVendorTokenVendor],
    }).compileComponents();

    fixture = TestBed.createComponent(BuyVendorTokenVendor);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
