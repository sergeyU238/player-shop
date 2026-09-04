import { CommandHandler, type ICommandHandler } from '@nestjs/cqrs';
import { LoginCommand } from './login.command';
import { AuthService } from '../../applicaton/ports/auth.service';
import type { UserModel } from '../../domain/user.model';

@CommandHandler(LoginCommand)
export class LoginHandler implements ICommandHandler<LoginCommand> {
  constructor(private readonly authService: AuthService) {}

  async execute({ email, password, res }: LoginCommand): Promise<UserModel> {
    return this.authService
      .login({ email, password }, res)
      .then(({ password, createdAt, ...user }) => user);
  }
}
