import {
  CommandBus,
  CommandHandler,
  type ICommandHandler,
  QueryBus,
} from '@nestjs/cqrs';
import { ProductPaymentInitializationCommand } from './product-payment-initialization.command';
import { PrismaPaymentRepository } from '../../presentation/persistense/prisma-payment.repository';
import { PaymentStatus, PaymentType } from '../../presentation/enum';
import { PrismaVendorKeyOrderRepository } from '../../presentation/persistense/prisma-vendor-key-order.repository';
import { GetProductQuery } from '../../../products/application/queries/get-product.query';
import { UsePromoCodeCommand } from '../../../products/application/commands/use-promocode.command';
import { PromoCode } from '../../../shared/models/promo-code.model';

@CommandHandler(ProductPaymentInitializationCommand)
export class ProductPaymentInitializationHandler
  implements ICommandHandler<ProductPaymentInitializationCommand>
{
  constructor(
    private readonly paymentRepository: PrismaPaymentRepository,
    private readonly vendorKeyRepository: PrismaVendorKeyOrderRepository,
    private readonly queryBus: QueryBus,
    private readonly commandBus: CommandBus,
  ) {}

  async execute({
    userId,
    productId,
    promocode,
  }: ProductPaymentInitializationCommand) {
    const product = await this.queryBus.execute(new GetProductQuery(productId));
    if (!product) {
      throw new Error('Product not found');
    }
    let price = product.price;

    let promoCodeItem: PromoCode | null = null;
    if (promocode) {
      promoCodeItem = await this.commandBus.execute(
        new UsePromoCodeCommand(promocode),
      );
      price = promoCodeItem.applyPromoCode(price, product.currencyCode);
    }

    const order = await this.vendorKeyRepository.createOrder(
      userId,
      product.id,
      promoCodeItem?.id,
    );
    if (!order) {
      throw new Error('Order creation failed');
    }

    const eventId = `${PaymentType.PRODUCT}-${order.id}`;
    const payment = await this.paymentRepository.initializeProductPayment(
      eventId,
      order.id,
      PaymentType.PRODUCT,
      PaymentStatus.CREATED,
      price,
      product.currencyCode,
    );
    if (!payment) {
      throw new Error('Payment creation failed');
    }
    return payment;
  }
}
