import { Money } from '../../../shared/model/money';
import type { CurrencyCode } from '../../../shared/model/currency';

export type PromoCodeItem = {
  code: string;
  discount: number;
  isPercent: boolean;
  currencyCode: CurrencyCode;
};

export type PromoCodeResponseItemDto = Omit<PromoCodeItem, 'currencyCode'> & {
  currency: {
    name: string;
    currencyCode: CurrencyCode;
    icon: string;
  };
};

export type PromoCodeResponseDto = {
  item: PromoCodeResponseItemDto | null;
  error: string | null | undefined;
};

export type PromoCodeResponse = {
  item: PromoCodeItem | null;
  error: string | null | undefined;
};

export function applyPromoCode(
  item: {
    price: number;
    currencyCode: CurrencyCode;
  },
  promoCode: PromoCodeItem,
): number {
  const amountMoney = Money.create(item.price, item.currencyCode);
  if (promoCode.isPercent) {
    return amountMoney.subtractPercent(promoCode.discount).amount;
  } else {
    const discountMoney = Money.create(
      promoCode.discount,
      promoCode.currencyCode,
    );
    return amountMoney.subtract(discountMoney).amount;
  }
}
