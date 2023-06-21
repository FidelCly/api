import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PromotionModule } from '../promotion/promotion.module';
import { CardModule } from '../card/card.module';
import { ShopController } from './shop.controller';
import { Shop } from './shop.entity';
import { ShopService } from './shop.service';
import { UserModule } from '../user/user.module';
import { CampaignModule } from '../campaign/campaign.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Shop]),
    forwardRef(() => CardModule),
    forwardRef(() => UserModule),
    forwardRef(() => PromotionModule),
    forwardRef(() => CampaignModule),
  ],
  controllers: [ShopController],
  providers: [ShopService],
  exports: [ShopService],
})
export class ShopModule {}
