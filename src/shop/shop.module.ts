import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PromotionModule } from '../promotion/promotion.module';
import { CardModule } from '../card/card.module';
import { ShopController } from './shop.controller';
import { Shop } from './shop.entity';
import { ShopService } from './shop.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Shop]),
    forwardRef(() => CardModule),
    forwardRef(() => PromotionModule),
  ],
  controllers: [ShopController],
  providers: [ShopService],
  exports: [ShopService],
})
export class ShopModule {}
