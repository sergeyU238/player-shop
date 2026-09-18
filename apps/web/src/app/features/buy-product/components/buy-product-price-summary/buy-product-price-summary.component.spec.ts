import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BuyProductPriceSummary } from './buy-product-price-summary.component';

describe('BuyProductPriceBlock', () => {
  let component: BuyProductPriceSummary;
  let fixture: ComponentFixture<BuyProductPriceSummary>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BuyProductPriceSummary],
    }).compileComponents();

    fixture = TestBed.createComponent(BuyProductPriceSummary);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
