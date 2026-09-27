export type Payment = {
  id: number;
  eventId: string;
  orderId: number;
  orderType: string;
  status: string;
  amount: number;
  currencyCode: string;
  createdAt: Date;
  updatedAt: Date;
};
