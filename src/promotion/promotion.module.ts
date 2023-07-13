import { forwardRef, Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import {
  ANALYTICS_PACKAGE_NAME,
  PROMOTION_SERVICE_NAME,
} from '../analytics/analytics.pb';
import { ShopModule } from '../shop/shop.module';
import { UserModule } from '../user/user.module';
import { PromotionController } from './promotion.controller';
import { Promotion } from './promotion.entity';
import { PromotionService } from './promotion.service';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: PROMOTION_SERVICE_NAME,
        transport: Transport.GRPC,
        options: {
          url: process.env.ANALYTICS_SERVICE_URL,
          package: ANALYTICS_PACKAGE_NAME,
          protoPath: join(
            'node_modules/@fidecly/grpc-proto/proto/analytics/promotion.proto',
          ),
        },
      },
    ]),
    TypeOrmModule.forFeature([Promotion]),
    forwardRef(() => ShopModule),
    forwardRef(() => UserModule),
  ],
  controllers: [PromotionController],
  providers: [PromotionService],
  exports: [PromotionService],
})
export class PromotionModule {}
