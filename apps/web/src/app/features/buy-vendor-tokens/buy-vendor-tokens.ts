import { Component, computed, effect, input, signal } from '@angular/core';
import {
  BuyVendorTokenVendor,
  BuyVendorTokenLoginInput,
  BuyVendorTokenMoneyInput,
  BuyVendorTokenPromoCode,
} from './ui';
import { MatFormFieldModule } from '@angular/material/form-field';
import { form, FormField, required } from '@angular/forms/signals';
import type { Currency } from '../../shared/model/currency';
import { MatIcon } from '@angular/material/icon';
import { type VendorModel } from '../../entities/vendor';

type BuyVendorTokensForm = {
  login: string;
  money: number;
  vendor: VendorModel | null;
  promoCode: string;
};

@Component({
  selector: 'app-buy-vendor-tokens',
  imports: [
    BuyVendorTokenVendor,
    MatFormFieldModule,
    BuyVendorTokenLoginInput,
    BuyVendorTokenMoneyInput,
    FormField,
    MatIcon,
    BuyVendorTokenPromoCode,
  ],
  templateUrl: './buy-vendor-tokens.html',
  styleUrl: './buy-vendor-tokens.scss',
})
export class BuyVendorTokens {
  protected readonly currentCurrency = signal<Currency | null>(null);
  protected readonly paymentData = signal<BuyVendorTokensForm>({
    login: '',
    money: 0,
    vendor: null,
    promoCode: '',
  });
  protected readonly paymentSum = computed(() => {
    const { money } = this.paymentData();
    return money;
  });
  protected readonly payForm = form(this.paymentData, (schemaPath) => {
    required(schemaPath.login, { message: 'Введите аккаунт' });
    required(schemaPath.money, { message: 'Укажите сумму' });
    required(schemaPath.vendor, {
      message: 'Укажите что нужно пополнить',
    });
  });

  public readonly currentVendor = input.required<VendorModel | null>();

  constructor() {
    effect(() => {
      this.paymentData.update((value) => ({
        ...value,
        vendor: this.currentVendor() ?? null,
      }));
    });
  }

  protected onCurrencyChanged(item: Currency) {
    this.currentCurrency.set(item);
  }
}
