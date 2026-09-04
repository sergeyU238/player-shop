import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { UserController } from './presentation/controllers/user.controller';
import { UsersPrismaUserRepository } from './presentation/persistence/users-prisma-user-repository.service';
import { CreateUserHandler } from './application/commands/create-user.handler';
import { GetUserHandler } from './application/queries/get-user.handler';

@Module({
  imports: [CqrsModule],
  controllers: [UserController],
  providers: [UsersPrismaUserRepository, CreateUserHandler, GetUserHandler],
})
export class UsersModule {}
