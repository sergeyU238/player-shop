import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuyVendorTokenLoginInput } from './buy-vendor-token-login-input';

describe('BuyVendorTokenLoginInput', () => {
  let component: BuyVendorTokenLoginInput;
  let fixture: ComponentFixture<BuyVendorTokenLoginInput>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BuyVendorTokenLoginInput],
    }).compileComponents();

    fixture = TestBed.createComponent(BuyVendorTokenLoginInput);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
