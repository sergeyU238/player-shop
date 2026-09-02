import { TestBed } from '@angular/core/testing';

import { NavItems } from './nav-items.service';

describe('NavItemData', () => {
  let service: NavItems;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NavItems);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
