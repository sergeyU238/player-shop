import { type IQueryHandler, QueryBus, QueryHandler } from '@nestjs/cqrs';
import { GetVendorOrderByPaymentIdQuery } from './get-vendor-order-by-payment-id.query';
import { GetPaymentQuery } from '../../../payments/application/queries/get-payment.query';
import { NotFoundException } from '@nestjs/common';
import { VendorOrderPrismaRepositoryService } from '../../presentation/persistence/vendor-order-prisma-repository.service';
import type { VendorOrder } from '../../domain/vendor-order.model';
import type { Payment } from '../../../shared/models/payment.model';

@QueryHandler(GetVendorOrderByPaymentIdQuery)
export class GetVendorOrderByPaymentIdHandler
  implements IQueryHandler<GetVendorOrderByPaymentIdQuery>
{
  constructor(
    private readonly queryBus: QueryBus,
    private readonly vendorOrderPrismaRepository: VendorOrderPrismaRepositoryService,
  ) {}

  async execute({
    userId,
    paymentId,
  }: GetVendorOrderByPaymentIdQuery): Promise<{
    payment: Payment;
    order: VendorOrder;
  }> {
    const payment: Payment = await this.queryBus.execute(
      new GetPaymentQuery(paymentId),
    );
    if (!payment) {
      throw new NotFoundException(`Payment ID ${paymentId} not found`);
    }
    const order = await this.vendorOrderPrismaRepository.getOrderByPaymentId(
      payment.orderId,
      userId,
    );
    if (!order) {
      throw new NotFoundException(
        `Vendor Order ID ${payment.orderId} not found`,
      );
    }
    return { payment, order };
  }
}
