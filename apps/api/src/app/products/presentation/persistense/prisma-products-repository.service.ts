import { Injectable } from '@nestjs/common';
import { PrismaService, type Promocodes } from '@player-shop/database';
import { Money } from '../../../shared/models/money.model';

@Injectable()
export class PrismaProductsRepositoryService {
  constructor(private readonly prisma: PrismaService) {}

  async getProducts(page: number, limit: number) {
    return this.prisma.products.findMany({
      skip: (page - 1) * limit,
      take: limit,
    });
  }

  async getProductById(id: number) {
    return this.prisma.products.findUnique({
      where: {
        id,
      },
    });
  }

  async getPromoCode(promoCode: string) {
    if (!promoCode) {
      return null;
    }
    const item = await this.prisma.promocodes.findUnique({
      where: {
        code: promoCode,
      },
      select: {
        code: true,
        limit: true,
        isPercent: true,
        discount: true,
        used: true,
        currency: true,
      },
    });
    if (!item) {
      return null;
    }
    if (item.limit <= item.used) {
      return null;
    }
    return item;
  }

  static applyPromoCode(
    promoCode: Promocodes,
    amount: number,
    currencyCode: string,
  ): number {
    const amountMoney = Money.create(amount, currencyCode);
    if (promoCode.isPercent) {
      return amountMoney.subtractPercent(promoCode.discount).amount;
    } else {
      const discountMoney = Money.create(
        promoCode.discount,
        promoCode.currencyCode,
      );
      return amountMoney.subtract(discountMoney).amount;
    }
  }

  async usePromoCode(code: string): Promise<number> {
    return await this.prisma.$transaction(async (tx) => {
      let promoList;
      try {
        promoList = await tx.$queryRaw<Promocodes[]>`
            SELECT *
            FROM "Promocodes"
            WHERE "code" = ${code}
            FOR UPDATE SKIP LOCKED
          `;
      } catch (_error) {
        throw new Error('Promo code not found');
      }

      if (!promoList.length) {
        throw new Error('Promo code not found');
      }

      const promoCode = promoList['0'];

      if (promoCode.limit <= promoCode.used) {
        throw new Error('Promo code limit exceeded');
      }

      await tx.promocodes.update({
        where: {
          id: promoCode.id,
        },
        data: {
          used: {
            increment: 1,
          },
        },
      });

      return promoCode;
    });
  }
}
