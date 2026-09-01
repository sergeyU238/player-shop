import { Component, model } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { FormValueControl } from '@angular/forms/signals';

@Component({
  selector: 'app-buy-vendor-token-promo-code',
  imports: [MatIcon],
  templateUrl: './buy-vendor-token-promo-code.html',
  styleUrl: './buy-vendor-token-promo-code.scss',
})
export class BuyVendorTokenPromoCode implements FormValueControl<string> {
  public readonly value = model('');
}
