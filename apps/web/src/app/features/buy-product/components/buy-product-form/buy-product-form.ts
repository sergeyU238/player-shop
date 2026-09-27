import {
  Component,
  computed,
  inject,
  input,
  output,
  signal,
} from '@angular/core';
import { BuyProductPriceSummary } from '../buy-product-price-summary/buy-product-price-summary.component';
import {
  form,
  FormField,
  FormRoot,
  minLength,
  validateAsync,
} from '@angular/forms/signals';
import { MatButton } from '@angular/material/button';
import {
  MatError,
  MatFormField,
  MatInput,
  MatLabel,
} from '@angular/material/input';
import type { ProductItem } from '../../../../entities/product';
import {
  PROMO_CODE_MIN_LENGTH,
  PromoCodeData,
  type PromoCodeItem,
  type PromoCodeResponse,
} from '../../../../entities/promo-code';

export type BuyProductPromoForm = {
  code: string;
};

export type BuyProductAction = {
  productId: number;
  promoCode: string | null;
};

@Component({
  selector: 'app-buy-product-form',
  imports: [
    BuyProductPriceSummary,
    FormRoot,
    MatButton,
    MatError,
    MatFormField,
    MatInput,
    MatLabel,
    FormField,
  ],
  templateUrl: './buy-product-form.html',
  styleUrl: './buy-product-form.scss',
  providers: [PromoCodeData],
})
export class BuyProductForm {
  public readonly product = input.required<ProductItem>();
  public readonly buyProductAction = output<BuyProductAction>();

  private readonly promoCodeData = inject(PromoCodeData);
  private readonly promoModel = signal<BuyProductPromoForm>({ code: '' });
  private readonly promoCodeResource = this.promoCodeData.createResource(
    this.promoModel,
  );
  protected readonly promoCode = computed<PromoCodeItem | null>(
    () => this.promoCodeResource.value()?.item ?? null,
  );
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
            const promoCode = field().value().code;
            this.buyProductAction.emit({ productId, promoCode });
          }
        },
        ignoreValidators: 'none',
      },
    },
  );
}
