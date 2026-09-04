import { Injectable } from '@nestjs/common';
import { Prisma, PrismaService } from '@player-shop/database';

@Injectable()
export class AuthPrismaUserRepository {
  constructor(private readonly prisma: PrismaService) {}

  async getUser(args: Prisma.UserWhereUniqueInput) {
    return this.prisma.user.findUniqueOrThrow({
      where: args,
    });
  }
}
