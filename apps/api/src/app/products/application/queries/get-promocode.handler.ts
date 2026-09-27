import { type IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetPromoCodeQuery } from './get-promocode.query';
import { PrismaProductsRepositoryService } from '../../presentation/persistense/prisma-products-repository.service';
import { ItemResponse } from '../../../shared/dto/item-response';
import {
  PROMO_CODE_NOT_FOUND_ERROR,
  type PromoCodeResponseDto,
} from '../../presentation/dto/promocode-response';

@QueryHandler(GetPromoCodeQuery)
export class GetPromoCodeHandler implements IQueryHandler<GetPromoCodeQuery> {
  constructor(private readonly repository: PrismaProductsRepositoryService) {}

  async execute(query: GetPromoCodeQuery) {
    return this.repository.getPromoCode(query.code).then((item) =>
      ItemResponse.create<PromoCodeResponseDto>({
        item,
        error: PROMO_CODE_NOT_FOUND_ERROR,
      }),
    );
  }
}
