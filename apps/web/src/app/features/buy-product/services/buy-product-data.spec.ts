import { TestBed } from '@angular/core/testing';

import { BuyProductData } from './buy-product-data';

describe('BuyProductData', () => {
  let service: BuyProductData;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BuyProductData);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
