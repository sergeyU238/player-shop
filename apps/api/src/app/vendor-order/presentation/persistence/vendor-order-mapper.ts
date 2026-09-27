import {
  type Products,
  type Promocodes,
  type VendorKeyOrders,
  type VendorKeys,
} from '@player-shop/database';
import type { VendorOrder } from '../../domain/vendor-order.model';

export type PrismaVendorKeyOrder = Pick<VendorKeyOrders, 'id' | 'status'> & {
  vendorKey: VendorKeys;
  promoCode: Promocodes;
  product: Products;
};

export const vendorOrderMapper = (
  order: PrismaVendorKeyOrder,
): VendorOrder => ({
  id: order.id,
  status: order.status,

  vendorKey: {
    id: order.vendorKey.id,
    createdAt: order.vendorKey.createdAt,
    value: order.vendorKey.value,
    sku: order.vendorKey.sku,
    used: order.vendorKey.used,
  },

  promoCode: {
    id: order.promoCode.id,
    createdAt: order.promoCode.createdAt,
    used: order.promoCode.used,
    code: order.promoCode.code,
    discount: order.promoCode.discount,
    currencyCode: order.promoCode.currencyCode,
    isPercent: order.promoCode.isPercent,
    limit: order.promoCode.limit,
  },

  product: {
    id: order.product.id,
    createdAt: order.product.createdAt,
    name: order.product.name,
    sku: order.product.sku,
    currencyCode: order.product.currencyCode,
    type: order.product.type,
    price: order.product.price.toNumber(),
    image: order.product.image,
  },
});
