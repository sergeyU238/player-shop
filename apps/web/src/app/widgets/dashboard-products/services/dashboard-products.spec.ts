import { TestBed } from '@angular/core/testing';

import { DashboardProductsData } from './dashboard-products-data.service';

describe('DashboardProducts', () => {
  let service: DashboardProductsData;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DashboardProductsData);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
