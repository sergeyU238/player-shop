import { type IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetProductQuery } from './get-product.query';
import { PrismaProductsRepositoryService } from '../../presentation/persistense/prisma-products-repository.service';
import type { Product } from '../../models/product.model';

@QueryHandler(GetProductQuery)
export class GetProductQueryHandler implements IQueryHandler<GetProductQuery> {
  constructor(public readonly repository: PrismaProductsRepositoryService) {}

  async execute({ productId }: GetProductQuery): Promise<Product> {
    return this.repository
      .getProductById(productId)
      .then(
        ({ id, name, sku, type, price, currencyCode, image, createdAt }) => ({
          id,
          name,
          sku,
          type,
          price: price.toNumber(),
          currencyCode,
          image,
          createdAt,
        }),
      );
  }
}
