import type { Payment } from '../../../shared/models/payment.model';
import { Payment as PrismaPayment } from '@player-shop/database';

export const paymentMapper = (payment: PrismaPayment): Payment => ({
  id: payment.id,
  eventId: payment.eventId,
  orderId: payment.orderId,
  orderType: payment.orderType,
  status: payment.status,
  amount: payment.amount.toNumber(),
  currencyCode: payment.currencyCode,
  createdAt: payment.createdAt,
  updatedAt: payment.updatedAt,
});
