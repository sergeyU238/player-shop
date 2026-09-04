import { type IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { AuthenticateQuery } from './authenticate.query';
import { AuthPrismaUserRepository } from '../../presentation/persistence/auth-prisma-user-repository.service';
import type { UserModel } from '../../domain/user.model';

@QueryHandler(AuthenticateQuery)
export class AuthenticateHandler implements IQueryHandler<AuthenticateQuery> {
  constructor(private readonly userRepository: AuthPrismaUserRepository) {}

  async execute(query: AuthenticateQuery): Promise<UserModel> {
    return this.userRepository
      .getUser({ id: query.userId })
      .then(({ password, ...user }) => user);
  }
}
