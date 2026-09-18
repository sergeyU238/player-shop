import { Component, computed, input } from '@angular/core';
import {
  applyPromoCode,
  type PromoCodeItem,
} from '../../../../entities/promo-code';
import { currencyList } from '../../../../shared/model/currency';
import { type ProductItem } from '../../../../entities/product';
import { CurrencyIcon } from '../../../../shared/ui/currency-icon';

@Component({
  selector: 'app-buy-product-price-summary',
  imports: [CurrencyIcon, CurrencyIcon],
  templateUrl: './buy-product-price-summary.component.html',
  styleUrl: './buy-product-price-summary.component.scss',
})
export class BuyProductPriceSummary {
  protected readonly currencyList = currencyList;
  public readonly promoCode = input<PromoCodeItem | null>();
  public readonly product = input.required<ProductItem>();
  public readonly price = computed(() => {
    const product = this.product();
    const promoCode = this.promoCode();
    const amount = promoCode
      ? applyPromoCode(product, promoCode)
      : product.price;

    return {
      amount,
      currencyCode: product.currencyCode,
    };
  });
}
