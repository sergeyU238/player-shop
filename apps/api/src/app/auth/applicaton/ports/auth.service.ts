import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Response } from 'express';
import { compare } from 'bcryptjs';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import type { TokenPayload } from '../../presentation/dto/token-payload.interface';
import type { SingInDto } from '../../presentation/dto/sing-in';
import { AuthPrismaUserRepository } from '../../presentation/persistence/auth-prisma-user-repository.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: AuthPrismaUserRepository,
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
  ) {}

  async login({ email, password }: SingInDto, response: Response) {
    const user = await this.verifyUser(email, password);

    this.makeAccessTokenCookie(user.id, response);

    return user;
  }

  private makeAccessTokenCookie(userId: number, response: Response) {
    const expirationTime = this.configService.getOrThrow('JWT_EXPIRATION_MS');
    const expires = new Date();
    expires.setTime(expires.getTime() + parseInt(expirationTime));

    const tokenPayload: TokenPayload = {
      userId,
    };
    const accessToken = this.jwtService.sign(tokenPayload);
    response.cookie('Authentication', accessToken, {
      httpOnly: true,
      secure: this.configService.get('NODE_ENV') === 'production',
      expires,
    });
  }

  private async verifyUser(
    email: SingInDto['email'],
    password: SingInDto['password'],
  ) {
    try {
      const user = await this.usersService.getUser({
        email,
      });

      const authenticated = await compare(password, user.password);
      if (!authenticated) {
        throw new UnauthorizedException();
      }
      return user;
    } catch (_err) {
      throw new UnauthorizedException('Credentials are not valid');
    }
  }
}
