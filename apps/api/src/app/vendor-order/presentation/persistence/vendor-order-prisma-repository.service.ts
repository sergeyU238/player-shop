import { Injectable } from '@nestjs/common';
import { PrismaService } from '@player-shop/database';
import type { VendorOrder } from '../../domain/vendor-order.model';
import { vendorOrderMapper } from './vendor-order-mapper';

@Injectable()
export class VendorOrderPrismaRepositoryService {
  constructor(private readonly prisma: PrismaService) {}

  async getOrderByPaymentId(
    orderId: number,
    userId: number,
  ): Promise<VendorOrder> {
    return this.prisma.vendorKeyOrders
      .findUnique({
        where: {
          id: orderId,
          userId,
        },
        select: {
          id: true,
          status: true,
          updatedAt: false,
          vendorKey: true,
          promoCode: true,
          product: true,
        },
      })
      .then((item) => vendorOrderMapper(item));
  }
}
