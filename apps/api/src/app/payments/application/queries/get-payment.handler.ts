import { type IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetPaymentQuery } from './get-payment.query';
import { PrismaPaymentRepository } from '../../presentation/persistense/prisma-payment.repository';

@QueryHandler(GetPaymentQuery)
export class GetPaymentQueryHandler implements IQueryHandler<GetPaymentQuery> {
  constructor(private readonly paymentRepository: PrismaPaymentRepository) {}

  async execute({ paymentId }: GetPaymentQuery) {
    return this.paymentRepository.findPayment({ id: paymentId });
  }
}
