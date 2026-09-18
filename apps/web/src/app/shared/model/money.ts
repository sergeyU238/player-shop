import type { Currency } from './currency';

export class Money {
  private coinsSum: number;
  public readonly currencyCode: Currency['code'];

  get amount(): number {
    return this.coinsSum / 100;
  }

  get coins(): number {
    return this.coinsSum;
  }

  constructor(amount: number, currencyCode: Currency['code']) {
    this.coinsSum = Math.floor(amount * 100);
    this.currencyCode = currencyCode;
  }

  static create(amount: number, currencyCode: Currency['code']) {
    return new Money(amount, currencyCode);
  }

  add(money: Money) {
    if (money.currencyCode === this.currencyCode) {
      this.coinsSum = Math.floor(money.coinsSum + this.coinsSum);
    }

    return this;
  }

  subtract(money: Money) {
    let result = -1;

    if (money.currencyCode === this.currencyCode) {
      result = Math.floor(this.coinsSum - money.coins);
    }

    if (result < 0) {
      throw new Error('Money is out of bounds.');
    }

    this.coinsSum = result;

    return this;
  }

  subtractPercent(percentage: number) {
    if (percentage < 0) {
      throw new Error('Percent cannot be less than 0.');
    }

    const percentageAmount =
      Math.floor((this.coinsSum * percentage) / 100) / 100;
    const percentageMoney = new Money(percentageAmount, this.currencyCode);
    return this.subtract(percentageMoney);
  }
}
