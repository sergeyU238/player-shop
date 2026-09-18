import type { CurrencyCode } from '../../../shared/model/currency';

export type ProductItem = {
  id: number;
  name: string;
  sku: string;
  type: string;
  price: number;
  currencyCode: CurrencyCode;
  image: string;
  createdAt: Date;
};
