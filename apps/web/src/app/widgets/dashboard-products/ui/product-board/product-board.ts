import { Component, input, output } from '@angular/core';
import { Product, type ProductItem } from '../../../../entities/product';
import { MatButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { currencyList } from '../../../../shared/model/currency';

@Component({
  selector: 'app-product-board',
  imports: [Product, MatButton, MatIcon],
  templateUrl: './product-board.html',
  styleUrl: './product-board.scss',
})
export class ProductBoard {
  public readonly currencyList = currencyList;
  public readonly title = input.required<string>();
  public readonly list = input.required<Array<ProductItem>>();
  public readonly buyClick = output<number>();

  protected buyProduct(id: number) {
    this.buyClick.emit(id);
  }
}
