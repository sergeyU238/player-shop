import { UserRole } from '../../../shared/enums/user-role.enum';

export class CreateUserCommand {
  constructor(
    public readonly email: string,
    public readonly password: string,
    public readonly name: string,
    public readonly role: UserRole,
  ) {}
}
