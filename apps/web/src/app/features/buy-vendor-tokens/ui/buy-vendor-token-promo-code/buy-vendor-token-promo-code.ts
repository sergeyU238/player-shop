import { Component, model } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { NgOptimizedImage } from '@angular/common';
import { FormValueControl } from '@angular/forms/signals';
import { VendorItem } from '../../../../entities/vendor';

export type VendorAndPromoCode = {
  vendor: VendorItem;
  promoCode: string;
};

@Component({
  selector: 'app-buy-vendor-token-promo-code',
  imports: [MatIcon, NgOptimizedImage],
  templateUrl: './buy-vendor-token-promo-code.html',
  styleUrl: './buy-vendor-token-promo-code.scss',
})
export class BuyVendorTokenPromoCode
  implements FormValueControl<VendorAndPromoCode | null>
{
  public readonly value = model<VendorAndPromoCode | null>(null);
}
