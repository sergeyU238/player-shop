export class GetVendorOrderByPaymentIdQuery {
  constructor(
    public readonly userId: number,
    public readonly paymentId: number,
  ) {}
}
