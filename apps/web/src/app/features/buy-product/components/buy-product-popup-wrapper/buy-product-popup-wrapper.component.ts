import { Component, inject } from '@angular/core';
import { BuyProduct } from '../../buy-product';
import { MAT_DIALOG_DATA, MatDialogClose } from '@angular/material/dialog';
import { MatIcon } from '@angular/material/icon';
import { MatMiniFabButton } from '@angular/material/button';

@Component({
  selector: 'app-buy-product-popup',
  imports: [BuyProduct, MatDialogClose, MatIcon, MatMiniFabButton],
  templateUrl: './buy-product-popup-wrapper.component.html',
  styleUrl: './buy-product-popup-wrapper.component.scss',
})
export class BuyProductPopupWrapper {
  public readonly product = inject(MAT_DIALOG_DATA).product;
}
