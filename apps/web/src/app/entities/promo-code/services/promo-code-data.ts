import type {
  PromoCodeItem,
  PromoCodeResponse,
  PromoCodeResponseDto,
  PromoCodeResponseItemDto,
} from '../model/promo-code';
import { HttpClient, HttpParams } from '@angular/common/http';
import {
  assertInInjectionContext,
  inject,
  Injectable,
  resource,
  type Signal,
} from '@angular/core';
import { environment } from '../../../../environments/environment';
import { firstValueFrom, type Observable } from 'rxjs';

export const PROMO_CODE_MIN_LENGTH = 5;

@Injectable()
export class PromoCodeData {
  private baseUrl = `${environment.API_URL}/product`;
  private readonly http = inject(HttpClient);

  getCode$(code: string): Observable<PromoCodeResponseDto> {
    const params = new HttpParams({
      fromObject: {
        code,
      },
    });

    return this.http.get<PromoCodeResponseDto>(`${this.baseUrl}/promocode`, {
      params,
    });
  }

  createResource(withCode: Signal<{ code: string }>) {
    assertInInjectionContext(this.createResource);

    return resource({
      params: () => ({ code: withCode()?.code }),
      loader: async ({ params }) => {
        let response: PromoCodeResponse = {
          item: null,
          error: 'Укажите промокод',
        };
        if (params.code?.length >= PROMO_CODE_MIN_LENGTH) {
          const { item, error } = await firstValueFrom(
            this.getCode$(params.code),
          );
          response = {
            item: item ? PromoCodeData.transformItem(item) : null,
            error,
          };
        }
        return response;
      },
    });
  }

  static transformItem(item: PromoCodeResponseItemDto): PromoCodeItem {
    const {
      currency: { currencyCode },
      ...rest
    } = item;
    return {
      currencyCode,
      ...rest,
    };
  }
}
