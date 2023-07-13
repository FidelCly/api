import { forwardRef, Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import {
  ANALYTICS_PACKAGE_NAME,
  SHOP_SERVICE_NAME,
} from '../analytics/analytics.pb';
import { CardModule } from '../card/card.module';
import { PromotionModule } from '../promotion/promotion.module';
import { UserModule } from '../user/user.module';
import { ShopController } from './shop.controller';
import { Shop } from './shop.entity';
import { ShopService } from './shop.service';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: SHOP_SERVICE_NAME,
        transport: Transport.GRPC,
        options: {
          url: process.env.ANALYTICS_SERVICE_URL,
          package: ANALYTICS_PACKAGE_NAME,
          protoPath: join(
            'node_modules/@fidecly/grpc-proto/proto/analytics/shop.proto',
          ),
        },
      },
    ]),
    TypeOrmModule.forFeature([Shop]),
    forwardRef(() => CardModule),
    forwardRef(() => UserModule),
    forwardRef(() => PromotionModule),
  ],
  controllers: [ShopController],
  providers: [ShopService],
  exports: [ShopService],
})
export class ShopModule {}
