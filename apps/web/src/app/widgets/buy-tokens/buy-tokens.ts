import { Component } from '@angular/core';
import { SelectVendor } from '../../features/select-vendor/select-vendor';
import { BuyVendorTokens } from '../../features/buy-vendor-tokens/buy-vendor-tokens';
import { MatDivider } from '@angular/material/list';

@Component({
  selector: 'app-buy-tokens',
  imports: [SelectVendor, BuyVendorTokens, MatDivider],
  templateUrl: './buy-tokens.html',
  styleUrl: './buy-tokens.scss',
})
export class BuyTokens {}
