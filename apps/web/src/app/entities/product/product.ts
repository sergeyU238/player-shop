import { Component, input } from '@angular/core';
import type { ProductItem } from './model/product';
import {
  MatCard,
  MatCardActions,
  MatCardContent,
  MatCardImage,
} from '@angular/material/card';

@Component({
  selector: 'app-product',
  imports: [MatCard, MatCardContent, MatCardActions, MatCardImage],
  templateUrl: './product.html',
  styleUrl: './product.scss',
})
export class Product {
  public readonly product = input.required<ProductItem>();
}
