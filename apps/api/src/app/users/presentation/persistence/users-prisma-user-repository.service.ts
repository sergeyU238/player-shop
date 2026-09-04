import { Injectable } from '@nestjs/common';
import { hash } from 'bcryptjs';
import { Prisma, PrismaService } from '@player-shop/database';

@Injectable()
export class UsersPrismaUserRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: Prisma.UserCreateInput) {
    return this.prisma.user.create({
      data: {
        ...data,
        password: await hash(data.password, 10),
      },
    });
  }

  async getUsers() {
    return this.prisma.user.findMany();
  }

  async getUser(args: Prisma.UserWhereUniqueInput) {
    return this.prisma.user.findUniqueOrThrow({
      where: args,
    });
  }
}
