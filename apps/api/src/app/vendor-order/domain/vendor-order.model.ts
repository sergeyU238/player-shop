export type VendorOrderKey = {
  id: number;
  createdAt: Date;
  value: string;
  sku: string;
  used: boolean;
};

export type VendorOrderPromoCode = {
  id: number;
  createdAt: Date;
  used: number;
  code: string;
  discount: number;
  currencyCode: string | null;
  isPercent: boolean;
  limit: number;
};

export type VendorOrderProduct = {
  id: number;
  createdAt: Date;
  name: string;
  sku: string;
  currencyCode: string;
  type: string;
  price: number; // Demical
  image: string;
};

export type VendorOrder = {
  id: number;
  status: string;

  vendorKey: VendorOrderKey;
  promoCode: VendorOrderPromoCode;
  product: VendorOrderProduct;
};
