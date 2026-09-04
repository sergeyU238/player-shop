import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CreateUserDto } from '../dto/create-user';
import { CreateUserCommand } from '../../application/commands/create-user.command';
import { JwtAuthGuard } from '../../../shared/guards/jwt-auth.guard';
import { GetUserQuery } from '../../application/queries/get-user.query';
import {
  CurrentUser,
  type CurrentUserInfo,
} from '../../../shared/decorators/current-user.decorator';

@Controller('user')
export class UserController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Post('create-user')
  async createUser(@Body() { name, password, email, role }: CreateUserDto) {
    return this.commandBus.execute(
      new CreateUserCommand(email, password, name, role),
    );
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  async getProfile(@CurrentUser() { userId }: CurrentUserInfo) {
    return this.queryBus.execute(new GetUserQuery(userId));
  }
}
