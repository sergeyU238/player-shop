import { TestBed } from '@angular/core/testing';

import { BuyProductPopup } from './buy-product-popup';

describe('BuyProductPopup', () => {
  let service: BuyProductPopup;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BuyProductPopup);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
