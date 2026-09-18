import { Component, computed, inject, input, signal } from '@angular/core';
import { Product, ProductItem } from '../../entities/product';
import { MatButton } from '@angular/material/button';
import {
  MatError,
  MatFormField,
  MatInput,
  MatLabel,
} from '@angular/material/input';
import {
  form,
  FormField,
  FormRoot,
  minLength,
  validateAsync,
} from '@angular/forms/signals';
import { BuyProductData } from './services/buy-product-data';
import {
  PROMO_CODE_MIN_LENGTH,
  PromoCodeData,
  type PromoCodeItem,
  type PromoCodeResponse,
} from '../../entities/promo-code';
import { firstValueFrom } from 'rxjs';
import { BuyProductPriceSummary } from './components/buy-product-price-summary/buy-product-price-summary.component';

export type BuyProductPromoForm = {
  code: string;
};

@Component({
  selector: 'app-buy-product',
  imports: [
    Product,
    MatButton,
    MatError,
    MatFormField,
    MatInput,
    MatLabel,
    FormField,
    FormRoot,
    BuyProductPriceSummary,
    BuyProductPriceSummary,
    BuyProductPriceSummary,
  ],
  templateUrl: './buy-product.html',
  styleUrl: './buy-product.scss',
  providers: [BuyProductData, PromoCodeData],
})
export class BuyProduct {
  private readonly promoCodeData = inject(PromoCodeData);
  private readonly buyProductData = inject(BuyProductData);
  private readonly promoModel = signal<BuyProductPromoForm>({ code: '' });
  private readonly promoCodeResource = this.promoCodeData.createResource(
    this.promoModel,
  );
  protected readonly promoCode = computed<PromoCodeItem | null>(
    () => this.promoCodeResource.value()?.item ?? null,
  );
  public readonly product = input.required<ProductItem>();
  protected readonly promoForm = form(
    this.promoModel,
    (schemaPath) => {
      minLength(schemaPath.code, PROMO_CODE_MIN_LENGTH, {
        message: 'Промо код слишком короткий',
      });
      validateAsync(schemaPath.code, {
        debounce: 300,
        when: ({ value }) => value().length >= PROMO_CODE_MIN_LENGTH,
        params: ({ value }) => ({ code: value() }),
        factory: () => this.promoCodeResource,
        onSuccess: ({ item, error }: PromoCodeResponse, { value }) => {
          if ((error || !item) && value().length >= PROMO_CODE_MIN_LENGTH) {
            return {
              kind: 'codeError',
              message: 'Промокод не найден',
            };
          }
          return null;
        },
        onError: (_error) => ({
          kind: 'codeError',
          message: 'Промокод не найден',
        }),
      });
    },
    {
      submission: {
        action: async (field) => {
          if (this.promoForm().valid()) {
            const productId = this.product().id;
            const promocode = field().value().code;
            await firstValueFrom(
              this.buyProductData.buyProduct(productId, promocode),
            );
          }
        },
        ignoreValidators: 'none',
      },
    },
  );
}
