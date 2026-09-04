import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Request } from 'express';
import type { TokenPayload } from '../dto/token-payload.interface';
import { AuthPrismaUserRepository } from '../persistence/auth-prisma-user-repository.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    configService: ConfigService,
    private readonly authRepository: AuthPrismaUserRepository,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request: Request) => (request as Request).cookies?.Authentication,
      ]),
      secretOrKey: configService.getOrThrow('JWT_SECRET'),
    });
  }

  async validate(payload: TokenPayload) {
    const user = await this.authRepository.getUser({ id: payload.userId });

    if (!user) {
      throw new UnauthorizedException();
    }

    return {
      userId: payload.userId,
      role: user.role,
    };
  }
}
