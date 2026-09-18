import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import type { Observable } from 'rxjs';
import type { ProductItem } from '../../../entities/product';

@Injectable()
export class DashboardProductsData {
  private readonly baseUrl = `${environment.API_URL}/product`;
  private readonly http = inject(HttpClient);

  getRecommendProducts(): Observable<Array<ProductItem>> {
    const params = new HttpParams({
      fromObject: {
        page: '1',
        limit: '5',
      },
    });

    return this.http.get<Array<ProductItem>>(`${this.baseUrl}/list`, {
      params,
    });
  }
}
