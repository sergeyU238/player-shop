import { Module } from '@nestjs/common';
import { AuthController } from './presentation/controllers/auth.controller';
import { ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './presentation/strategies/jwt.strategy';
import { AuthPrismaUserRepository } from './presentation/persistence/auth-prisma-user-repository.service';
import { LoginHandler } from './applicaton/command/login.handler';
import { AuthenticateHandler } from './applicaton/queries/authenticate.handler';
import { CqrsModule } from '@nestjs/cqrs';
import { AuthService } from './applicaton/ports/auth.service';

@Module({
  imports: [
    CqrsModule,
    JwtModule.registerAsync({
      useFactory: (configService: ConfigService) => ({
        secret: configService.getOrThrow('JWT_SECRET'),
        signOptions: {
          expiresIn: configService.getOrThrow('JWT_EXPIRATION_MS'),
        },
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    AuthPrismaUserRepository,
    JwtStrategy,
    AuthenticateHandler,
    LoginHandler,
  ],
})
export class AuthModule {}
