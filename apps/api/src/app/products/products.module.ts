import { Module } from '@nestjs/common';
import { ProductController } from './presentation/controllers/product.controller';
import { PrismaProductsRepositoryService } from './presentation/persistense/prisma-products-repository.service';
import { GetProductsHandler } from './application/queries/get-products.handler';
import { GetPromoCodeHandler } from './application/queries/get-promocode.handler';
import { CqrsModule } from '@nestjs/cqrs';

@Module({
  imports: [CqrsModule],
  exports: [PrismaProductsRepositoryService],
  controllers: [ProductController],
  providers: [
    PrismaProductsRepositoryService,
    GetProductsHandler,
    GetPromoCodeHandler,
  ],
})
export class ProductsModule {}
