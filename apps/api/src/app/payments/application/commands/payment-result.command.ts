import { PaymentStatus } from '../../presentation/enum';

export class PaymentResultCommand {
  constructor(
    public readonly eventId: string,
    public readonly orderId: number,
    public readonly amount: number,
    public readonly currency: string,
    public readonly status: PaymentStatus,
    public readonly createdAt: Date,
  ) {}
}
