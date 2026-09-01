import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VendorItem } from './vendor-item';

describe('VendorItem', () => {
  let component: VendorItem;
  let fixture: ComponentFixture<VendorItem>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VendorItem],
    }).compileComponents();

    fixture = TestBed.createComponent(VendorItem);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
