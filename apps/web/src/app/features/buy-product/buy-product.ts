import { Component, inject, input, signal } from '@angular/core';
import { Product, type ProductItem } from '../../entities/product';
import { BuyProductData } from './services/buy-product-data';
import {
  type BuyProductAction,
  BuyProductForm,
} from './components/buy-product-form/buy-product-form';
import { Router } from '@angular/router';

@Component({
  selector: 'app-buy-product',
  imports: [Product, BuyProductForm],
  templateUrl: './buy-product.html',
  styleUrl: './buy-product.scss',
  providers: [BuyProductData],
})
export class BuyProduct {
  public readonly product = input.required<ProductItem>();

  private readonly buyProductData = inject(BuyProductData);
  private readonly router = inject(Router);

  protected readonly isPaymentError = signal(false);

  buyProduct({ productId, promoCode }: BuyProductAction) {
    this.buyProductData
      .buyProduct(productId, promoCode)
      .subscribe(({ item, error }) => {
        if (error || !item) {
          console.error(error);
          return;
        }
        this.router.navigate(['/order', item.id], { replaceUrl: true });
      });
  }
}
