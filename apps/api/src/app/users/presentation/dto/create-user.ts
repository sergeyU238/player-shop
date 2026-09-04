import { IsEmail, IsIn, IsStrongPassword, MinLength } from 'class-validator';
import { UserRole } from '../../../shared/enums/user-role.enum';

export class CreateUserDto {
  @IsEmail()
  email: string;

  @IsStrongPassword()
  password: string;

  @IsIn(['user', 'admin'])
  role: UserRole;

  @MinLength(3)
  name: string;
}
