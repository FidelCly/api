import { forwardRef, Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { CampaignModule } from 'src/campaign/campaign.module';
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
            'node_modules/@fidecly/grpc-proto/proto/analytics/analytics.proto',
          ),
        },
      },
    ]),
    TypeOrmModule.forFeature([Promotion]),
    forwardRef(() => ShopModule),
    forwardRef(() => UserModule),
    forwardRef(() => CampaignModule),
  ],
  controllers: [PromotionController],
  providers: [PromotionService],
  exports: [PromotionService],
})
export class PromotionModule {}
