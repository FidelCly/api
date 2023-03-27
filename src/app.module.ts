import { Module } from '@nestjs/common';
import { ShopModule } from './shop/shop.module';
import { UserModule } from './user/user.module';
import { CardModule } from './card/card.module';
import { PromotionModule } from './promotion/promotion.module';
import { BalanceModule } from './balance/balance.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env', '.env.test', '.env.dev', '.env.local'],
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: process.env.DATABASE_URL,
      host: process.env.DATABASE_HOST,
      port: +process.env.DATABASE_PORT,
      username: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
      migrationsRun: true,
      synchronize: Boolean(process.env.SYNCHRONIZE),
      logging: false,
      autoLoadEntities: true,
    }),
    ShopModule,
    UserModule,
    CardModule,
    PromotionModule,
    BalanceModule,
    AuthModule,
  ],
})
export class AppModule {}
