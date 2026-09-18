import { inject, Service } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { BuyProductPopupWrapper } from '../components/buy-product-popup-wrapper/buy-product-popup-wrapper.component';
import { ProductItem } from '../../../entities/product';

@Service()
export class BuyProductPopup {
  private readonly dialog = inject(MatDialog);

  open(product: ProductItem) {
    return this.dialog.open(BuyProductPopupWrapper, {
      width: '600px',
      maxWidth: '95vw',
      minWidth: '600px',
      autoFocus: 'email',
      restoreFocus: true,
      disableClose: false,
      data: { product: product },
    });
  }
}
