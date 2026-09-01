import { Component, signal } from '@angular/core';
import { SelectVendor } from '../../features/select-vendor/select-vendor';
import { BuyVendorTokens } from '../../features/buy-vendor-tokens/buy-vendor-tokens';
import { MatDivider } from '@angular/material/list';
import type { VendorModel } from '../../entities/vendor';

@Component({
  selector: 'app-buy-tokens',
  imports: [SelectVendor, BuyVendorTokens, MatDivider],
  templateUrl: './buy-tokens.html',
  styleUrl: './buy-tokens.scss',
})
export class BuyTokens {
  protected readonly currentVendor = signal<VendorModel | null>(null);

  protected onVendorSelected(vendor: VendorModel) {
    this.currentVendor.set(vendor);
  }
}
