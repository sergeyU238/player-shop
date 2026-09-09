import type { Currency, Promocodes } from '@player-shop/database';

export type PromoCodeResponseDto = Pick<
  Promocodes,
  'code' | 'discount' | 'isPercent'
> & {
  currency: Currency;
};

export const PROMO_CODE_NOT_FOUND_ERROR = 'Promo not found';
