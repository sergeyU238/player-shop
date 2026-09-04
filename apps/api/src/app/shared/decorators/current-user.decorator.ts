import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import type { UserRole } from '../enums/user-role.enum';

export type CurrentUserInfo = {
  userId: number;
  role: UserRole;
};

export const CurrentUser = createParamDecorator(
  (_data: unknown, ctx: ExecutionContext): CurrentUserInfo => {
    const request = ctx.switchToHttp().getRequest();

    return request.user;
  },
);
