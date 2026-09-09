import { type IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetProductsQuery } from './get-products.query';
import { PrismaProductsRepositoryService } from '../../presentation/persistense/prisma-products-repository.service';

@QueryHandler(GetProductsQuery)
export class GetProductsHandler implements IQueryHandler<GetProductsQuery> {
  constructor(private readonly repository: PrismaProductsRepositoryService) {}

  async execute({ page, limit }: GetProductsQuery) {
    return this.repository.getProducts(page, limit);
  }
}
