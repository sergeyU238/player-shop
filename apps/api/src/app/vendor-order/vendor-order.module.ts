import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { OrderController } from './presentation/controllers/order.controller';
import { VendorOrderPrismaRepositoryService } from './presentation/persistence/vendor-order-prisma-repository.service';
import { GetVendorOrderByPaymentIdHandler } from './application/queries/get-vendor-order-by-payment-id.handler';

@Module({
  imports: [CqrsModule],
  controllers: [OrderController],
  providers: [
    VendorOrderPrismaRepositoryService,
    GetVendorOrderByPaymentIdHandler,
  ],
})
export class VendorOrderModule {}
