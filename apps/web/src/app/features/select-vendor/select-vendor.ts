import { Component, inject, output } from '@angular/core';
import { Vendor } from './services/vendor';
import { NgOptimizedImage } from '@angular/common';
import { type VendorModel, VendorItem } from '../../entities/vendor';

@Component({
  selector: 'app-select-vendor',
  imports: [NgOptimizedImage, VendorItem],
  templateUrl: './select-vendor.html',
  styleUrl: './select-vendor.scss',
  providers: [Vendor],
})
export class SelectVendor {
  public readonly vendorClick = output<VendorModel>();
  protected readonly vendorList = inject(Vendor).getVendors();

  protected selectVendor(item: VendorModel) {
    this.vendorClick.emit(item);
  }

  protected showMoreVendors() {
    // TODO: More vendors popup
    console.log('Show more vendors');
  }
}
