export type CurrencyItem = {
  code: CurrencyCode;
  name: string;
  icon: string;
};

export type CurrencyList = {
  [key in CurrencyCode]: Currency;
};

export enum CurrencyCode {
  USD = 'USD',
  TENGE = 'TENGE',
  RUB = 'RUB',
}

export class Currency implements CurrencyItem {
  public readonly code;
  public readonly name;
  public readonly icon;

  constructor({ code, name, icon }: CurrencyItem) {
    this.name = name;
    this.code = code;
    this.icon = icon;
  }

  public is(code: CurrencyCode): boolean {
    return this.code === code;
  }
}

export const currencyList: CurrencyList = {
  [CurrencyCode.USD]: new Currency({
    code: CurrencyCode.USD,
    name: 'Доллар',
    icon: 'dollar',
  }),
  [CurrencyCode.TENGE]: new Currency({
    code: CurrencyCode.TENGE,
    name: 'Тенге',
    icon: 'tenge',
  }),
  [CurrencyCode.RUB]: new Currency({
    code: CurrencyCode.RUB,
    name: 'Рубль',
    icon: 'rub',
  }),
};
