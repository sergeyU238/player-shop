import { CommandHandler, type ICommandHandler } from '@nestjs/cqrs';
import { PaymentResultCommand } from './payment-result.command';
import { PrismaPaymentRepository } from '../../presentation/persistense/prisma-payment.repository';
import { PaymentStatus } from '../../presentation/enum';
import { PrismaVendorKeyOrderRepository } from '../../presentation/persistense/prisma-vendor-key-order.repository';

@CommandHandler(PaymentResultCommand)
export class PaymentResultHandler
  implements ICommandHandler<PaymentResultCommand>
{
  constructor(
    private readonly paymentRepository: PrismaPaymentRepository,
    private readonly vendorKeyRepository: PrismaVendorKeyOrderRepository,
  ) {}

  async execute({
    eventId,
    orderId,
    status,
    amount,
    currency,
  }: PaymentResultCommand) {
    const payment = await this.paymentRepository.findPayment({
      id: orderId,
      eventId,
      amount,
      currencyCode: currency,
    });

    if (!payment) {
      throw new Error('Payment not found');
    }

    await this.paymentRepository.updatePaymentStatus(payment.id, status);

    if (status === PaymentStatus.SUCCESS) {
      await this.vendorKeyRepository.processOrder(payment.orderId);
    }

    return;
  }
}
