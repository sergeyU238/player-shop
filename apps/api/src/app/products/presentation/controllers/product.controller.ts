import { Controller, Get, Query } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { GetProductsQuery } from '../../application/queries/get-products.query';
import { GetProductsDto } from '../dto/get-products';
import { GetPromoCodeDto } from '../dto/get-promocode';
import { GetPromoCodeQuery } from '../../application/queries/get-promocode.query';

@Controller('product')
export class ProductController {
  constructor(private readonly queryBus: QueryBus) {}

  @Get('list')
  async getProducts(@Query() { page, limit }: GetProductsDto) {
    return this.queryBus.execute(
      new GetProductsQuery(parseInt(page, 10), parseInt(limit, 10)),
    );
  }

  @Get('promocode')
  async getPromoCode(@Query() input: GetPromoCodeDto) {
    return this.queryBus.execute(new GetPromoCodeQuery(input.code));
  }
}
