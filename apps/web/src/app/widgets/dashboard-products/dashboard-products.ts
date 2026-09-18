import { Component, inject } from '@angular/core';
import { ProductBoard } from './ui/product-board/product-board';
import { DashboardProductsData } from './services/dashboard-products-data.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { MatFabButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { BuyProductPopup } from '../../features/buy-product/services/buy-product-popup';

@Component({
  selector: 'app-dashboard-products',
  imports: [ProductBoard, MatFabButton, MatIcon],
  templateUrl: './dashboard-products.html',
  styleUrl: './dashboard-products.scss',
  providers: [DashboardProductsData, BuyProductPopup],
})
export class DashboardProducts {
  private readonly dashboardProductsData = inject(DashboardProductsData);
  private readonly buyProductPopup = inject(BuyProductPopup);

  protected readonly recommendedProducts = toSignal(
    this.dashboardProductsData.getRecommendProducts(),
  );

  protected buyProduct(productId: number) {
    const product = this.recommendedProducts()?.find(
      (product) => product.id === productId,
    );
    if (product) {
      this.buyProductPopup.open(product);
    }
  }
}
