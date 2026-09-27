import { Module } from '@nestjs/common';
import { ProductController } from './presentation/controllers/product.controller';
import { PrismaProductsRepositoryService } from './presentation/persistense/prisma-products-repository.service';
import { GetProductsHandler } from './application/queries/get-products.handler';
import { GetPromoCodeHandler } from './application/queries/get-promocode.handler';
import { CqrsModule } from '@nestjs/cqrs';
import { GetProductQueryHandler } from './application/queries/get-product.handler';
import { UsePromoCodeHandler } from './application/commands/use-promocode.handler';

@Module({
  imports: [CqrsModule],
  controllers: [ProductController],
  providers: [
    PrismaProductsRepositoryService,
    GetProductsHandler,
    GetPromoCodeHandler,
    GetProductQueryHandler,
    UsePromoCodeHandler,
  ],
})
export class ProductsModule {}
