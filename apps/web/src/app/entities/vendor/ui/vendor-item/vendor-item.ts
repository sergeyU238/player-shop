import { Component, input } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import type { VendorModel } from '../../model/vendor';

@Component({
  selector: 'app-vendor-item',
  imports: [NgOptimizedImage],
  templateUrl: './vendor-item.html',
  styleUrl: './vendor-item.scss',
})
export class VendorItem {
  public readonly vendor = input.required<VendorModel>();
}
