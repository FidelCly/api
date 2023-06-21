import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ShopModule } from '../shop/shop.module';
import { PromotionController } from './promotion.controller';
import { Promotion } from './promotion.entity';
import { PromotionService } from './promotion.service';
import { UserModule } from '../user/user.module';
import { CampaignModule } from '../campaign/campaign.module';

@Module({
  imports: [
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
