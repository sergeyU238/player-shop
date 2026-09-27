import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
} from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { ProductPaymentDto } from '../dto/product-payment';
import {
  CurrentUser,
  type CurrentUserInfo,
} from '../../../shared/decorators/current-user.decorator';
import { JwtAuthGuard } from '../../../shared/guards/jwt-auth.guard';
import { RolesGuard } from '../../../shared/guards/role.guard';
import { Roles } from '../../../shared/decorators/role.decorator';
import { UserRole } from '../../../shared/enums/user-role.enum';
import { ProductPaymentInitializationCommand } from '../../application/commands/product-payment-initialization.command';
import { PaymentResultDto } from '../dto/payment-result';
import { PaymentResultCommand } from '../../application/commands/payment-result.command';
import { PaymentStatus } from '../enum';
import { BaseHttpException } from '../../../shared/http/exceptions/base-http-exception';
import { ItemResponse } from '../../../shared/dto/item-response';

@Controller('payments')
export class PaymentController {
  constructor(private readonly commandBus: CommandBus) {}

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.USER)
  @Post('product')
  async productPaymentInitialization(
    @Body() { productId, promocode }: ProductPaymentDto,
    @CurrentUser() { userId }: CurrentUserInfo,
  ): Promise<ItemResponse<{ id: number }>> {
    let payment: { id: number };
    try {
      payment = await this.commandBus.execute(
        new ProductPaymentInitializationCommand(userId, +productId, promocode),
      );
    } catch (error) {
      return ItemResponse.create({ error });
    }

    return ItemResponse.create({ item: { id: payment.id } });
  }

  @HttpCode(HttpStatus.OK)
  @Post('result')
  async paymentResult(
    @Body()
    {
      event_id,
      order_id,
      currency,
      status,
      amount,
      created_at,
    }: PaymentResultDto,
  ) {
    try {
      await this.commandBus.execute(
        new PaymentResultCommand(
          event_id,
          parseInt(order_id, 10),
          parseFloat(amount),
          currency,
          status as PaymentStatus,
          new Date(created_at),
        ),
      );
    } catch (error) {
      throw new BaseHttpException(error);
    }

    return { status: 'ok', error: null };
  }
}
