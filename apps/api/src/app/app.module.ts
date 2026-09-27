import { Module } from '@nestjs/common';
import { PrismaModule } from '@player-shop/database';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { ProductsModule } from './products/products.module';
import { PaymentsModule } from './payments/payments.module';
import { VendorOrderModule } from './vendor-order/vendor-order.module';

@Module({
  imports: [
    PrismaModule,
    AuthModule,
    UsersModule,
    ProductsModule,
    PaymentsModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    VendorOrderModule,
  ],
})
export class AppModule {}
