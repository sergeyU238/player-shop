import { Component, model, type OnInit, output, signal } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { MatMiniFabButton } from '@angular/material/button';
import { isNumeric } from '../../../../shared/utils/is-numeric';
import {
  CurrencyCode,
  Currency,
  currencyList,
} from '../../../../shared/model/currency';

@Component({
  selector: 'app-buy-vendor-token-money-input',
  imports: [MatIcon, MatMiniFabButton],
  templateUrl: './buy-vendor-token-money-input.html',
  styleUrl: './buy-vendor-token-money-input.scss',
})
export class BuyVendorTokenMoneyInput implements OnInit {
  protected readonly isInvalidValidValue = signal(false);
  protected readonly currencyList = currencyList;
  protected readonly currencyCode = CurrencyCode;
  protected readonly currentCurrency = signal(currencyList.USD);

  public readonly value = model(0);
  public readonly currencyChanged = output<Currency>();

  public ngOnInit() {
    this.currencyChanged.emit(this.currentCurrency());
  }

  protected valueChange(event: InputEvent) {
    const value = (event.target as HTMLInputElement).value;
    const isInvalid = isNumeric(value);

    if (isInvalid) {
      this.isInvalidValidValue.set(false);
      this.value.set(parseFloat(value || '0'));
    } else {
      this.isInvalidValidValue.set(true);
    }
  }

  protected currencyChange(currency: Currency) {
    this.currentCurrency.set(currency);
    this.currencyChanged.emit(currency);
  }
}
