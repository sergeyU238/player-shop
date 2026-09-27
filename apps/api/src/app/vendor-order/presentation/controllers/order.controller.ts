import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { JwtAuthGuard } from '../../../shared/guards/jwt-auth.guard';
import {
  CurrentUser,
  type CurrentUserInfo,
} from '../../../shared/decorators/current-user.decorator';
import { GetVendorOrderByPaymentIdQuery } from '../../application/queries/get-vendor-order-by-payment-id.query';
import { GetVendorOrderDto } from '../dto/get-vendor-order';

@UseGuards(JwtAuthGuard)
@Controller('order')
export class OrderController {
  constructor(private readonly queryBus: QueryBus) {}

  @Get('byPayment/:paymentId')
  async getByPaymentId(
    @Query() { paymentId }: GetVendorOrderDto,
    @CurrentUser() { userId }: CurrentUserInfo,
  ) {
    return this.queryBus.execute(
      new GetVendorOrderByPaymentIdQuery(userId, paymentId),
    );
  }
}
