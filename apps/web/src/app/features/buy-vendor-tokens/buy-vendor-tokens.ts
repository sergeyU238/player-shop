import { Component, computed, signal } from '@angular/core';
import {
  BuyVendorTokenPromoCode,
  BuyVendorTokenLoginInput,
  BuyVendorTokenMoneyInput,
  type VendorAndPromoCode,
} from './ui';
import { MatFormFieldModule } from '@angular/material/form-field';
import { form, FormField, required } from '@angular/forms/signals';
import type { Currency } from '../../shared/model/currency';
import { MatIcon } from '@angular/material/icon';

type BuyVendorTokensForm = {
  login: string;
  money: number;
  vendorAndPromoCode: VendorAndPromoCode | null;
};

@Component({
  selector: 'app-buy-vendor-tokens',
  imports: [
    BuyVendorTokenPromoCode,
    MatFormFieldModule,
    BuyVendorTokenLoginInput,
    BuyVendorTokenMoneyInput,
    FormField,
    MatIcon,
  ],
  templateUrl: './buy-vendor-tokens.html',
  styleUrl: './buy-vendor-tokens.scss',
})
export class BuyVendorTokens {
  protected readonly currentCurrency = signal<Currency | null>(null);
  protected readonly paymentData = signal<BuyVendorTokensForm>({
    login: '',
    money: 0,
    vendorAndPromoCode: null,
  });
  protected readonly paymentSum = computed(() => {
    const { money } = this.paymentData();
    return money;
  });
  protected readonly payForm = form(this.paymentData, (schemaPath) => {
    required(schemaPath.login, { message: 'Введите аккаунт' });
    required(schemaPath.money, { message: 'Укажите сумму' });
    required(schemaPath.vendorAndPromoCode, {
      message: 'Укажите что нужно пополнить',
    });
  });

  protected onCurrencyChanged(item: Currency) {
    this.currentCurrency.set(item);
  }
}
