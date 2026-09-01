import { Component, model } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { FormValueControl } from '@angular/forms/signals';
import { type VendorModel } from '../../../../entities/vendor';

@Component({
  selector: 'app-buy-vendor-token-vendor',
  imports: [NgOptimizedImage],
  templateUrl: './buy-vendor-token-vendor.component.html',
  styleUrl: './buy-vendor-token-vendor.component.scss',
})
export class BuyVendorTokenVendor
  implements FormValueControl<VendorModel | null>
{
  public readonly value = model<VendorModel | null>(null);
}
