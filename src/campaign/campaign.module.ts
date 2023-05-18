import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ShopModule } from '../shop/shop.module';
import { UserModule } from '../user/user.module';
import { PromotionModule } from 'src/promotion/promotion.module';
import { CampaignController } from './campaign.controller';
import { CampaignService } from './campaign.service';
import { Campaign } from './campaign.entity';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { CAMPAIGN_SERVICE_NAME, CAMPAIGN_PACKAGE_NAME } from './campaign.pb';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: CAMPAIGN_SERVICE_NAME,
        transport: Transport.GRPC,
        options: {
          url: process.env.MAILER_SERVICE_URL,
          package: CAMPAIGN_PACKAGE_NAME,
          protoPath: join(
            'node_modules/@fidecly/grpc-proto/proto/campaign.proto',
          ),
        },
      },
    ]),
    TypeOrmModule.forFeature([Campaign]),
    forwardRef(() => ShopModule),
    forwardRef(() => UserModule),
    forwardRef(() => PromotionModule),
  ],
  controllers: [CampaignController],
  providers: [CampaignService],
  exports: [CampaignService],
})
export class CampaignModule {}
