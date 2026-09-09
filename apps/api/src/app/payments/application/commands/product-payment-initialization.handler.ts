import { CommandHandler, type ICommandHandler } from '@nestjs/cqrs';
import { ProductPaymentInitializationCommand } from './product-payment-initialization.command';
import { PrismaPaymentRepository } from '../../presentation/persistense/prisma-payment.repository';
import { PrismaProductsRepositoryService } from '../../../products/presentation/persistense/prisma-products-repository.service';
import { PaymentStatus, PaymentType } from '../../presentation/enum';
import { PrismaVendorKeyOrderRepository } from '../../presentation/persistense/prisma-vendor-key-order.repository';

@CommandHandler(ProductPaymentInitializationCommand)
export class ProductPaymentInitializationHandler
  implements ICommandHandler<ProductPaymentInitializationCommand>
{
  constructor(
    private readonly productRepository: PrismaProductsRepositoryService,
    private readonly paymentRepository: PrismaPaymentRepository,
    private readonly vendorKeyRepository: PrismaVendorKeyOrderRepository,
  ) {}

  async execute({
    userId,
    productId,
    promocode,
  }: ProductPaymentInitializationCommand) {
    const product = await this.productRepository.getProductById(productId);
    if (!product) {
      throw new Error('Product not found');
    }
    let price = product.price.toNumber();

    let promoCodeItem = null;
    if (promocode) {
      promoCodeItem = await this.productRepository.usePromoCode(promocode);
      price = PrismaProductsRepositoryService.applyPromoCode(
        promoCodeItem,
        price,
        product.currencyCode,
      );
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
