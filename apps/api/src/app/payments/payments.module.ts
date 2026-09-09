import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { PaymentController } from './presentation/controllers/payments.controller';
import { ProductsModule } from '../products/products.module';
import { ProductPaymentInitializationHandler } from './application/commands/product-payment-initialization.handler';
import { PrismaPaymentRepository } from './presentation/persistense/prisma-payment.repository';
import { PaymentResultHandler } from './application/commands/payment-result.handler';
import { PrismaVendorKeyOrderRepository } from './presentation/persistense/prisma-vendor-key-order.repository';

@Module({
  imports: [CqrsModule, ProductsModule],
  controllers: [PaymentController],
  providers: [
    PrismaPaymentRepository,
    ProductPaymentInitializationHandler,
    PaymentResultHandler,
    PrismaVendorKeyOrderRepository,
  ],
})
export class PaymentsModule {}
