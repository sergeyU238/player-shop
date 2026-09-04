import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { SingInDto } from '../dto/sing-in';
import { Response } from 'express';
import { LoginCommand } from '../../applicaton/command/login.command';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { JwtAuthGuard } from '../../../shared/guards/jwt-auth.guard';
import type { TokenPayload } from '../dto/token-payload.interface';
import type { User } from '@player-shop/database';
import { Request } from 'express';
import { AuthenticateQuery } from '../../applicaton/queries/authenticate.query';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Get('authenticate')
  async authenticate(
    @Req() request: Request & { user: TokenPayload },
  ): Promise<User> {
    return this.queryBus.execute(new AuthenticateQuery(request.user.userId));
  }

  @Post('login')
  async login(
    @Body() dto: SingInDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    return await this.commandBus.execute(
      new LoginCommand(dto.email, dto.password, res),
    );
  }
}
