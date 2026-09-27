import { Injectable } from '@nestjs/common';
import {
  PrismaService,
  type Products,
  type VendorKeyOrders,
  type VendorKeys,
} from '@player-shop/database';
import { VendorKeyOrderStatus } from '../enum';

@Injectable()
export class PrismaVendorKeyOrderRepository {
  constructor(private readonly prisma: PrismaService) {}

  async createOrder(userId: number, productId: number, promoCodeId: number) {
    return this.prisma.vendorKeyOrders.create({
      data: {
        userId,
        productId,
        status: VendorKeyOrderStatus.CREATED,
        ...(promoCodeId ? { promoCodeId } : {}),
      },
    });
  }

  async processOrder(orderId: number) {
    const unprocessedOrder = await this.startOrderProcessing(orderId);
    if (!unprocessedOrder) return;
    const vendorKey = await this.useVendorKeyFor(unprocessedOrder.sku);

    if (vendorKey) {
      await this.updateVendorKey(orderId, vendorKey.id);
    } else {
      await this.updateOrderStatus(orderId, VendorKeyOrderStatus.WAITING);
    }
  }

  private async startOrderProcessing(orderId: number) {
    try {
      const orders = await this.prisma.$queryRaw<
        VendorKeyOrders & { sku: Products['sku'] }[]
      >`
        WITH updated AS (
          UPDATE "VendorKeyOrders"
          SET "status" = ${VendorKeyOrderStatus.PROCESSING}
          WHERE "id" = (
            SELECT "id"
            FROM "VendorKeyOrders"
            WHERE "id" = ${orderId}
                AND "status" = ${VendorKeyOrderStatus.CREATED}
            FOR UPDATE
          )
          RETURNING *
        )
        SELECT
            updated.*,
            product."sku"
        FROM updated
        LEFT JOIN "Products" product
            ON updated."productId" = product."id"
      `;

      return orders.length ? orders['0'] : null;
    } catch (_error) {
      /* empty */
    }

    return null;
  }

  private async updateOrderStatus(
    orderId: number,
    status: VendorKeyOrderStatus,
  ) {
    return this.prisma.vendorKeyOrders.update({
      where: {
        id: orderId,
      },
      data: {
        status,
      },
    });
  }

  private async updateVendorKey(orderId: number, vendorKeyId: number) {
    return this.prisma.vendorKeyOrders.update({
      where: {
        id: orderId,
      },
      data: {
        vendorKeyId,
        status: VendorKeyOrderStatus.READY,
      },
    });
  }

  private async useVendorKeyFor(sku: string) {
    try {
      const vendorKeyList = await this.prisma.$queryRaw<VendorKeys[]>`
        UPDATE "VendorKeys"
        SET "used" = true
        WHERE "id" = (
          SELECT "id"
          FROM "VendorKeys"
          WHERE "sku" = ${sku}
            AND "used" = false
          LIMIT 1
          FOR UPDATE SKIP LOCKED
        )
        RETURNING *;
      `;

      return vendorKeyList.length ? vendorKeyList['0'] : null;
    } catch (_error) {
      /* empty */
    }

    return null;
  }
}
