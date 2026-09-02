import { TestBed } from '@angular/core/testing';

import { NavPopup } from './nav-popup';

describe('NavPopup', () => {
  let service: NavPopup;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NavPopup);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
