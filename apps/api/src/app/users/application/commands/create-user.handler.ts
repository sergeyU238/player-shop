import { CommandHandler, type ICommandHandler } from '@nestjs/cqrs';
import { CreateUserCommand } from './create-user.command';
import { UsersPrismaUserRepository } from '../../presentation/persistence/users-prisma-user-repository.service';

@CommandHandler(CreateUserCommand)
export class CreateUserHandler implements ICommandHandler<CreateUserCommand> {
  constructor(private readonly user: UsersPrismaUserRepository) {}

  async execute(command: CreateUserCommand) {
    return this.user.create(command).then(({ password, ...user }) => user);
  }
}
