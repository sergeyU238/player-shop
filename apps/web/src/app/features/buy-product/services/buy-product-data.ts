import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import type { Observable } from 'rxjs';

export type BuyProductResult = {
  item?: { id: number };
  error?: string;
};

@Injectable()
export class BuyProductData {
  private readonly baseUrl = `${environment.API_URL}/payments`;
  private readonly http = inject(HttpClient);

  buyProduct(
    productId: number,
    promocode: string | null = null,
  ): Observable<BuyProductResult> {
    const data = {
      productId,
      ...(promocode ? { promocode } : {}),
    };
    return this.http.post<BuyProductResult>(`${this.baseUrl}/product`, data);
  }
}
