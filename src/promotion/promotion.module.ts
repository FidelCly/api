import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ShopModule } from '../shop/shop.module';
import { PromotionController } from './promotion.controller';
import { Promotion } from './promotion.entity';
import { PromotionService } from './promotion.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Promotion]),
    forwardRef(() => ShopModule),
  ],
  controllers: [PromotionController],
  providers: [PromotionService],
  exports: [PromotionService],
})
export class PromotionModule {}
