import { Money } from './money.model';

export class PromoCode {
  constructor(
    public readonly id: number,
    public readonly code: string,
    public readonly discount: number,
    public readonly currencyCode: string | null,
    public readonly isPercent: boolean,
    public readonly limit: number,
    public readonly used: number,
    public readonly createdAt: Date,
  ) {}

  static create({
    id,
    code,
    discount,
    currencyCode,
    isPercent,
    limit,
    used,
    createdAt,
  }: {
    id: number;
    code: string;
    discount: number;
    currencyCode: string | null;
    used: number;
    limit: number;
    isPercent: boolean;
    createdAt: Date;
  }) {
    return new PromoCode(
      id,
      code,
      discount,
      currencyCode,
      isPercent,
      limit,
      used,
      createdAt,
    );
  }

  applyPromoCode(amount: number, currencyCode: string): number {
    const amountMoney = Money.create(amount, currencyCode);
    if (this.isPercent) {
      return amountMoney.subtractPercent(this.discount).amount;
    } else {
      const discountMoney = Money.create(this.discount, this.currencyCode);
      return amountMoney.subtract(discountMoney).amount;
    }
  }
}
