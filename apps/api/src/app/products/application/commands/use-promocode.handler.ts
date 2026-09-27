import { CommandHandler, type ICommandHandler } from '@nestjs/cqrs';
import { UsePromoCodeCommand } from './use-promocode.command';
import { PrismaProductsRepositoryService } from '../../presentation/persistense/prisma-products-repository.service';
import { PromoCode } from '../../../shared/models/promo-code.model';

@CommandHandler(UsePromoCodeCommand)
export class UsePromoCodeHandler
  implements ICommandHandler<UsePromoCodeCommand>
{
  constructor(public readonly repository: PrismaProductsRepositoryService) {}

  async execute({ promoCode }: UsePromoCodeCommand): Promise<PromoCode> {
    return this.repository
      .usePromoCode(promoCode)
      .then((item) => PromoCode.create(item));
  }
}
