import { type IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetUserQuery } from './get-user.query';
import { UsersPrismaUserRepository } from '../../presentation/persistence/users-prisma-user-repository.service';

@QueryHandler(GetUserQuery)
export class GetUserHandler implements IQueryHandler<GetUserQuery> {
  constructor(private readonly userRepository: UsersPrismaUserRepository) {}

  async execute({ userId: id }: GetUserQuery) {
    return this.userRepository.getUser({ id });
  }
}
