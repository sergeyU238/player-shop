import { Injectable } from '@nestjs/common';
import { PrismaService } from '@player-shop/database';
import { PaymentStatus, PaymentType } from '../enum';

@Injectable()
export class PrismaPaymentRepository {
  constructor(private readonly prisma: PrismaService) {}

  async initializeProductPayment(
    eventId: string,
    orderId: number,
    orderType: PaymentType,
    status: PaymentStatus,
    amount: number,
    currencyCode: string,
  ) {
    return this.prisma.payment.create({
      data: {
        eventId,
        orderId,
        orderType,
        status,
        amount,
        currencyCode,
      },
    });
  }

  async findPayment({
    id,
    eventId,
    amount,
    currencyCode,
    orderId,
  }: {
    id?: number;
    orderId?: number;
    eventId?: string;
    amount?: number;
    currencyCode?: string;
  }) {
    return this.prisma.payment.findUnique({
      where: {
        id,
        ...(eventId ? { eventId } : {}),
        ...(orderId ? { orderId } : {}),
        ...(amount ? { amount } : {}),
        ...(currencyCode ? { currencyCode } : {}),
      },
    });
  }

  async updatePaymentStatus(id: number, status: PaymentStatus) {
    return this.prisma.payment.update({
      where: {
        id,
      },
      data: {
        status,
      },
    });
  }
}
