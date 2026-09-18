import { Component, input } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { CurrencyCode, currencyList } from '../../model/currency';

@Component({
  selector: 'app-currency-icon',
  imports: [MatIcon],
  templateUrl: './currency-icon.html',
  styleUrl: './currency-icon.scss',
})
export class CurrencyIcon {
  protected readonly currencyList = currencyList;
  public readonly currencyCode = input.required<CurrencyCode>();
}
