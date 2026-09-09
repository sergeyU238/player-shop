export class ProductPaymentInitializationCommand {
  constructor(
    public readonly userId: number,
    public readonly productId: number,
    public readonly promocode: string | null = null,
  ) {}
}
