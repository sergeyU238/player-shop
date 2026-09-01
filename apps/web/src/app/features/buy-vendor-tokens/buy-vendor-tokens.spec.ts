import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuyVendorTokens } from './buy-vendor-tokens';

describe('BuyVendorTokens', () => {
  let component: BuyVendorTokens;
  let fixture: ComponentFixture<BuyVendorTokens>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BuyVendorTokens],
    }).compileComponents();

    fixture = TestBed.createComponent(BuyVendorTokens);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
