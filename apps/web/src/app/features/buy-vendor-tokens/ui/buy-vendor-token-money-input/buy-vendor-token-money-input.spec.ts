import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuyVendorTokenMoneyInput } from './buy-vendor-token-money-input';

describe('BuyVendorTokenMoneyInput', () => {
  let component: BuyVendorTokenMoneyInput;
  let fixture: ComponentFixture<BuyVendorTokenMoneyInput>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BuyVendorTokenMoneyInput],
    }).compileComponents();

    fixture = TestBed.createComponent(BuyVendorTokenMoneyInput);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
